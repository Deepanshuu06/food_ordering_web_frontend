import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import ErrorPage from "./components/ErrorPage";
import Body from "./components/Body";
import RestaurantDetailsSection from "./components/RestaurantDetailsSection";
import CartPage from "./components/CartPage";
import SearchPage from "./components/SearchPage";
import CorporatePage from "./components/CorporatePage";
import OffersPage from "./components/OffersPage";

// Create a root and render the application

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/restaurantmenu/:id",
        element: <RestaurantDetailsSection/> ,
      },
      {
        path:"/cart",
        element : <CartPage/>
      },
      {
        path:"/search",
        element:<SearchPage/>
      },
      {
        path:"/corporate",
        element:<CorporatePage/>
      }
      ,
      {
        path:"/offers",
        element:<OffersPage/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
