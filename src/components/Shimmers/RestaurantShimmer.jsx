const RestaurantShimmer = () => {
    return (
      <div className="p-4">
        <div className="h-32 bg-gray-800 flex items-center justify-center text-white text-lg font-semibold">
          Looking for great food near you ...
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="p-4 bg-gray-200 rounded-lg animate-pulse">
              <div className="h-40 bg-gray-300 rounded-md"></div>
              <div className="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="mt-2 h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default RestaurantShimmer;
  