import React from "react";

function UnServiceableLocation({ data }) {
  console.log(data);

  return (
    <div className="w-full h-full justify-center flex flex-col items-center mt-20 gap-8">
      <img
        className="w-[25%]"
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
        alt="unserviceable"
      />
      <div className="justify-center flex flex-col items-center">
        <h1 className="text-xl font-bold ">{data.title}</h1>
        <p className="pt-5 w-[70%]  text-center">
          We don’t have any services here till now. Try changing location.
        </p>
      </div>
    </div>
  );
}

export default UnServiceableLocation;
