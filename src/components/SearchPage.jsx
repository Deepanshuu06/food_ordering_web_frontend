import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HERO_SECTION_CONST_IMAGE_URL,
  MENU_ITEM_CONST_IMAGE_URL,
} from "../../constant";
import SearchDishSection from "./Sections/SearchDishSection";
import SearchRestaurantSection from "./Sections/SearchRestaurantSection";

function SearchPage() {
  const { lat, lng } = useSelector((state) => state.location);
  const [recentSearchData, setRecentSearchData] = useState();
  const [preSearchData, setPreSearchData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [
    isSearchResultDetailsSectionOpen,
    setIsSearchResultDetailsSectionOpen,
  ] = useState(false);
  const [isDishSectionOpen, setIsDishSectionOpen] = useState(false);
  const [isRestaurantSectionOpen, setIsRestaurantSectionOpen] = useState(false);

  const [RestaurantData, setRestaurantData] = useState([]);
  const [DishData, setDishData] = useState([]);

  async function fetchPreSearch() {
    const res = await fetch(
      `https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`
    );
    const data = await res.json();
    setRecentSearchData(data?.data?.cards[0]?.card);
    setPreSearchData(data?.data?.cards[1]?.card?.card);
  }

  const { title } = preSearchData?.header ?? "Popular Cusinessss";
  const { info } = preSearchData?.gridElements?.infoWithStyle || [];

  async function fetchSearch() {
    const res = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}5&lng=${lng}&str=${searchText}&trackingId=null&includeIMItem=true`
    );
    const data = await res.json();
    setSearchData(data?.data?.suggestions || []);
  }

  useEffect(() => {
    fetchPreSearch();
  }, [lat, lng]);

  useEffect(() => {
    if (searchText.length > 0) {
      fetchSearch();
    }
  }, [lat, lng, searchText]);
  

  async function handleSearchClick(item) {
    try {
      // Parse the metadata JSON string to an object
      const metadata = JSON.parse(item.metadata);

      // Encode the metadata object for the API request
      const encodedMetadata = encodeURIComponent(JSON.stringify(metadata));

      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${item.text.replace(
          " ",
          "+"
        )}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=b086f011-dec2-de52-81e3-5a4930d22c34&metaData=${encodedMetadata}`
      );

      const data = await response.json();

      setRestaurantData(
        data?.data?.cards[1]?.groupedCard?.cardGroupMap.RESTAURANT?.cards
      );

      setDishData(data?.data?.cards[1]?.groupedCard?.cardGroupMap.DISH?.cards);
      //   console.log(RestaurantData);
      //   console.log(DishData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="w-full h-full  ">
      <div className="w-[70%] mx-auto h-full">
        <div className="pt-20  sticky top-5 z-50 bg-white">
          <input
            className="bg-white w-full p-4 outline-none border-2"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchText(e.target.value);
              setIsSearchResultDetailsSectionOpen(false);
                

            }}
          />
        </div>

        <div className="w-full gap-4 flex-col justify-between i">
          {searchData.length > 0 &&
            !isSearchResultDetailsSectionOpen &&
            searchData.map((item) => (
              <div
                className="flex  w-full p-3 gap-4 items-center  hover:bg-slate-100 cursor-pointer"
                onClick={() => {
                  handleSearchClick(item),
                    setIsSearchResultDetailsSectionOpen(true);

                  item?.type == "RESTAURANT"
                    ? setIsRestaurantSectionOpen(true)
                    : setIsDishSectionOpen(true);
                }}
              >
                <div>
                  <img
                    className="w-20 h-20 rounded-2xl"
                    src={`${MENU_ITEM_CONST_IMAGE_URL}${item?.cloudinaryId}`}
                    alt={item?.cloudinaryId}
                  />
                </div>
                <div>
                  <h1 className="font-medium">{item?.text}</h1>
                  <h1 className="text-xs">{item?.type}</h1>
                </div>
              </div>
            ))}
        </div>

        {searchText.length < 2 && (
          <div>
            <div className="pt-7">
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <div className="w-full h-[20%] flex overflow-x-scroll  pt-6">
              {info?.map((item) => (
                <img
                  className="w-20"
                  src={`${HERO_SECTION_CONST_IMAGE_URL}${item?.imageId}`}
                  alt={item?.imageId}
                  key={item?.id}
                />
              ))}
            </div>
          </div>
        )}

        <div>
          {isSearchResultDetailsSectionOpen && (
            <div className="flex gap-4 pt-4">
              {isRestaurantSectionOpen ? (
                <button
                  onClick={() => {
                    setIsRestaurantSectionOpen(true),
                      setIsDishSectionOpen(false);
                  }}
                  className=" p-2 px-5 bg-gray-800 text-white rounded-2xl"
                >
                  Restaurant
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsRestaurantSectionOpen(true),
                      setIsDishSectionOpen(false);
                  }}
                  className=" p-2 px-5 border-2 rounded-2xl"
                >
                  Restaurant
                </button>
              )}
              {isDishSectionOpen ? (
                <button
                  className="  p-2 px-5 bg-gray-800 text-white rounded-2xl"
                  onClick={() => {
                    setIsDishSectionOpen(true),
                      setIsRestaurantSectionOpen(false);

                  }}
                >
                  Dish
                </button>
              ) : (
                <button
                  className=" p-2 px-5 border-2 rounded-2xl"
                  onClick={() => {
                    setIsDishSectionOpen(true),
                      setIsRestaurantSectionOpen(false);
                  }}
                >
                  Dish
                </button>
              )}
            </div>  
          )}

          {isDishSectionOpen && <SearchDishSection data={DishData}/>}
          {isRestaurantSectionOpen && <SearchRestaurantSection data={RestaurantData} />}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
