import React from "react";
import { HERO_SECTION_CONST_IMAGE_URL } from "../../constant";
import { Link } from "react-router";

function RestaurantCard({ data }) {
  const cuisines = data?.info?.cuisines || [];
  const discount = data?.info?.aggregatedDiscountInfoV3 || "";
  const ImageId = data?.info?.cloudinaryImageId || "";
  const ctaLink = data?.cta?.link;

  return (
    <Link to={`/restaurantmenu/${ctaLink.split("/")[5]}`}>
      <div className="h-72 w-72 lg:w-60 bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-95 pb-3 ">
        <div className="relative w-full h-40">
          <img
            className="w-full h-40 object-cover rounded-b-2xl"
            src={HERO_SECTION_CONST_IMAGE_URL + ImageId}
            alt="Restaurant"
          />
          <div className="absolute bottom-0 w-full rounded-2xl bg-gradient-to-t from-black via-black to-transparent py-5 flex items-center justify-center">
            <span className="text-white text-xl font-bold">
              {discount?.header} {discount?.subHeader}
            </span>
          </div>
        </div>
        <div className="px-2 py-1 ">
          <h2 className="text-xl font-semibold text-gray-800">
            {data?.info?.name}
          </h2>
          <div className="flex text-gray-600 text-sm gap-4 ">
            <h3 className="flex items-center">
              <span className="mr-1">⭐</span> {data?.info?.avgRatingString}
            </h3>
            <h3>{data?.info?.sla?.slaString}</h3>
          </div>
          {cuisines.length > 0 && (
            <div className="text-sm text-gray-700 font-bold overflow-hidden whitespace-nowrap text-ellipsis">
              {cuisines.join(", ")}
            </div>
          )}
          <h4 className="text-sm text-gray-500 mt-1">{data?.info?.areaName}</h4>
        </div>
      </div>
    </Link>
  );
}

export default RestaurantCard;
