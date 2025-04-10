import React, { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { useDispatch } from "react-redux";
import { setFilterVal } from "./utils/slices/filterSlice";

function AllRestaurantSection({ data, title }) {
  const allRestaurantList =
    data?.gridElements?.infoWithStyle?.restaurants || [];
  const [activeButton, setActivebutton] = useState(null);
  const dispatch = useDispatch()
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const cardWidth = windowWidth < 768 ? windowWidth * 0.95 : 250; 
    const cardHeight = windowWidth < 768 ? 380 : 300; 

  const filterOptions = [
    {
      filterName: "Rating 4.0+",
    },
    {
      filterName: "Offer",
    },
    {
      filterName: "Rs. 300 - Rs. 600",
    },
    {
      filterName: "Less than Rs. 300",
    },
  ];

  const handlefilterButton = (filterName) => {
    setActivebutton((prevActive) =>
      prevActive === filterName ? null : filterName
    );
  };
  dispatch(setFilterVal(activeButton))  

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mt-8">
      <h1 className="text-xl text-center lg:text-3xl lg:text-start font-bold">
        {title?.title}
      </h1>
      <div className="hidden lg:flex gap-3 mt-7">
        {filterOptions.map((filter) => (
          <button
            key={filter.filterName}
            className={`filterButton ${
              activeButton === filter.filterName
                ? "bg-gray-200 text-black border-blue-200 border-2"
                : "bg-white text-black border-white border-2"
            }`}
            onClick={() => handlefilterButton(filter.filterName)}
          >
            {filter.filterName}
            {activeButton === filter.filterName && (
             <span>X</span>

            )}
          </button>
        ))}
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 lg:gap-3  gap-7 mt-5  ">
        {allRestaurantList.map((restaurant) => (
          <RestaurantCard data={restaurant} key={restaurant?.info?.id} 
          cardDimensions={{
            smCardWidth: `${cardWidth}px`, // Adjust width
            smCardHeight: `${cardHeight}px`, // Adjust height
          }}
          />
        ))}
      </div>
    </div>
  );
}

export default AllRestaurantSection;
