import React from "react";
import { NAVBAR_LOGO_PNG } from "../../constant"; // Assuming this is correct and the constant is properly set

function Navbar() {
  return (
    <div className="w-full shadow-md h-20 flex items-center justify-center">
      <div className="w-[95%]  flex  justify-between items-center">
        <div className="flex items-center ">
          <img className="w-20" src={NAVBAR_LOGO_PNG} alt="logo" />
          <div className="flex items-center">
            <p className="font-bold border-b-2 ml-4">Location</p>
            <i className="fi fi-br-angle-small-down mt-3"></i> {/* Ensure correct icon library usage */}
          </div>
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-3">
            <i className="fi fi-br-shopping-bag"></i>
            <a href="">Corporate</a>
          </div>
          <div className="flex items-center gap-3">
            <i className="fi fi-br-search"></i>
            <a href="">Search</a>
          </div>
          <div className="flex items-center gap-3"> 
            <i className="fi fi-rr-badge-percent"></i>
            <a href="">Offers</a>
          </div>
          <div className="flex items-center gap-3">
            <i className="fi fi-rr-user"></i>
            <a href="">Sign In</a>
          </div>
          <div className="flex items-center gap-3">
            <i className="fi fi-rr-basket-shopping-simple"></i>
            <a href="">Cart</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
