import React, { useContext, useEffect, useState } from "react";
import { RESTAURANTS_API } from "../../constant";
import HeroSection from "./HeroSection";
import TopRestaurantSection from "./TopRestaurantSection";
import AllRestaurantSection from "./AllRestaurantSection";
import { Coordinates } from "../Context/ContextApis";
import RestaurantShimmer from "./Shimmers/RestaurantShimmer";

function Body() {
  const [data, setData] = useState({});
  const [heroSectionData, setHeroSectionData] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);
  const [allRestaurant, setAllRestaurant] = useState([]);
  const {coordinates : {lat , lng}} = useContext(Coordinates)
  const [unserviceableLoaction , setUnserviceableLoaction] = useState({})
  const [isLoading , setIsLoading] = useState(true)


  async function fetchData() {
    const response = await fetch(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`);
    const json = await response.json();
    setData(json);
    setHeroSectionData(json?.data?.cards[0]?.card?.card);
    setTopRestaurants(json?.data?.cards[1]?.card?.card);
    setAllRestaurant(json?.data?.cards[4]?.card?.card);
    setUnserviceableLoaction(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData();
  }, [lat , lng]);



  if(isLoading){
    return(
      <RestaurantShimmer/>
    )
  }

  
  


  return (
    <div className="w-full mx-auto ">
      <div className="w-[80%] mx-auto">
        <HeroSection data={heroSectionData} />
        <TopRestaurantSection data={topRestaurants} />
        <AllRestaurantSection
          data={allRestaurant}
          title={data?.data?.cards[2]?.card?.card}
        />
      </div>
    </div>
  );
}

export default Body;
