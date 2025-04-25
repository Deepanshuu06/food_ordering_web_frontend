import React, { useEffect, useState } from "react";
import { MENU_ITEM_CONST_IMAGE_URL } from "../../../constant";
import { useSelector } from "react-redux";
import RestaurantsMenuShimmer from "../Shimmers/RestaurantsMenuShimmer";

function SearchDishSection({ data }) {
  const acctualDishData = data.filter((item) => item?.card?.card?.info) || [];
  const { lat, lng } = useSelector((state) => state.location);
  const { searchText } = useSelector((state) => state.searchText);
  const [dishesList, setDishesList] = useState();
  const isMobile = window.innerWidth <= 768; // Detect mobile devices
  const [isLoading, setIsLoading] = useState(true);

  const fetchdata = async () => {
    const apiUrl = isMobile
      ? `${
          import.meta.env.VITE_BASEURL_MOBILE
        }/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchText.replace(
          "",
          "+"
        )}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=0cf0d26f-6422-8dac-1ad1-e9af14755e44&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A92204%2C%22primaryRestaurantId%22%3A84070%2C%22cloudinaryId%22%3A%22g5txnz35wlrgbskk3r8y%22%2C%22brandId%22%3A92204%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D&selectedPLTab=DISH`
      : `${
          import.meta.env.VITE_BASEURL_DESKTOP
        }/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchText.replace(
          "",
          "+"
        )}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=0cf0d26f-6422-8dac-1ad1-e9af14755e44&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A92204%2C%22primaryRestaurantId%22%3A84070%2C%22cloudinaryId%22%3A%22g5txnz35wlrgbskk3r8y%22%2C%22brandId%22%3A92204%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D&selectedPLTab=DISH`;

    const res = await fetch(apiUrl);
    const data = await res.json();
    setDishesList(data?.data?.cards[0]?.groupedCard?.cardGroupMap?.DISH?.cards);
    setIsLoading(false);
  };

  
  useEffect(() => {
    if (acctualDishData.length === 0) {
      fetchdata();
    }else{
      setIsLoading(false);
    }
  }, [data, searchText, lat, lng]);



  

  return isLoading ? <RestaurantsMenuShimmer /> : (
    <div className="w-full ">
      <div className="py-4 px-3"></div>
      {acctualDishData.length > 0 ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 p-1 lg:p-3">
          {acctualDishData.map(({ card: { card } }) => (
            <div
            className="bg-white shadow-xl px-6 py-5 rounded-2xl flex items-center justify-between"
            key={card?.info?.id}
          >
            {/* Left Section: Text Info */}
            <div className="flex flex-col gap-2 w-full pr-4">
              <span className="text-sm font-medium text-gray-600">
                {card?.info?.isVeg ? "Veg" : "Non-Veg"}
              </span>
              <h1 className="text-lg font-bold text-gray-800">{card?.info?.name}</h1>
              <p className="text-gray-700 text-md">₹ {card?.info?.price / 100}</p>
              <button className="w-max px-3 py-1 text-xs text-blue-600 border border-blue-500 rounded-full hover:bg-blue-50 transition">
                More details
              </button>
            </div>
          
            {/* Right Section: Image & Add Button */}
            <div className="flex flex-col items-center gap-3 min-w-[100px]">
              <div className="w-24 h-24 overflow-hidden rounded-xl bg-gray-100">
                {card?.info?.imageId ? (
                  <img
                    src={`${MENU_ITEM_CONST_IMAGE_URL}${card?.info?.imageId}`}
                    alt={card?.info?.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <button className="px-8 py-1.5 text-sm text-green-600 border border-green-500 rounded-full hover:bg-green-50 transition">
                ADD
              </button>
            </div>
          </div>
          
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 p-1 lg:p-3">
          {dishesList?.map(({ card: { card } }) => (
            <div
            className="bg-white shadow-xl px-6 py-5 rounded-2xl flex items-center justify-between"
            key={card?.info?.id}
          >
            {/* Left Section: Text Details */}
            <div className="flex flex-col gap-2 w-full pr-4">
              <span className="text-sm font-medium text-gray-600">
                {card?.info?.isVeg ? "Veg" : "Non-Veg"}
              </span>
              <h1 className="text-lg font-bold text-gray-800">{card?.info?.name}</h1>
              <p className="text-gray-700 text-md">₹ {card?.info?.price / 100}</p>
              <button className="w-max px-3 py-1 text-xs text-blue-600 border border-blue-500 rounded-full hover:bg-blue-50 transition cursor-pointer">
                More details
              </button>
            </div>
          
            {/* Right Section: Image & Button */}
            <div className="flex flex-col items-center gap-3 min-w-[100px]">
              <div className="w-24 h-24 overflow-hidden rounded-xl bg-gray-100">
                {card?.info?.imageId ? (
                  <img
                    src={`${MENU_ITEM_CONST_IMAGE_URL}${card?.info?.imageId}`}
                    alt={card?.info?.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <button className="px-8 py-1.5 text-sm text-green-600 border border-green-500 rounded-full hover:bg-green-50 transition cursor-pointer">
                ADD
              </button>
            </div>
          </div>
          
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchDishSection;
