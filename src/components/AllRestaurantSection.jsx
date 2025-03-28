import React from "react";
import RestaurantCard from "./RestaurantCard";

function AllRestaurantSection({ data, title }) {
  const allRestaurantList =
    data?.gridElements?.infoWithStyle?.restaurants || [];

  console.log(title);

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold">{title?.title}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-8  mt-12  place-self-center ">
        {allRestaurantList.map((restaurant) => (
          <RestaurantCard data={restaurant} key={restaurant?.info?.id} />
        ))}
      </div>
    </div>
  );
}

export default AllRestaurantSection;
