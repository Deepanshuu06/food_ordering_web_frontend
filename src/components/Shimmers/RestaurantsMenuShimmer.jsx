// RestaurantsMenuShimmer.js
import React from "react";

const RestaurantsMenuShimmer = () => {
  return (
    <div className="w-full mx-auto animate-pulse">
      <div className="mx-auto">

        <div className="pt-8 flex gap-2">
          <div className="h-3 bg-gray-200 rounded-full w-16"></div>
          <div className="h-3 bg-gray-200 rounded-full w-4"></div>
          <div className="h-3 bg-gray-200 rounded-full w-24"></div>
          <div className="h-3 bg-gray-200 rounded-full w-4"></div>
          <div className="h-3 bg-gray-200 rounded-full w-32"></div>
        </div>


        <div className="pt-8 pl-6">
          <div className="h-8 bg-gray-200 rounded-full w-64 mb-4"></div>
        </div>


        <div className="w-full h-56 bg-gray-100 rounded-4xl flex justify-center items-center">
          <div className="w-[95%] h-[85%] bg-white rounded-4xl border border-gray-200 shadow-lg p-4">

            <div className="flex items-center mb-4">
              <div className="h-6 w-6 bg-gray-200 rounded-full mr-2"></div>
              <div className="h-4 bg-gray-200 rounded-full w-32"></div>
            </div>


            <div className="h-5 bg-gray-200 rounded-full w-full mb-4"></div>


            <div className="flex items-center mb-2">
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>
              <div className="h-3 bg-gray-200 rounded-full w-48"></div>
            </div>


            <div className="flex items-center">
              <div className="h-4 w-4 bg-gray-200 rounded-full mr-2"></div>
              <div className="h-3 bg-gray-200 rounded-full w-32"></div>
            </div>


            <div className="mt-4 space-y-2">
              <div className="h-3 bg-gray-200 rounded-full w-full"></div>
              <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>


        <div className="mt-8 space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="p-4  rounded-lg">
              <div className="h-4 bg-gray-200 rounded-full w-48 mb-3"></div>
              <div className="h-3 bg-gray-200 rounded-full w-full mb-2"></div>
              <div className="h-3 bg-gray-200 rounded-full w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RestaurantsMenuShimmer;