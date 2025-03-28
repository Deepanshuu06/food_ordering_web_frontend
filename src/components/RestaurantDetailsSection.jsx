import React, { useEffect, useState } from "react";
import { RESTAURANTS_MENU_API } from "../../constant";
import { Link, useParams } from "react-router";
import RestaurantsMenuShimmer from "./Shimmers/RestaurantsMenuShimmer";
import OffersCard from "./cards/OffersCard";
import OffersModal from "./cards/OfferModal";
import MenuSection from "./MenuSection";

function RestaurantDetailsSection() {
  const params = useParams();
  const restaurantId = params?.id;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [menuData, setMenuData] = useState([]);
  const [actualMenuData, setActualMenuData] = useState([]);
  const [offers, setOffers] = useState([]);
  const [offercardTranslateValue, setOffercardTranslateValue] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);

  async function fetchdata() {
    
    const data = await fetch(
      RESTAURANTS_MENU_API + restaurantId.match(/rest(\d+)$/)[1]
    );
    const response = await data.json();
    setData(response);
    setRestaurantDetails(response?.data?.cards[2]?.card?.card?.info);
    setOffers(
      response?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setMenuData(
      response?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    );
    setActualMenuData(
      (response?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? []).filter(
        (data) => data?.card?.card?.itemCards || data?.card?.card?.categories
      )
    );
    setIsLoading(false);
  }

  useEffect(() => {
    fetchdata();
  }, [params?.id]);

  function handlePrev() {
    if (offercardTranslateValue > 0) {
      setOffercardTranslateValue((prev) => prev - 30);
    }
  }
  function handleNext() {
    setOffercardTranslateValue((prev) => prev + 30);
  }

  return (
    <div className="w-full mx-auto">
      <div className="w-[95%] lg:w-[60%] md:[75%] mx-auto">
        {isLoading ? (
          <RestaurantsMenuShimmer />
        ) : (
          <div>
            {/* Navigation */}
            <p className="text-xs font-mono pt-8 text-slate-400">
              {" "}
              <Link to={"/"}>
                <span className="hover:cursor-pointer hover:text-slate-700">
                  Home
                </span>
              </Link>{" "}
              /{" "}
              <Link to={`/city/${restaurantDetails?.city}`}>
                <span className="hover:cursor-pointer hover:text-slate-700">
                  {restaurantDetails?.city}
                </span>
              </Link>{" "}
              / {restaurantDetails?.name}
            </p>

            {/* Restaurant details card */}
            <h1 className="text-2xl font-bold pt-8 pl-6">
              {restaurantDetails.name}
            </h1>
            <div className="w-full h-56 bg-gradient-to-t from-slate-200 to-white rounded-4xl flex justify-center items-center">
              <div className="w-[95%] h-[85%] bg-white rounded-4xl border border-gray-300 shadow-lg flex flex-col justify-center p-4 hover:shadow-xl transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 ">
                  <span>
                    <i className="fi fi-ss-circle-star text-green-600 pr-2 items-center"></i>
                  </span>
                  {restaurantDetails?.avgRatingString}{" "}
                  {`( ${restaurantDetails?.totalRatingsString} )`} -{" "}
                  {restaurantDetails?.costForTwoMessage}
                </h2>
                <h3 className="overflow-hidden whitespace-nowrap text-ellipsis text-orange-600 font-bold mb-3  transition-colors duration-300 cursor-pointer">
                  {restaurantDetails?.cuisines}
                </h3>
                <div className="flex flex-col space-y-2">
                  <h4 className="text-sm text-gray-700 flex items-center ">
                    <span>
                      <i className="fi fi-rs-marker pr-2"></i>
                    </span>
                    <span className="font-bold">Outlet</span> -{" "}
                    <span className="text-sm">
                      {restaurantDetails?.areaName}
                    </span>
                  </h4>
                  <h4 className="text-sm text-gray-700 flex items-center font-bold">
                    <span>
                      <i className="fi fi-rr-clock pr-2"></i>
                    </span>
                    {restaurantDetails?.sla?.slaString}
                  </h4>
                </div>
              </div>
            </div>

            {/* Offers Section */}
            <div>
              <div className="flex justify-between items-center pt-8">
                <h1 className="font-bold text-2xl pl-6 ">Deals for you</h1>
                <div className="gap-5 flex">
                  <i
                    onClick={handlePrev}
                    className="fi text-3xl fi-br-angle-circle-left cursor-pointer"
                  ></i>
                  <i
                    onClick={handleNext}
                    className="fi text-3xl fi-br-angle-circle-right cursor-pointer"
                  ></i>
                </div>
              </div>
              <div className="overflow-hidden">
                <div
                  className="flex gap-6 pt-7 transition-transform duration-300"
                  style={{
                    transform: `translateX(-${offercardTranslateValue}%)`,
                  }}
                >
                  {offers.map((offer) => (
                    <OffersCard
                      data={offer}
                      key={offer?.info?.offerIds[0]}
                      onClick={() => setSelectedOffer(offer)}
                    />
                  ))}
                </div>

                {selectedOffer && (
                  <OffersModal
                    data={selectedOffer}
                    onClose={() => setSelectedOffer(null)}
                  />
                )}
              </div>
            </div>

            {/* Menu Title Text */}
            <div className="w-full flex items-center pt-10">
              <h1 className="mx-auto font-mono ">Menu</h1>
              <i class="fi fi-rs-menu-food text-lg p-2 mr-2"></i>
            </div>

            {/* Search Section */}
            <Link to={"/search"}>
              <div className="w-full  flex  mt-5 bg-gray-200 rounded-xl">
                <span className="items-center p-2 mx-auto font-bold">
                  Search for dishes
                </span>
                <i class="fi fi-br-search text-lg p-2 mr-2"></i>
              </div>
            </Link>

            {/* Menu Section */}
            <div className="pt-5">
              {actualMenuData.map(({ card: { card } }) => (
                <MenuSection card={card}/>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetailsSection;
