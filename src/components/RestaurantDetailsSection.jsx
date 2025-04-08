import React, { useEffect, useRef, useState } from "react";
import { RESTAURANTS_MENU_API } from "../../constant";
import { Link, useParams } from "react-router";
import RestaurantsMenuShimmer from "./Shimmers/RestaurantsMenuShimmer";
import OffersCard from "./cards/OffersCard";
import OffersModal from "./cards/OfferModal";
import MenuSection from "./MenuSection";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { clearCart } from "./utils/slices/cartSlice";
import { toggleDifferentRestaurantPopUp } from "./utils/slices/toggleSlice";

function RestaurantDetailsSection() {
  const { lng, lat } = useSelector((state) => state.location);
  const navigate = useNavigate();
  const params = useParams();
  const restaurantId = params?.id;
  const [isLoading, setIsLoading] = useState(true);

  const [restaurantDetails, setRestaurantDetails] = useState({});
  // const { topPicksItems, setTopPicksItem } = useState([]);
  // const [menuData, setMenuData] = useState([]);
  const [actualMenuData, setActualMenuData] = useState([]);
  const [offers, setOffers] = useState([]);
  const [offercardTranslateValue, setOffercardTranslateValue] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(null);
  const { differentRestaurantPopUp } = useSelector((state) => state.toggle);
  const dispatch = useDispatch();
  const isMobile = window.innerWidth <= 768; // Detect mobile devices

  async function fetchdata() {
    const apiUrl = isMobile
      ? `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${
          restaurantId.match(/rest(\d+)$/)[1]
        }&submitAction=ENTER`
      : `${
          import.meta.env.VITE_BASEURL
        }/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${
          restaurantId.match(/rest(\d+)$/)[1]
        }`;

    isMobile ? console.log("mob api called") : console.log("web api called");

    try {
      const data = await fetch(apiUrl);
      const response = await data.json();

      setRestaurantDetails(response?.data?.cards[2]?.card?.card?.info);
      setOffers(
        response?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
          ?.offers
      );
      // setMenuData(
      //   response?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
      // );
      // setTopPicksItem(
      //   (
      //     data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards ?? []
      //   ).filter((item) => item?.card?.card?.title === "Top Picks")
      // );

      isMobile
        ? setActualMenuData(
            (
              response?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR
                ?.cards ?? []
            ).filter(
              (data) =>
                data?.card?.card?.itemCards || data?.card?.card?.categories
            )
          )
        : setActualMenuData(
            (
              response?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR
                ?.cards ?? []
            ).filter(
              (data) =>
                data?.card?.card?.itemCards || data?.card?.card?.categories
            )
          );

      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
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

  const prevCoords = useRef({ lat, lng });

  // Redirection when lat/lng change
  useEffect(() => {
    if (lat !== prevCoords.current.lat || lng !== prevCoords.current.lng) {
      prevCoords.current = { lat, lng };
      navigate("/");
    }
  }, [lat, lng, navigate]);

  return (
    <div className="w-full mx-auto">
      <div className="w-[95%] lg:w-[60%] md:[75%] mx-auto">
        {isLoading ? (
          <RestaurantsMenuShimmer />
        ) : (
          <div className="relative w-full ">
            <div>
              {differentRestaurantPopUp && (
                <div className="flex justify-center items-center">
                  <div className=" h-[30%] w-[90%] lg:h-[30%] lg:w-[40%] z-30 fixed bottom-3 bg-white p-8 rounded-lg shadow-2xl shadow-black space-y-1 gap-5 flex flex-col">
                    <div className="flex flex-col gap-2">
                      <h1 className="text-lg lg:text-xl font-bold  text-black">
                        Items Already in Cart
                      </h1>
                      <p className="text-gray-700 text-xs  lg:text-[15px] ">
                        Your cart contains items from another restaurant. Would
                        you like to reset your cart to add items from this
                        restaurant?
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <button
                        className="px-2 lg:px-6 lg:py-2 py-1 bg-white text-emerald-600 w-[50%] border-2 border-green-800 text-xs  font-semibold transition duration-300 hover:bg-gray-100"
                        onClick={() =>
                          dispatch(toggleDifferentRestaurantPopUp())
                        }
                      >
                        NO
                      </button>
                      <button
                        className="px-2 lg:px-6 lg:py-2 py-1 bg-emerald-600 text-white w-[50%] text-md font-bold text-xs  transition duration-300 hover:bg-emerald-800"
                        onClick={() => {
                          dispatch(clearCart());
                          toast.success("Cart cleared, now you can add items");
                          dispatch(toggleDifferentRestaurantPopUp());
                        }}
                      >
                        YES, START AFRESH
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
              <i className="fi fi-rs-menu-food text-lg p-2 mr-2"></i>
            </div>

            {/* Search Section */}
            <Link to={"/search"}>
              <div className="w-full  flex  mt-5 bg-gray-200 rounded-xl">
                <span className="items-center p-2 mx-auto font-bold">
                  Search for dishes
                </span>
                <i className="fi fi-br-search text-lg p-2 mr-2"></i>
              </div>
            </Link>

            {/* Menu Section */}
            <div className="pt-5">
              {actualMenuData.map(({ card: { card } }, index) => (
                <MenuSection
                  card={card}
                  restaurantDetails={restaurantDetails}
                  key={card?.info?.id || index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RestaurantDetailsSection;
