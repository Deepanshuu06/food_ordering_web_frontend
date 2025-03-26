import React, { useState } from "react";

function OffersCard({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data?.info?.couponCode || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div 
        className="min-h-24 min-w-[40%] bg-amber-100 flex items-center rounded-3xl border-slate-400 border cursor-pointer hover:bg-amber-50 transition-colors"
        onClick={() => setShowModal(true)}
      >
        <div className="px-8">image</div>
        <div className="flex flex-col">
          <h3 className="font-bold">{data?.info?.header}</h3>
          <h3 className="font-bold">{data?.info?.primaryDescription}</h3>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-bounceIn">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
            <button 
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            
            <h2 className="text-2xl font-bold mb-4">{data?.info?.header}</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-amber-50 p-3 rounded-lg">
                <span className="font-mono font-bold">
                  {data?.info?.couponCode}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>

              <div className="space-y-2">
                <p className="font-semibold">Offer Details:</p>
                <p>{data?.info?.description}</p>
                {data?.info?.additionalDescription && (
                  <p>{data?.info?.additionalDescription}</p>
                )}
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Valid until: {data?.info?.validity?.endTimestamp || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  {data?.info?.applicability}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OffersCard;