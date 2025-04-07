import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  HERO_SECTION_CONST_IMAGE_URL,
  MENU_ITEM_CONST_IMAGE_URL,
} from "../../constant";
import SearchDishSection from "./Sections/SearchDishSection";
import SearchRestaurantSection from "./Sections/SearchRestaurantSection";
import { changeSearchText } from "./utils/slices/searchTextSlice";
import RestaurantsMenuShimmer from "./Shimmers/RestaurantsMenuShimmer";

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
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  async function fetchPreSearch() {
    try {
      const res = await fetch(
        `https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=${lat}&lng=${lng}`
      );
      const data = await res.json();
      setRecentSearchData(data?.data?.cards[0]?.card);
      setPreSearchData(data?.data?.cards[1]?.card?.card || []);
    } catch (error) {
      console.error("Error fetching pre-search data:", error);
    }
  }

  const { title } = preSearchData?.header ?? "Popular Cuisines";
  const { info } = preSearchData?.gridElements?.infoWithStyle || {};

  async function fetchSearch() {
    try {
      const res = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=${lat}&lng=${lng}&str=${searchText}&trackingId=null&includeIMItem=true`
      );
      const data = await res.json();
      setSearchData(data?.data?.suggestions || []);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchData([]);
    }
  }

  useEffect(() => {
    fetchPreSearch();
  }, [lat, lng]);

  useEffect(() => {
    if (searchText.length > 0) {
      const timer = setTimeout(() => fetchSearch(), 300);
      return () => clearTimeout(timer);
    } else {
      setSearchData([]);
      setIsSearchResultDetailsSectionOpen(false);
    }
  }, [searchText, lat, lng]);

  async function handleSearchClick(item) {

    setIsSearchResultDetailsSectionOpen(true);
    try {
      const metadata = JSON.parse(item.metadata);
      const encodedMetadata = encodeURIComponent(JSON.stringify(metadata));

      const response = await fetch(
        `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${item.text.replace(
          " ",
          "+"
        )}&trackingId=null&submitAction=SUGGESTION&queryUniqueId=b086f011-dec2-de52-81e3-5a4930d22c34&metaData=${encodedMetadata}`
      );

      const data = await response.json();

      setRestaurantData(
        data?.data?.cards[1]?.groupedCard?.cardGroupMap.RESTAURANT?.cards || []
      );
      setDishData(
        data?.data?.cards[1]?.groupedCard?.cardGroupMap.DISH?.cards || []
      );

      setIsRestaurantSectionOpen(item?.type === "RESTAURANT");
      setIsDishSectionOpen(item?.type !== "RESTAURANT");
      setIsLoading(false);
    } catch (error) {
      console.error("Error handling search click:", error);
    } finally {
      setIsLoading(false); // Stop shimmer
    }
  }

  return (
    <div className="w-full h-screen">
      <div className="w-[70%] mx-auto h-full">
        <div className="pt-20 sticky top-5 z-20 bg-white">
          <input
            className="bg-white w-full p-4 outline-none border-2"
            type="text"
            placeholder="Search"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
              setIsSearchResultDetailsSectionOpen(false);
              setSearchData([]);
              setIsRestaurantSectionOpen(false);
              setIsDishSectionOpen(false);
              dispatch(changeSearchText(e.target.value));
            }}
          />
        </div>

        {/* Search Results Section */}
        <div className="w-full gap-4 flex-col justify-between">
          {searchText.length > 0 && !searchData.length && (
            <div className="p-4">Searching...</div>
          )}

          {searchData.length > 0 &&
            !isSearchResultDetailsSectionOpen &&
            searchData.map((item, index) => (
              <div
                key={`${item.cloudinaryId}-${index}`}
                className="flex w-full p-3 gap-4 items-center hover:bg-slate-100 cursor-pointer"
                onClick={() => handleSearchClick(item)}
              >
                <div>
                  <img
                    className="w-20 h-20 rounded-2xl"
                    src={`${MENU_ITEM_CONST_IMAGE_URL}${item?.cloudinaryId}`}
                    alt={item?.text}
                  />
                </div>
                <div>
                  <h1 className="font-medium">{item?.text}</h1>
                  <h1 className="text-xs">{item?.type}</h1>
                </div>
              </div>
            ))}
        </div>

        {searchText.length === 0 && (
          <div>
            <div className="pt-7">
              <h1 className="text-2xl font-bold">{title}</h1>
            </div>
            <div className="w-full h-[20%] flex overflow-x-scroll pt-6">
              {info?.map((item) => (
                <img
                  key={item.id}
                  className="w-20"
                  src={`${HERO_SECTION_CONST_IMAGE_URL}${item?.imageId}`}
                  alt={item?.imageId}
                />
              ))}
            </div>
          </div>
        )}

        {/* Results Section Toggle */}
        {isSearchResultDetailsSectionOpen && (
          <div className="flex gap-4 pt-4">
            <button
              className={`p-2 px-5 rounded-2xl ${
                isRestaurantSectionOpen ? "bg-gray-800 text-white" : "border-2"
              }`}
              onClick={() => {
                setIsRestaurantSectionOpen(true);
                setIsDishSectionOpen(false);
              }}
            >
              Restaurant
            </button>
            <button
              className={`p-2 px-5 rounded-2xl ${
                isDishSectionOpen ? "bg-gray-800 text-white" : "border-2"
              }`}
              onClick={() => {
                setIsDishSectionOpen(true);
                setIsRestaurantSectionOpen(false);
              }}
            >
              Dish
            </button>
          </div>
        )}

        {/* Results Display */}

        {isDishSectionOpen && <SearchDishSection data={DishData} />}
        {isRestaurantSectionOpen && (
          <SearchRestaurantSection data={RestaurantData} />
        )}
      </div>
    </div>
  );
}

export default SearchPage;
