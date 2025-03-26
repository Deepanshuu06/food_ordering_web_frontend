import React from "react";
import { NAVBAR_LOGO_PNG } from "../../constant"; // Assuming this is correct and the constant is properly set
import { Link } from "react-router";

function Navbar() {

  const navItems = [
    {
      name: "Corporate",
      icon: <i className="fi fi-br-shopping-bag"></i>
    },
    {
      name: "Search",
      icon: <i className="fi fi-br-search"></i>
    },
    {
      name: "Offers",
      icon: <i className="fi fi-rr-badge-percent"></i>
    },
    {
      name: "Sign In",
      icon: <i className="fi fi-rr-user"></i>
    },
    {
      name: "Cart",
      icon: <i className="fi fi-rr-basket-shopping-simple"></i>
    }
  ];

  return (
    <div className="w-full shadow-md h-20 flex items-center justify-center">
      <div className="w-[95%] flex justify-between items-center">
        <div className="flex items-center ">
     <Link to={"/"}>
     <img className="w-20" src={NAVBAR_LOGO_PNG} alt="logo" />  
     </Link> 
          <div className="flex items-center">
            <p className="font-bold border-b-2 ml-4">Location</p>
            <i className="fi fi-br-angle-small-down mt-3"></i> {/* Ensure correct icon library usage */}
          </div>
        </div>
        <div className="flex items-center justify-between gap-10">
          <div className="flex items-center gap-10">
            {navItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                {item.icon}
                <a href="#" className="text-md">{item.name}</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
