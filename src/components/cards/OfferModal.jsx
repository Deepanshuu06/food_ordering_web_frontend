// OffersModal.jsx
import React, { useState } from "react";
import { OFFER_LOGO_CONST_URL } from "../../../constant";

function OffersModal({ data, onClose }) {
  const [copied, setCopied] = useState(false);
  const couponCode = data?.info?.couponCode?.match(/USE (\w+)/) || [];

  const handleCopy = () => {
    navigator.clipboard.writeText(couponCode[1] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl max-w-2xl w-full p-8 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="w-full md:w-1/3 flex items-center justify-center">
            <div className="w-32 h-32 bg-white rounded-xl flex items-center justify-center">
              <img src={OFFER_LOGO_CONST_URL + data?.info?.offerLogo} alt="" />
            </div>
          </div>

          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {data?.info?.header}
            </h2>
            <p className="text-gray-600 mb-4">
              {data?.info?.primaryDescription}
            </p>

            {data?.info?.couponCode && (
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono bg-gray-100 px-3 py-1 rounded">
                  {couponCode[1]}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-blue-600 hover:text-blue-700 transition-colors cursor-pointer"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            )}

            <div>
            <h2 className="font-bold " >Terms and Conditions --</h2>
            <ul>
              <li >Offer valid on select restaurants</li>
              <li>Other T&C's may apply</li>
            </ul>
            </div>
          </div>
        </div>

        <div className="space-y-3 text-sm text-gray-600">
          <p>{data?.info?.applicability}</p>
          <p>Valid until: {data?.info?.validity?.endTimestamp || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default OffersModal;
