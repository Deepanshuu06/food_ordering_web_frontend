import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";

function TopRestaurantSection({ data }) {
  const topRestaurantSectionTitle = data?.header?.title;
  const topRestaurantList = data?.gridElements?.infoWithStyle?.restaurants || [];

  const [translateValue, setTranslateValue] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Dynamic card width based on screen size
  const cardWidth = windowWidth < 768 ? windowWidth * 0.8 : 250;
  const cardGap = 16;
  const totalCardWidth = cardWidth + cardGap;
  const maxTranslateValue = Math.max(0, (topRestaurantList.length - 1) * totalCardWidth);

  function handlePrev() {
    if (translateValue > 0) {
      setTranslateValue((prev) => Math.max(0, prev - totalCardWidth));
    }
  }

  function handleNext() {
    if (translateValue < maxTranslateValue) {
      setTranslateValue((prev) => Math.min(maxTranslateValue, prev + totalCardWidth));
    }
  }

  return (
    <div className="mt-10 px-4">
      {topRestaurantList.length > 0 && (
        <div className="flex justify-between items-center py-5">
          <h1 className="text-2xl font-bold">{topRestaurantSectionTitle}</h1>
          <div className="flex gap-6 items-center">
            <i
              onClick={handlePrev}
              className={`fi text-xl lg:text-2xl md:text-2xl fi-br-angle-circle-left cursor-pointer${
                translateValue === 0 ? "text-gray-400" : "text-black"
              }`}
              style={{ pointerEvents: translateValue === 0 ? "none" : "auto" }}
            >

            </i>
            <i
              onClick={handleNext}
              className={`fi text-xl lg:text-2xl md:text-2xl fi-br-angle-circle-right cursor-pointer ${
                translateValue === maxTranslateValue
                  ? "text-gray-400"
                  : "text-black"
              }`}
              style={{ pointerEvents: translateValue === maxTranslateValue ? "none" : "auto" }}
            >

            </i>
          </div>
        </div>
      )}

      <div className="w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300 gap-4"
          style={{ transform: `translateX(-${translateValue}px)` }}
        >
          {topRestaurantList.map((restaurant , index) => (
            <div key={restaurant.id || index} style={{ minWidth: `${cardWidth}px` }}>
              <RestaurantCard data={restaurant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopRestaurantSection;
