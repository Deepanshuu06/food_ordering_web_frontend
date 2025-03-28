import React from "react";
import Navbar from "./components/Navbar";

import { Outlet, Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
    <Navbar/>
    <div className="pt-20">

    <Outlet />
    </div>
    </>
  );
}

export default App;
