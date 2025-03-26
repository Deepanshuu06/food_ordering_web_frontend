import React from "react";
import RestaurantCard from "./RestaurantCard";

function AllRestaurantSection({ data }) {
  const allRestaurantList =
    data?.gridElements?.infoWithStyle?.restaurants || [];

  return (
    <div className="mt-8">
      <h1 className="text-3xl font-bold">
        Restaurants with online food delivery in Indore{" "}
      </h1>
      <div className="grid grid-cols-4 gap-12  mt-12">
        {allRestaurantList.map((restaurant) => (
          <RestaurantCard data={restaurant} key={restaurant?.info?.id} />
        ))}
      </div>
    </div>
  );
}

export default AllRestaurantSection;
