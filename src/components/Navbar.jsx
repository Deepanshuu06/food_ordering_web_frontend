import React, { useContext, useEffect, useState } from "react";
import { LATandLONG_API, LOCATION_API, NAVBAR_LOGO_PNG } from "../../constant";
import { Link } from "react-router-dom";
import { Visibility } from "../Context/ContextApis";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "./utils/slices/locationSlice";

function Navbar() {
  const dispatch = useDispatch() 
  const { isLocationSectionVisible, setIsLocationSectionVisible } =
    useContext(Visibility);

  const [locationName, setLocationName] = useState("");
  const [locationSearchText, setLocationSearchText] = useState("");
  const [locationSearchResult, setLocationSearchResult] = useState([]);
  const [error, setError] = useState(null);

  const {items , totalprice} = useSelector( (state)=>state.cart)

  


  const navItems = [
    {
      name: "Corporate",
      icon: <i className="fi fi-br-shopping-bag"></i>,
      link: "/corporate",
    },
    {
      name: "Search",
      icon: <i className="fi fi-br-search"></i>,
      link: "/search",
    },
    {
      name: "Offers",
      icon: <i className="fi fi-rr-badge-percent"></i>,
      link: "/offers",
    },
    {
      name: "Sign In",
      icon: <i className="fi fi-rr-user"></i>,
      link: "/signin",
    },
    {
      name: "Cart",
      icon: <i className="fi fi-rr-basket-shopping-simple"></i>,
      link: "/cart",
    },
  ];



  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setCoordinates({ lat: latitude, lng: longitude }))

          setIsLocationSectionVisible(false);
        },
        (err) => {
          setError("Unable to retrieve your location.");
          console.error(err);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
    }
  };

  function handleLocationVisibility() {
    setIsLocationSectionVisible((prev) => !prev);
  }

  async function fetchLocation() {
    const response = await fetch(`${LOCATION_API}${locationSearchText}`);
    const data = await response.json();
    setLocationSearchResult(data?.data);
  }

  async function fetchlatandlang(item) {
    const res = await fetch(LATandLONG_API + item?.place_id);
    const data = await res.json();

   

    dispatch(setCoordinates({
      lat: data?.data[0]?.geometry?.location?.lat,
      lng: data?.data[0]?.geometry?.location?.lng,
    }))

    setLocationName(item?.structured_formatting?.main_text);
    setIsLocationSectionVisible(false);
  }

  useEffect(() => {
    fetchLocation();
  }, [locationSearchText]);



  return (
    <div>
      {isLocationSectionVisible && (
        <div className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300  lg:flex md:flex">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleLocationVisibility} // Close on click outside
          ></div>

          {/* Content Box */}
          <div
            className={`absolute w-[100%] lg:w-[40%] h-full bg-white p-6 rounded-lg shadow-lg z-50 duration-1000  ${
              isLocationSectionVisible ? " left-0" : "-left-[100%]"
            }`}
          >
            <div className="flex flex-col gap-2 ">
              <button
                onClick={handleLocationVisibility}
                className="mt-4 bg-red-500 w-[40px] text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
              >
                X
              </button>

              <input
                className="w-[90%] h-12 shadow-2xl p-6 border border-slate-300 rounded-xl bg-white focus:outline-none"
                type="text"
                name="searchLocation"
                id="searchLocation"
                placeholder="Search for area, street name .."
                onChange={(e) => setLocationSearchText(e.target.value)}
              />
              {locationSearchText.length <= 2 && (
                <div
                  className="w-[90%] h-20 shadow-2xl p-6 border border-slate-300 rounded-xl bg-white flex gap-6 items-center cursor-pointer"
                  onClick={() => {
                    getUserLocation();
                  }}
                >
                  <i class="fi fi-rr-target text-2xl"></i>
                  <div>
                    <h1 className="font-bold text-slate-500 hover:text-orange-600">
                      Get Your Current Location
                    </h1>
                    <p className="text-xs">Using GPS</p>
                    <p className="text-xs">{error}</p>
                  </div>
                </div>
              )}
              <div className="flex overflow-scroll flex-col ">
                {locationSearchResult?.map((item) => {

                  return (
                    <div
                      className="w-[90%] shadow-2xl p-6 border border-slate-300 rounded-xl bg-white flex gap-6 items-center cursor-pointer "
                      onClick={() => fetchlatandlang(item)}
                    >
                      <i class="fi fi-rs-marker text-2xl"></i>
                      <div>
                        <h1 className="font-bold text-slate-500 hover:text-orange-600">
                          {item?.structured_formatting?.main_text}
                        </h1>
                        <p className="text-xs">
                          {item?.structured_formatting?.secondary_text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full shadow-md h-16 flex items-center justify-center fixed top-0 bg-white z-30">
        <div className="w-[95%] flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img className="w-15 lg:w-20" src={NAVBAR_LOGO_PNG} alt="logo" />
            </Link>
            <div
              className="flex items-center  md:flex lg:flex cursor-pointer"
              onClick={handleLocationVisibility}
            >
              <p className="font-bold border-b-1 py-1 ml-4 pr-3 text-xs lg:text-lg">
                {locationName || "other"}
              </p>
              <i className="fi fi-br-angle-small-down mt-2 text-2xl"></i>
            </div>
          </div>

          <div className="flex items-center justify-between gap-10">
            <div className="lg:flex items-center gap-10 hidden">
              {navItems.map((item, index) => (
                <Link to={item?.link}>
                  <div key={index} className="flex items-center gap-2">
                    {item.icon}
                    <a href="#" className="text-md">
                      {item.name}
                    </a>
                  </div>
                </Link>
              ))} 
              <p>{items.length}</p>
              <p>{Math.ceil(totalprice /100)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
