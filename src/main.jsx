import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./components/utils/store"; // Import Redux store

import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Body from "./components/Body";
import RestaurantDetailsSection from "./components/RestaurantDetailsSection";
import CartPage from "./components/CartPage";
import SearchPage from "./components/SearchPage";
import CorporatePage from "./components/CorporatePage";
import OffersPage from "./components/OffersPage";

import { createBrowserRouter } from "react-router-dom";
import MyAccount from "./components/MyAccount";

// Create a router
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/restaurantmenu/:id", element: <RestaurantDetailsSection /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/search", element: <SearchPage /> },
      { path: "/corporate", element: <CorporatePage /> },
      { path: "/offers", element: <OffersPage /> },
      { path: "/my-account", element: <MyAccount /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <RouterProvider router={appRouter} />
  </Provider>
);
