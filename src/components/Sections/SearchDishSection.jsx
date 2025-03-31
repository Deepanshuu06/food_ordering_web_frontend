import React from "react";

function SearchDishSection({ data }) {
    
  const acctualDishData = data.filter((item) => item?.card?.card?.info) || [];

  return (
    <div className="w-full bg-slate-100">
      <div className="py-4 px-3">
        <h1>Filter Section</h1>
      </div>
      <div className="w-full grid grid-cols-2 gap-2 p-3">
        {acctualDishData.map(({ card: { card } }) => (
          <div className="bg-white px-9 py-5 flex items-center justify-between rounded-2xl">
            <div className="flex flex-col gap-2">
                <h1 className="" >{(card?.info?.isVeg) ? "Veg" : "Non Veg"}</h1>
                <h1 className="font-bold" >{card?.info?.name}</h1>
                <h2> ₹ {(card?.info?.price)/100}</h2>
                <button className="px-3  text-xs py-1 border-2 rounded-2xl cursor-pointer">More details</button>
            </div>
            <div>
                <button className="px-7 py-3 border-2 rounded-2xl text-green-600 cursor-pointer">ADD</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchDishSection;
