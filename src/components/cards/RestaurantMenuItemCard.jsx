import React, { useState } from "react";
import { MENU_ITEM_CONST_IMAGE_URL } from "../../../constant";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  clearCart,
  increaseQuantity,
  setResInfo,
} from "../utils/slices/cartSlice";
import toast, { Toaster } from "react-hot-toast";

import { toggleDifferentRestaurantPopUp } from "../utils/slices/toggleSlice";

function RestaurantMenuItemCard({ card, restaurantDetails }) {
  const [isMenuItemCardOpen, setIsMenuItemCardOpen] = useState(true);
  const [isDiscriptionExpanded, setIsDiscriptionExpanded] = useState(false);
  const [existingItem, setExistingItem] = useState([]);

  const dispatch = useDispatch();
  const { items, resInfo } = useSelector((state) => state.cart);

  const quantity = existingItem ? existingItem.itemQuantity : 0;

  function handleisMenuItemCardOpen() {
    setIsMenuItemCardOpen(!isMenuItemCardOpen);
  }
  function toggleDiscription() {
    setIsDiscriptionExpanded(!isDiscriptionExpanded);
  }

  const handleAddToCart = (info) => {
    // if (!info?.id) {
    //   toast.error("Invalid item.");
    //   return;
    // }
    const foundItem = items.find((item) => item.id === info?.id);

    if (foundItem) {
      dispatch(
        increaseQuantity({ id: info.id, quantity: foundItem.itemQuantity + 1 })
      );
      toast.success(`${info.name} Quantity increased`, { duration: 1000 });
    } else {
      if (resInfo == null || resInfo?.id == restaurantDetails?.id) {
        dispatch(addToCart({ ...info, itemQuantity: 1 }));
        dispatch(setResInfo(restaurantDetails));
        toast.success(`${info.name} added to cart.`, { duration: 1000 });
        console.log(resInfo);
      } else {
        dispatch(toggleDifferentRestaurantPopUp());
      }
    }
  };

  if (card?.itemCards) {
    return (
      <div>
        <div className="border-b-5 border-slate-200 mt-6">
          <div
            className="flex justify-between items-center  bg-white py-4 px-4 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleisMenuItemCardOpen}
          >
            <h1 className="text-lg text-gray-950">
              {card?.title}{" "}
              <span className="text-gray-500 ml-1">
                ({card?.itemCards?.length})
              </span>
            </h1>
            <span className="text-gray-600">
              {isMenuItemCardOpen ? (
                <i className="fi fi-rr-angle-small-up text-2xl"></i>
              ) : (
                <i className="fi fi-rr-angle-small-down text-2xl"></i>
              )}
            </span>
          </div>

          <div className="px-4 ">
            {isMenuItemCardOpen &&
              card?.itemCards?.map(({ card: { info } }) => (
                <div
                  key={info?.id}
                  className="flex flex-row justify-between py-6 border-t border-gray-200 duration-1000"
                >
                  {/* Text Content */}

                  <div className="md:pr-8 flex-1">
                    <div className="mb-2">
                      {info?.itemAttribute?.vegClassifier === "VEG" ? (
                        <span className="text-green-600">🟢</span>
                      ) : (
                        <span className="text-red-600">🔴</span>
                      )}
                    </div>

                    <h2 className="text-lg font-semibold text-gray-800 mb-1">
                      {info?.name}
                    </h2>

                    {/* Mobile version */}
                    <p
                      className={`text-gray-600 text-sm mb-3 lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        !isDiscriptionExpanded ? "line-clamp-3" : ""
                      }`}
                    >
                      {info?.description}
                    </p>

                    {/* Show More button on mobile */}
                    <div className="lg:hidden">
                      <button
                        onClick={toggleDiscription}
                        className="text-blue-500 text-sm "
                      >
                        {isDiscriptionExpanded ? "Show Less" : "Show More"}
                      </button>
                    </div>

                    {/* Desktop version */}
                    <p className="text-gray-600 text-sm mb-3 hidden lg:flex w-[90%]">
                      {info?.description}
                    </p>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="font-medium text-gray-800">
                        ₹
                        {info?.price ? (
                          <span>{info?.price / 100}</span>
                        ) : (
                          <span>{info?.defaultPrice / 100}</span>
                        )}
                      </span>
                      {info?.offerTags?.[0] && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                          {info.offerTags[0].title} -{" "}
                          {info.offerTags[0].subTitle}
                        </span>
                      )}
                    </div>
                    <div>
                      {info?.ratings?.aggregatedRating?.rating ? <h1 className="text-xs"> 
                       <span className="text-emerald-800" > {info?.ratings?.aggregatedRating?.rating}</span> -
                        {info?.ratings?.aggregatedRating?.ratingCount}
                      </h1> : <></> }
                      
                    </div>
                  </div>

                  {/* Image */}
                  {info?.imageId ? (
                    <div className="mt-4 md:mt-0 w-32 h-32 flex flex-col items-center relative">
                      <div className="relative aspect-square rounded-2xl overflow-hidden w-full">
                        <img
                          className="w-full h-full object-cover"
                          src={MENU_ITEM_CONST_IMAGE_URL + info.imageId}
                          alt={info.name}
                        />
                        {/* Add to Cart Button */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-100/90 to-transparent flex items-end justify-center pb-1">
                          <button
                            className={`bg-white border border-gray-300 text-green-600 font-semibold px-3 py-1 rounded-md hover:bg-gray-100 transition-colors text-sm shadow-sm cursor-pointer `}
                            onClick={() => {
                              handleAddToCart(info);
                            }}
                          >
                            <h1>Add to Cart</h1>
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      className={`bg-white border border-gray-300 text-green-600 font-semibold px-8  rounded-md hover:bg-gray-100 transition-colors text-sm shadow-sm cursor-pointer `}
                      onClick={() => {
                        handleAddToCart(info);
                      }}
                    >
                      <h1>Add to Cart</h1>
                    </button>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="border-b-8 border-slate-200 mt-10">
        <div className="px-4 py-4">
          <h2 className="text-xl  text-gray-800 mb-2">{card?.title}</h2>
          <div>
            {card?.categories?.map((item) => (
              <RestaurantMenuItemCard key={item?.id} card={item} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default RestaurantMenuItemCard;
