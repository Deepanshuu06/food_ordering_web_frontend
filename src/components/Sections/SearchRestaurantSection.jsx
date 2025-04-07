import React, { useState, useEffect } from "react";
import { MENU_ITEM_CONST_IMAGE_URL } from "../../../constant";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import RestaurantsMenuShimmer from "../Shimmers/RestaurantsMenuShimmer";

function SearchRestaurantSection({ data }) {
  const { lat, lng } = useSelector((state) => state.location);
  const info = data[0]?.card?.card?.info || {};
  const otherRestaurantData = data[1]?.card?.card || {};
  const { searchText } = useSelector((state) => state.searchText);
  const [resData, setResData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRestaurantdata = async () => {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchText.replace(
        " ",
        "+"
      )}&trackingId=undefined&submitAction=ENTER&queryUniqueId=9444189e-a5f4-1ef3-fc6f-0f174a906659&selectedPLTab=RESTAURANT`
    );

    const data = await response.json();
    setResData(
      data?.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards
    );
    setIsLoading(false);
  };

  useEffect(() => {
    // Fetch restaurant data when searchText changes or component mounts
    if (data.length === 0) {
      fetchRestaurantdata();
    } else {
      setIsLoading(false);
    }
  }, [data, searchText, lat, lng]); // Dependency array

  return isLoading ? (
    <RestaurantsMenuShimmer />
  ) : (
    <div className="w-full p-3 mt-4">
      <div>
        {data.length > 0 ? (
          <div className="grid grid-cols-2">
            <div className="bg-white p-3 flex items-center space-x-4">
              <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden">
                <img
                  src={
                    info.cloudinaryImageId
                      ? `${MENU_ITEM_CONST_IMAGE_URL}${info.cloudinaryImageId}`
                      : "default-image-url.jpg"
                  }
                  alt={info.name || "Restaurant"}
                  className="w-full h-full object-cover"
                />
                <button className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded">
                  Items
                </button>
              </div>
              <div>
                <h1 className="text-lg font-semibold">{info.name}</h1>
                <h3 className="text-gray-500 text-xs">
                  Rating: {info.avgRatingString}
                </h3>
                <h3 className="text-gray-700 text-xs">
                  {info.costForTwoMessage}
                </h3>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {resData.map(
              ({
                card: {
                  card: { info },
                },
              }) => (
                <div
                  className="bg-white p-3 flex items-center space-x-4"
                  key={info.id}
                >
                  <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden">
                    <img
                      src={
                        info.cloudinaryImageId
                          ? `${MENU_ITEM_CONST_IMAGE_URL}${info?.cloudinaryImageId}`
                          : "default-image-url.jpg"
                      }
                      alt={info?.name || "Restaurant"}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded">
                      Items
                    </button>
                  </div>
                  <div>
                    <h1 className="text-lg font-semibold">{info?.name}</h1>
                    <h3 className="text-gray-500 text-xs">
                      Rating: {info?.avgRating}
                    </h3>
                    <h3 className="text-gray-700 text-xs">
                      {info?.costForTwoMessage}
                    </h3>
                    <h3 className="text-gray-700 text-xs">
                      {info?.costForTwo}
                    </h3>
                    <h3 className="text-gray-700 text-xs">
                      {info?.sla?.slaString}
                    </h3>
                  </div>
                </div>
              )
            )}
          </div>
        )}

        <div className="mt-5">
          <h1 className="py-5 text-2xl font-bold">
            {otherRestaurantData.title}
          </h1>
          <div className="grid grid-cols-2 gap-4">
            {otherRestaurantData.restaurants &&
            otherRestaurantData.restaurants.length > 0 ? (
              otherRestaurantData.restaurants.map((restaurant, index) => (
                <Link key={index}>
                  <div
                    className="bg-white p-3 flex items-center space-x-4"
                    key={index}
                  >
                    <div className="relative w-[100px] h-[100px] rounded-lg overflow-hidden">
                      <img
                        src={
                          restaurant?.info.cloudinaryImageId
                            ? `${MENU_ITEM_CONST_IMAGE_URL}${restaurant?.info?.cloudinaryImageId}`
                            : "default-image-url.jpg"
                        }
                        alt={restaurant?.info?.name || "Restaurant"}
                        className="w-full h-full object-cover"
                      />
                      <button className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 rounded">
                        Items
                      </button>
                    </div>
                    <div>
                      <h1 className="text-lg font-semibold">
                        {restaurant?.info?.name}
                      </h1>
                      <h3 className="text-gray-500 text-xs">
                        Rating: {restaurant?.info?.avgRating}
                      </h3>

                      <h3 className="text-gray-700 text-xs">
                        {restaurant?.info?.costForTwoMessage}
                      </h3>
                      <h3 className="text-gray-700 text-xs">
                        {restaurant?.info?.costForTwo}
                      </h3>
                      <h3 className="text-gray-700 text-xs">
                        {restaurant?.info?.sla?.slaString}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchRestaurantSection;
