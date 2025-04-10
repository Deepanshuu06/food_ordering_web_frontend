import React, { useEffect, useState } from "react";
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
  const { lng, lat } = useSelector((state) => state.location);

  const isMobile = window.innerWidth <= 768; // Detect mobile devices

  async function fetchData() {
    const apiUrl = isMobile
      ? `${import.meta.env.VITE_BASEURL_MOBILE}/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=${lat}&lng=${lng}&carousel=true&third_party_vendor=1`
      : `${
          import.meta.env.VITE_BASEURL_DESKTOP
        }/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    try {
      const response = await fetch(apiUrl);
      const json = await response.json();

      setData(json);
      setHeroSectionData(json?.data?.cards[0]?.card?.card);
      setTopRestaurants(json?.data?.cards[1]?.card?.card);
      setAllRestaurant(json?.data?.cards[4]?.card?.card);
      setIsUnserviceableLocation(
        json?.data?.cards[0].card?.card?.title === "Location Unserviceable"
          ? json?.data?.cards[0].card?.card
          : false
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (lat && lng) {
      fetchData();
    }
  }, [lat, lng]);

  return (
    <div className="w-full mx-auto">
      {isLoading ? (
        <RestaurantShimmer />
      ) : (
        <div className="w-[95%] lg:w-[80%] mx-auto">
          {isUnserviceableLocation && (
            <UnServiceableLocation data={isUnserviceableLocation} />
          )}

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
      )}
    </div>
  );
}

export default Body;
