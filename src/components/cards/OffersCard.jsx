// OffersCard.jsx
import React from "react";
import { OFFER_LOGO_CONST_URL } from "../../../constant";

function OffersCard({ data, onClick }) {
  return (
    <div
      className="relative min-w-[300px] h-22 bg-slate-100 rounded-3xl p-6 cursor-pointer 
                 transition-all duration-300 hover:scale-105 hover:shadow-xl flex gap-4"
      onClick={onClick}
    >
      <div className="w-1/3 flex items-center justify-center">
        <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center">
          <img
            src={OFFER_LOGO_CONST_URL + data?.info?.offerLogo}
            alt={data?.info?.header}
          />
        </div>
      </div>

      <div className="w-2/3 flex flex-col justify-center">
        <h3 className="font-bold text-gray-800 mb-2">{data?.info?.header}</h3>
        <p className="text-sm text-gray-600">
          {data?.info?.primaryDescription}
        </p>
      </div>
    </div>
  );
}

export default OffersCard;
