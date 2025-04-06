import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Outlet, Route, Routes } from "react-router-dom";
import { Coordinates, Visibility } from "./Context/ContextApis";
import { Provider, useSelector } from "react-redux";
import store from "./components/utils/store";

import ScrollToTop from "./components/utils/ScrollToTop";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLocationSectionVisible, setIsLocationSectionVisible] =
    useState(false);
  const { locationToggle } = useSelector((state) => state.toggle);

  return (
    <Provider store={store}>
      <ScrollToTop />
      <Navbar />
      <div
        className={
          "pt-16" + (locationToggle ? " overflow-hidden max-h-screen" : "")
        }
      >
        <Toaster />
        <Outlet />
      </div>
    </Provider>
  );
}

export default App;
