import React, { useEffect, useState } from "react";
import { MENU_ITEM_CONST_IMAGE_URL } from "../../../constant";
import { useSelector } from "react-redux";

function SearchDishSection({ data }) {
  const acctualDishData = data.filter((item) => item?.card?.card?.info) || [];
  const { lat, lng } = useSelector((state) => state.location);
  const { searchText } = useSelector((state) => state.searchText);
  const [dishesList, setDishesList] = useState();
  const isMobile = window.innerWidth <= 768; // Detect mobile devices

  const fetchdata = async () => {

    const apiUrl = isMobile ? `${import.meta.env.VITE_BASEURL_MOBILE}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchText.replace(
      "",
      "+"
    )}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=0cf0d26f-6422-8dac-1ad1-e9af14755e44&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A92204%2C%22primaryRestaurantId%22%3A84070%2C%22cloudinaryId%22%3A%22g5txnz35wlrgbskk3r8y%22%2C%22brandId%22%3A92204%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D&selectedPLTab=DISH` 
    : `${import.meta.env.VITE_BASEURL_DESKTOP}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchText.replace(
      "",
      "+"
    )}&trackingId=undefined&submitAction=SUGGESTION&queryUniqueId=0cf0d26f-6422-8dac-1ad1-e9af14755e44&metaData=%7B%22type%22%3A%22RESTAURANT%22%2C%22data%22%3A%7B%22parentId%22%3A92204%2C%22primaryRestaurantId%22%3A84070%2C%22cloudinaryId%22%3A%22g5txnz35wlrgbskk3r8y%22%2C%22brandId%22%3A92204%2C%22enabled_flag%22%3A1%7D%2C%22businessCategory%22%3A%22SWIGGY_FOOD%22%2C%22displayLabel%22%3A%22Restaurant%22%7D&selectedPLTab=DISH`


    const res = await fetch(
apiUrl
    );
    const data = await res.json();
    setDishesList(data?.data?.cards[0]?.groupedCard?.cardGroupMap?.DISH?.cards);
  };
  useEffect(() => {
    if (acctualDishData.length === 0) {
      fetchdata();
    }
  }, [data, searchText, lat, lng]);





  return (
    <div className="w-full bg-slate-100">
      <div className="py-4 px-3"></div>
      {acctualDishData.length > 0 ? (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 p-1 lg:p-3">
          {acctualDishData.map(({ card: { card } }) => (
            <div className="bg-white px-9 py-5 flex items-center justify-between rounded-2xl"
            key={card?.info?.id}
            >
              <div className="flex flex-col gap-2">
                <h1 className="">{card?.info?.isVeg ? "Veg" : "Non Veg"}</h1>
                <h1 className="font-bold">{card?.info?.name}</h1>
                <h2> ₹ {card?.info?.price / 100}</h2>
                <div >
                <button className="px-3 text-xs py-1 border-2 rounded-2xl cursor-pointer ">
                  More details
                </button>
                </div>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-25 h-23">
                { card?.info?.imageId ?
                   <img
                   src={MENU_ITEM_CONST_IMAGE_URL + card?.info?.imageId}
                   alt=""
                   className="object-cover w-full h-full rounded-xl"
                 /> : <div></div>
                 }
                </div>
                <button className="px-7 lg:px-8 border-2 rounded-2xl text-green-600 cursor-pointer">
                  ADD
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2 p-1 lg:p-3">
          {dishesList?.map(({ card: { card } }) => (
            <div className="bg-white px-9 py-5 flex items-center justify-between rounded-2xl"
            key={card?.info?.id}
            >
              <div className="flex flex-col gap-2 w-full">
                <h1 className="">{card?.info?.isVeg ? "Veg" : "Non Veg"}</h1>
                <h1 className="font-bold">{card?.info?.name}</h1>
                <h2> ₹ {card?.info?.price / 100}</h2>
                <div className="w-3.5">
                <button className="px-3 text-xs py-1 border-2 rounded-2xl cursor-pointer ">
                  More details
                </button>
                </div>
                
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-25 h-23">
                 { card?.info?.imageId ?
                   <img
                   src={MENU_ITEM_CONST_IMAGE_URL + card?.info?.imageId}
                   alt=""
                   className="object-cover w-full h-full rounded-xl"
                 /> : <div></div>
                 }
                </div>
                <button className="px-7  lg:px-12 py-2 border-2 rounded-2xl text-green-600 cursor-pointer">
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
