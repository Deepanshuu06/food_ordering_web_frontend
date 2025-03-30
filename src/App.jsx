import React, { useState } from "react";
import Navbar from "./components/Navbar";

import { Outlet, Route, Routes } from "react-router-dom";
import { Coordinates, Visibility } from "./Context/ContextApis";
import { Provider } from "react-redux";
import store from "./components/utils/store";

function App() {
  const [isLocationSectionVisible, setIsLocationSectionVisible] =
    useState(false);

  return (
    <>
      <Provider store={store}>
        <Visibility
          value={{ isLocationSectionVisible, setIsLocationSectionVisible }}
        >
          <Navbar />
          <div
            className={
              "pt-16" +
              (isLocationSectionVisible ? " overflow-hidden max-h-screen" : "")
            }
          >
            <Outlet />
          </div>
        </Visibility>
      </Provider>
    </>
  );
}

export default App;
