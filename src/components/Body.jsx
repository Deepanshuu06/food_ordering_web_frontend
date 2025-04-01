import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import HeroSection from "./HeroSection";
import TopRestaurantSection from "./TopRestaurantSection";
import AllRestaurantSection from "./AllRestaurantSection";
import RestaurantShimmer from "./Shimmers/RestaurantShimmer";
import UnServiceableLocation from "./cards/UnServiceableLocation";

function Body() {
  const [data, setData] = useState({});
  const [heroSectionData, setHeroSectionData] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [allRestaurant, setAllRestaurant] = useState([]);

  const [isUnserviceableLocation, setIsUnserviceableLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {lng , lat} = useSelector((state)=>state.location)


  async function fetchData() {
    const response = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const json = await response.json();
    setData(json);
    setHeroSectionData(json?.data?.cards[0]?.card?.card);
    setTopRestaurants(json?.data?.cards[1]?.card?.card);
    setAllRestaurant(json?.data?.cards[4]?.card?.card);
    setIsUnserviceableLocation(
      json?.data?.cards[0].card?.card?.title == "Location Unserviceable"
        ? json?.data?.cards[0].card?.card
        : false
    );
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [lat, lng]);


 
  

  return (
    <div className="w-full mx-auto ">
      {isLoading && <RestaurantShimmer />}
      <div className="w-[80%] mx-auto">

    {
      isUnserviceableLocation && <UnServiceableLocation data={isUnserviceableLocation}/>
    }

        {!isUnserviceableLocation && (
          <>
            <HeroSection data={heroSectionData} />
            <TopRestaurantSection data={topRestaurants} />
            <AllRestaurantSection
              data={allRestaurant}
              title={data?.data?.cards[2]?.card?.card}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default Body;
