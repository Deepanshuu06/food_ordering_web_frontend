import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUserData } from "./utils/slices/authSlice";
import { useNavigate } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../config/FireBaseAuth";



function MyAccount() {
  const { userCredential } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const  handleLogout =  async () => {
    await signOut(auth)
    dispatch(removeUserData())
    navigate("/")
  };

  
const { email, displayName, photoURL, phoneNumber } = userCredential?.user || {};





  

  return (
    <div className="bg-sky-800 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* User Info */}
        <div className="flex items-center space-x-4">
          <img
            src={photoURL}
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <div >
          <h1 className="lg:text-2xl font-semibold text-gray-800">
            {displayName || ""}
          </h1>
          <h1 className="lg:text-lg text-xs font-semibold text-gray-800">
            {email || ""}
          </h1>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-300 cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-700">Orders</h2>
            <p className="text-sm text-gray-500">View your order history</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-300 cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-700">SwigyOne</h2>
            <p className="text-sm text-gray-500">Exclusive SwigyOne benefits</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow hover:bg-gray-200 transition duration-300 cursor-pointer">
            <h2 className="text-lg font-semibold text-gray-700">Favorites</h2>
            <p className="text-sm text-gray-500">Quick access to your favorites</p>
          </div>
        </div>

        {/* Logout Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
