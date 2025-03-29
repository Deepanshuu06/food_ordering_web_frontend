import React, { useState } from "react";
import { NAVBAR_LOGO_PNG } from "../../constant";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLocationSectionVisible, setIsLocationSectionVisible] =
    useState(false);

  const navItems = [
    { name: "Corporate", icon: <i className="fi fi-br-shopping-bag"></i> },
    { name: "Search", icon: <i className="fi fi-br-search"></i> },
    { name: "Offers", icon: <i className="fi fi-rr-badge-percent"></i> },
    { name: "Sign In", icon: <i className="fi fi-rr-user"></i> },
    { name: "Cart", icon: <i className="fi fi-rr-basket-shopping-simple"></i> },
  ];

  function handleLocationVisibility() {
    setIsLocationSectionVisible((prev) => !prev);
  }

  return (
    <div>
      {isLocationSectionVisible && (
        <div className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={handleLocationVisibility} // Close on click outside
          ></div>

          {/* Content Box */}
          <div className="w-[40%] h-full bg-white p-6 rounded-lg shadow-lg z-50 transition-transform duration-300 transform scale-100">
            <h2 className="text-xl font-bold mb-4">Your Location</h2>
            <p className="text-gray-600">
              Select your preferred location from the options below.
            </p>
            <button
              onClick={handleLocationVisibility}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="w-full shadow-md h-16 flex items-center justify-center fixed top-0 bg-white z-30">
        <div className="w-[95%] flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/">
              <img className="w-20" src={NAVBAR_LOGO_PNG} alt="logo" />
            </Link>
            <div
              className="flex items-center hidden lg:flex cursor-pointer"
              onClick={handleLocationVisibility}
            >
              <p className="font-bold border-b-2 ml-4">Location</p>
              <i className="fi fi-br-angle-small-down mt-3"></i>
            </div>
          </div>

          <div className="flex items-center justify-between gap-10">
            <div className="lg:flex items-center gap-10 hidden">
              {navItems.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {item.icon}
                  <a href="#" className="text-md">
                    {item.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
