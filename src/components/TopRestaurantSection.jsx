import React, { useState } from "react";
import RestaurantCard from "./RestaurantCard";

function TopRestaurantSection({ data }) {
  const topRestaurantSectionTitle = data?.header?.title;
  const topRestaurantList =
    data?.gridElements?.infoWithStyle?.restaurants || [];

  const [translateValue, setTranslateValue] = useState(0);

  const cardWidth = 250;
  const cardGap = 16;
  const totalCardWidth = cardWidth + cardGap;
  const maxTranslateValue = (topRestaurantList.length - 1) * totalCardWidth;

  function handlePrev() {
    if (translateValue > 0) {
      setTranslateValue((prev) => prev - totalCardWidth);
    }
  }

  function handleNext() {
    if (translateValue < maxTranslateValue) {
      setTranslateValue((prev) => prev + totalCardWidth);
    }
  }

  return (
    <div className="mt-10">
      <div className="justify-between items-center py-5 flex">
        <h1 className="text-2xl font-bold">{topRestaurantSectionTitle}</h1>
        <div className="justify-between flex gap-6 items-center">
          <i
            onClick={handlePrev}
            className={`fi text-3xl fi-br-angle-circle-left cursor-pointer ${
              translateValue === 0 ? "text-gray-400" : "text-black"
            }`}
          ></i>

          <i
            onClick={handleNext}
            className={`fi text-3xl fi-br-angle-circle-right cursor-pointer ${
              translateValue === maxTranslateValue
                ? "text-gray-400"
                : "text-black"
            }`}
          ></i>
        </div>
      </div>

      <div className="w-full mx-auto overflow-hidden">
        <div
          className="flex duration-500 gap-20 lg:gap-4"
          style={{ transform: `translateX(-${translateValue}px)` }}
        >
          {topRestaurantList.map((restaurant) => {
            return (
              <div key={restaurant.id} style={{ minWidth: `${cardWidth}px` }}>
                <RestaurantCard data={restaurant} key={restaurant?.info?.id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TopRestaurantSection;
