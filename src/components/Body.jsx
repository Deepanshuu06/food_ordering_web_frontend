import React, { useEffect, useState } from "react";
import { RESTAURANTS_API } from "../../constant";
import HeroSection from "./HeroSection";

function Body() {
  const [data, setData] = useState([]);
  const [heroSectionData , setHeroSectionData] = useState([])

  async function fetchData() {
    const response = await fetch(RESTAURANTS_API);
    const json = await response.json();
    setData(json);
    setHeroSectionData(json?.data?.cards[0]?.card?.card)

  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="w-full mx-auto ">
      <div className="w-[80%] mx-auto">
      <HeroSection data={heroSectionData}/>
      </div>
    </div>
  );
}

export default Body;
