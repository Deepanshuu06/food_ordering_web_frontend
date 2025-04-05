import React from "react";
import RestaurantCard from "./RestaurantCard";

function AllRestaurantSection({ data, title }) {
  const allRestaurantList =
    data?.gridElements?.infoWithStyle?.restaurants || [];

    const filterOptions = [
      {
        filterName:"Rating 4.0+"
      },
      {
        filterName:"Offer"
      },
      {
        filterName:"Rs. 300 - Rs. 600"
      },
      {
        filterName:"Less than Rs. 300"
      },
    ]

  return (
    <div className="mt-8">
      <h1 className="text-xl text-center lg:text-3xl lg:text-start font-bold">{title?.title}</h1>
      <div className="flex gap-3 mt-7">
       {filterOptions.map((filter)=>(
        <button className="filterButton">{filter.filterName}</button>
       ))}

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-3  mt-5  ">
        {allRestaurantList.map((restaurant) => (
          <RestaurantCard data={restaurant} key={restaurant?.info?.id} />
        ))}

      </div>
    </div>
  );
}

export default AllRestaurantSection;
