import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";
import { Outlet, Route, Routes } from "react-router-dom";
import RestaurantMenu from "./components/RestaurantMenu";

function App() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  );
}

export default App;
