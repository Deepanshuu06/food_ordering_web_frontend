import React, { useEffect, useState } from "react";
import { LATandLONG_API, LOCATION_API, NAVBAR_LOGO_PNG } from "../../constant";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCoordinates } from "./utils/slices/locationSlice";
import {
  changeLocationToggle,
  changeLoginToggle,
} from "./utils/slices/toggleSlice";

function Navbar() {
  const dispatch = useDispatch();
  const { locationToggle, loginToggle } = useSelector((state) => state.toggle);
  const [locationName, setLocationName] = useState("");
  const [locationSearchText, setLocationSearchText] = useState("");
  const [locationSearchResult, setLocationSearchResult] = useState([]);
  const [error, setError] = useState(null);
  const { items, totalprice } = useSelector((state) => state.cart);
  const navigate = useNavigate();

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
      onClick: () => dispatch(changeLoginToggle(true)),
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
          dispatch(setCoordinates({ lat: latitude, lng: longitude }));
          dispatch(changeLocationToggle(false));
          navigate("/");
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

  const handleLocationVisibility = () => {
    dispatch(changeLocationToggle(!locationToggle));
  };

  const fetchLocation = async () => {
    const response = await fetch(`${LOCATION_API}${locationSearchText}`);
    const data = await response.json();
    setLocationSearchResult(data?.data);
  };

  const fetchlatandlang = async (item) => {
    const res = await fetch(LATandLONG_API + item?.place_id);
    const data = await res.json();

    dispatch(
      setCoordinates({
        lat: data?.data[0]?.geometry?.location?.lat,
        lng: data?.data[0]?.geometry?.location?.lng,
      })
    );

    setLocationName(item?.structured_formatting?.main_text);
    dispatch(changeLocationToggle(false));
  };

  useEffect(() => {
    if (locationSearchText?.length > 2) {
      fetchLocation();
    }
  }, [locationSearchText]);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();

    console.log("Login data:", loginData);

    dispatch(changeLoginToggle(false));
  };

  return (
    <div>
      {/* Location Selection Modal */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 flex ${
          locationToggle
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 transition-opacity duration-300"
          onClick={handleLocationVisibility}
        ></div>

        <div
          className={`absolute w-full lg:w-[40%] h-full bg-white p-6 shadow-lg z-50 transition-transform duration-500 ease-in-out ${
            locationToggle ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-4">
            <button
              onClick={handleLocationVisibility}
              className="self-end bg-red-500 w-10 text-white px-2 py-2 rounded hover:bg-red-600 transition-colors"
            >
              X
            </button>

            <input
              className="w-full h-12 px-4 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              type="text"
              placeholder="Search for area, street name..."
              value={locationSearchText}
              onChange={(e) => setLocationSearchText(e.target.value)}
            />

            {locationSearchText?.length <= 2 && (
              <div
                className="w-full p-4 border border-slate-300 rounded-lg bg-white flex items-center gap-4 cursor-pointer hover:bg-gray-50"
                onClick={getUserLocation}
              >
                <i className="fi fi-rr-target text-2xl text-orange-500"></i>
                <div>
                  <h1 className="font-semibold text-gray-700">
                    Use Current Location
                  </h1>
                  <p className="text-sm text-gray-500">
                    {error || "Using GPS"}
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh]">
              {locationSearchResult?.map((item) => (
                <div
                  key={item.place_id}
                  className="w-full p-4 border border-slate-300 rounded-lg bg-white flex items-center gap-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => fetchlatandlang(item)}
                >
                  <i className="fi fi-rs-marker text-2xl text-orange-500"></i>
                  <div>
                    <h1 className="font-semibold text-gray-700">
                      {item?.structured_formatting?.main_text}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {item?.structured_formatting?.secondary_text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Login Modal */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 flex ${
          loginToggle
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 transition-opacity duration-300"
          onClick={() => dispatch(changeLoginToggle(false))}
        ></div>

        <div
          className={`absolute w-full lg:w-[40%] h-full bg-white p-6 shadow-lg z-50 transition-transform duration-500 ease-in-out ${
            loginToggle ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ right: 0 }}
        >
          <div className="flex flex-col gap-6">
            <button
              onClick={() => dispatch(changeLoginToggle(false))}
              className="self-end bg-red-500 w-10 text-white px-2 py-2 rounded hover:bg-red-600 transition-colors"
            >
              X
            </button>

            <h2 className="text-2xl font-bold text-center">Sign In</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={loginData.email}
                  onChange={(e) =>
                    setLoginData({ ...loginData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={loginData.password}
                  onChange={(e) =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Sign In
              </button>

              <div className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-orange-500 hover:underline"
                  onClick={() => {
                    dispatch(changeLoginToggle(false));
                    // Add your sign up navigation here
                  }}
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full shadow-md h-16 flex items-center justify-center fixed top-0 bg-white z-30">
        <div className="w-[95%] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img
                className="w-16 lg:w-20"
                src={NAVBAR_LOGO_PNG}
                alt="Company Logo"
              />
            </Link>
            <div
              className="flex items-center cursor-pointer hover:text-orange-500 transition-colors"
              onClick={handleLocationVisibility}
            >
              <span className="font-semibold text-sm lg:text-base border-b border-dashed border-gray-400">
                {locationName || "Select Location"}
              </span>
              <i className="fi fi-br-angle-small-down text-lg ml-1"></i>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) =>
              item.link ? (
                <Link
                  key={item.name}
                  to={item.link}
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  {item.icon}
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              )
            )}
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm font-medium">
                Cart: {items?.length} items
              </span>
              <span className="text-sm font-medium text-orange-500">
                ₹{Math.ceil(totalprice / 100)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
