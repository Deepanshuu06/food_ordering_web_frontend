import React, { useEffect, useState } from "react";
import { RESTAURANTS_API } from "../../constant";
import HeroSection from "./HeroSection";
import TopRestaurantSection from "./TopRestaurantSection";

function Body() {
  const [data, setData] = useState([]);
  const [heroSectionData, setHeroSectionData] = useState([]);
  const [topRestaurants, setTopRestaurants] = useState([]);

  async function fetchData() {
    const response = await fetch(RESTAURANTS_API);
    const json = await response.json();
    setData(json);
    setHeroSectionData(json?.data?.cards[0]?.card?.card);
    setTopRestaurants(json?.data?.cards[1]?.card?.card);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full mx-auto ">
      <div className="w-[80%] mx-auto">
        <HeroSection data={heroSectionData} />
        <TopRestaurantSection data={topRestaurants} />
      </div>
    </div>
  );
}

export default Body;
