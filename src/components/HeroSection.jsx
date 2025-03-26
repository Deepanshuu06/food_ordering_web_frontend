import React, { useState } from "react";
import { HERO_SECTION_CONST_IMAGE_URL } from "../../constant";

function HeroSection({ data }) {
  const HeroSectionTitle = data?.header?.title;
  const HeroSectionItems = data?.gridElements?.infoWithStyle?.info ?? []; 
  const [translateValue, setTranslateValue] = useState(0);

  const maxTranslateValue = (HeroSectionItems.length - 1) * 10; 
  console.log(maxTranslateValue);
  console.log(translateValue);
  
  function handlePrev() {
    if (translateValue > 0) {
      setTranslateValue((prev) => prev - 40); 
    }
  }
  
  function handleNext() {
    if (translateValue < maxTranslateValue) {
      setTranslateValue((prev) => prev + 40); 
    }
  }

  return (
    <div>
      <div className="justify-between items-center py-5 flex">
        <h1 className="text-4xl font-bold">{HeroSectionTitle}</h1>
        <div className="justify-between flex gap-6 items-center">
          <i
            onClick={handlePrev}
            className={`fi text-3xl fi-br-angle-circle-left cursor-pointer ${translateValue === 0 ? "text-gray-400" : "text-black"}`} // Disabled state for the previous button
          ></i>

          <i
            onClick={handleNext}
            className={`fi text-3xl fi-br-angle-circle-right cursor-pointer ${translateValue === maxTranslateValue ? "text-gray-400" : "text-black"}`} 
          ></i>
        </div>
      </div>
      <div className="w-full mx-auto border overflow-hidden">
        <div
          className="flex duration-1000"
          style={{ transform: `translateX(-${translateValue}%)` }}
        >
          {HeroSectionItems.map((item) => {
            return (
              <img
                src={HERO_SECTION_CONST_IMAGE_URL + item?.imageId}
                className="w-40"
                alt=""
                id={item?.id}
                key={item?.id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
