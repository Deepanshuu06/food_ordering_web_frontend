import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "./utils/slices/cartSlice";
import { MENU_ITEM_CONST_IMAGE_URL } from "../../constant";

function CartPage() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState("");
  const [isSignInFormOpen, setIsSignInFormOpen] = useState(false);
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);

  const itemTotal =
    cart?.items?.reduce(
      (acc, item) =>
        acc + (item?.price || item?.defaultPrice) * item.itemQuantity,
      0
    ) || 0;
  const deliveryFee = itemTotal * 0.25;
  const gstCharges = itemTotal * 0.18;
  const totalAmount = itemTotal + deliveryFee + gstCharges;

  //   const handleQuantityChange = (index, type) => {
  //     const newCart = [...cart.item];
  //     if (type === "increase") newCart[index].quantity += 1;
  //     if (type === "decrease" && newCart[index].quantity > 1)
  //       newCart[index].quantity -= 1;
  //     dispatch({ type: "UPDATE_CART", payload: newCart });
  //   };

  const handleUpdateQuantity = (data, type) => {
    if (type === "increase" && data.itemQuantity < 15) {
      dispatch(increaseQuantity({ id: data.id }));
    }

    if (type === "decrease") {
      if (data.itemQuantity > 1) {
        dispatch(decreaseQuantity({ id: data.id }));
      } else {
        dispatch(removeFromCart({ id: data.id }));
      }
    }
  };

  return (
    <div className="w-full mx-auto bg-slate-100 pt-10 min-h-screen">
      <div className="w-[90%] mx-auto flex flex-col lg:flex-row gap-8">
        {/* Left Section */}
        <div className="w-full lg:w-[70%] flex flex-col gap-8">
          <div className="flex bg-white p-12 shadow-md rounded-md">
            <div className="w-full flex flex-col gap-4">
              <h1 className="text-xl font-bold">Account</h1>
              <p className="text-slate-500 text-sm">
                To place your order now, log in to your existing account or sign
                up.
              </p>
              <div className="flex gap-4">
                <button
                  className="flex items-center justify-center gap-2 border-green-600 border-2 py-2 px-6 text-green-600 cursor-pointer text-sm hover:bg-green-100 rounded-md transition"
                  onClick={() => {
                    setIsSignInFormOpen(true);
                    setIsSignUpFormOpen(false);
                  }}
                >
                  <span>Sign In</span>
                </button>
                <button
                  className="flex items-center justify-center gap-2 border-green-600 bg-green-700 border-2 py-2 px-6 text-white cursor-pointer text-sm hover:bg-green-800 rounded-md transition"
                  onClick={() => {
                    setIsSignUpFormOpen(true);
                    setIsSignInFormOpen(false);
                  }}
                >
                  <span>SIGN UP</span>
                </button>
              </div>

              {/* Sign Up form */}
              {isSignUpFormOpen && (
                <div className="w-full">
                  <h1 className="font-bold py-2">
                    Sign up or log in to your account
                  </h1>
                  <form
                    action="signUp"
                    className="flex flex-col gap-2"
                    method="post"
                  >
                    <input
                      className="border-1 border-slate-300 p-5 w-[80%] outline-none  "
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                    />
                    <input
                      className="border-1 border-slate-300 p-5 w-[80%] outline-none "
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name"
                    />
                    <input
                      className="border-1 border-slate-300 p-5 w-[80%] outline-none "
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email"
                    />
                    <input
                      className="border-1 border-slate-300 p-5 w-[80%] outline-none "
                      type="text"
                      name="referralCode"
                      id="referralCode"
                      placeholder="Referral Code"
                    />
                    <button
                      className="border-1 border-slate-300 bg-green-600 text-white p-5 w-[80%] outline-none"
                      type="submit"
                    >
                      Continue
                    </button>
                    <p className="text-xs w-[80%]">
                      By creating an account, I accept the Terms & Conditions &
                      Privacy Policy
                    </p>
                  </form>
                </div>
              )}

              {/* Sign In form */}
              {isSignInFormOpen && (
                <div className="w-full">
                  <h1 className="font-bold py-2">
                    Enter login details or create an account
                  </h1>
                  <form
                    action="signIn"
                    className="flex flex-col gap-2"
                    method="post"
                  >
                    <input
                      className="border-1 border-slate-300 p-5 w-[80%] outline-none "
                      type="text"
                      name="phoneNumber"
                      placeholder="Phone Number"
                    />
                    <button
                      className="border-1 border-slate-300 bg-green-600 text-white p-5 w-[80%] outline-none"
                      type="submit"
                    >
                      Login
                    </button>
                    <p className="text-xs w-[80%]">
                      By creating an account, I accept the Terms & Conditions &
                      Privacy Policy
                    </p>
                  </form>
                </div>
              )}
            </div>
            <img
              src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_147,h_140/Image-login_btpq7r"
              alt="Account"
              className="w-32 h-32 object-cover ml-4"
            />
          </div>

          <div className="bg-white p-8 shadow-md rounded-md">
            <h1 className="text-xl font-bold">Delivery Address</h1>
            <p className="text-slate-500 text-sm mt-2">
              Your current delivery address will be shown here.
            </p>
          </div>

          <div className="bg-white p-8 shadow-md rounded-md">
            <h1 className="text-xl font-bold">Payment</h1>
            <p className="text-slate-500 text-sm mt-2">
              Select your preferred payment method.
            </p>
          </div>
        </div>

        {/* Right Section (Cart Items) */}
        <div className="w-full lg:w-[40%] bg-white p-5 sticky top-10 max-h-[80vh] overflow-y-auto shadow-md rounded-md">
          <div className="bg-white p-4 rounded-md shadow-md mb-4">
            <h1 className="text-xl font-bold">Cart Items</h1>
          </div>

          {cart?.items?.length > 0 ? (
            cart.items.map((item, index) =>
              item.itemQuantity > 0 ? (
                <div
                  key={item.id || index}
                  className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm mb-4 transition-transform transform hover:scale-105 gap-2"
                >
                  <div className="flex items-center gap-2">
                    <div>
                      <img
                        className="w-20 h-15 object-cover rounded-lg"
                        src={`${MENU_ITEM_CONST_IMAGE_URL}${item.imageId}`}
                        alt={item?.name || "Menu Item"}
                      />
                      <h1>{console.log(item)
                      }</h1>
                    </div>
                    <div className="w-[90%]">
                      <h2 className="text-[10px]">{item?.name}</h2>
                      {(item?.addons) ? <p className="text-sm text-gray-500">
                       customize
                       </p> : "" }
                      
                    </div>
                  </div>
                  <div className="flex items-center  border-slate-600 border justify-around">
                    <button
                      onClick={() => handleUpdateQuantity(item, "decrease")}
                      className="rounded-md hover:bg-gray-100 transition cursor-pointer px-3"
                    >
                      -
                    </button>
                    <span>{item.itemQuantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item, "increase")}
                      className="hover:bg-gray-100 transition cursor-pointer px-3"
                    >
                      +
                    </button>
                  </div>
                  <div>
                    <h2 className="font-bold">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "INR",
                      }).format(
                        ((item?.price || item?.defaultPrice || 0) / 100) *
                          (item?.itemQuantity || 0)
                      )}
                    </h2>
                  </div>
                </div>
              ) : null
            )
          ) : (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          )}

          <div className="mt-4">
            <input
              type="text"
              value={suggestions}
              onChange={(e) => setSuggestions(e.target.value)}
              placeholder="Any Suggestions? We will pass it on"
              className="border p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="bg-white p-4 rounded-md shadow-md mt-4">
            <h1 className="text-xl font-bold mb-2">Bill Details</h1>
            <p className="flex justify-between">
              <span>Item Total:</span>{" "}
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(itemTotal / 100)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>Delivery Fee:</span>{" "}
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(deliveryFee / 100)}
              </span>
            </p>
            <p className="flex justify-between">
              <span>GST & Other Charges:</span>{" "}
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(gstCharges / 100)}
              </span>
            </p>
            <hr className="my-2" />
            <h2 className="text-lg font-bold flex justify-between">
              Total to Pay:
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(totalAmount / 100)}
              </span>
            </h2>
          </div>

          {/* ✅ Checkout Button */}
          <button className="bg-green-700 text-white py-3 px-6 rounded-md hover:bg-green-800 transition-all duration-300 w-full mt-6 shadow-lg transform hover:scale-105">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
