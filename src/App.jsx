import React, { useState } from "react";
import Navbar from "./components/Navbar";

import { Outlet, Route, Routes } from "react-router-dom";
import { Coordinates, Visibility } from "./Context/ContextApis";

function App() {
  const [isLocationSectionVisible, setIsLocationSectionVisible] =
    useState(false);
    const [coordinates , setCoordinates] = useState({lng:"75.8913294" , lat :"22.7496812"})

  return (
    <>
        <Coordinates  value={{coordinates , setCoordinates}}>
        
      <Visibility
        value={{ isLocationSectionVisible, setIsLocationSectionVisible }}
        >
        <Navbar />
        <div
          className={
            "pt-20" +
            (isLocationSectionVisible ? " overflow-hidden max-h-screen" : "")
          }
          >
          <Outlet />
        </div>
      </Visibility>
          </Coordinates>
    </>
  );
}

export default App;
