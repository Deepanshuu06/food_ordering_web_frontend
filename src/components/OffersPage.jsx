import React, { useState } from 'react';

function OffersPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  // Sample offers data
  const offers = [
    {
      id: 1,
      title: "50% Off Up to ₹100",
      code: "HUNGRY50",
      description: "On orders above ₹199",
      category: "food",
      validity: "31 Dec 2026",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQk4H4lgYB50LTkhJfOkL_G26zMWtZZEHkgQ&s"
    },
    {
      id: 2,
      title: "Free Delivery",
      code: "FREEDEL",
      description: "On first order with new restaurants",
      category: "delivery",
      validity: "15 Nov 2026",
      image:"https://cdn.grabon.in/gograbon/images/merchant/1610000375685.png"
    },
    {
      id: 3,
      title: "20% Cashback",
      code: "PAYTM20",
      description: "Using Paytm Wallet payments",
      category: "payment",
      validity: "30 Nov 2026",
      image:"https://couponswala.com/blog/wp-content/uploads/2020/03/Swiggy_todaysoffer-min.png.webp"
    },
  ];

  const filteredOffers = activeCategory === 'all'
    ? offers
    : offers.filter(offer => offer.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-gray-800 w-[98%] lg:w-[80%] mx-auto">
      <div className="text-center py-16">
        <h1 className="text-4xl font-bold mb-4">Daily Offers & Deals</h1>
        <p className="text-lg text-gray-600 mb-6">Save big on your favorite meals!</p>
        <input
          type="text"
          placeholder="Search offers..."
          className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
      </div>

      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {['all', 'food', 'delivery', 'payment'].map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full border ${
              activeCategory === category
                ? 'border-gray-800 text-gray-800 bg-gray-100'
                : 'border-gray-300 text-gray-600 hover:bg-gray-100'
            }`}
          >
            {category === 'all' ? 'All Offers' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {filteredOffers.map(offer => (
          <div key={offer.id} className="bg-white rounded-lg border border-gray-300 overflow-hidden">
            <img
              src={`${offer?.image}`}
              alt={offer.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
              <p className="text-gray-600 mb-4">{offer.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-sm font-medium">CODE:</span>
                  <span className="ml-2 bg-gray-100 px-2 py-1 rounded text-sm">{offer.code}</span>
                </div>
                <span className="text-sm text-gray-500">Valid till {offer.validity}</span>
              </div>
              <button className="w-full bg-gray-800 text-white py-2 rounded-md hover:bg-gray-700 transition-colors">
                Grab Offer
              </button>
            </div>
          </div>
        ))}

        {filteredOffers.length === 0 && (
          <div className="text-center py-12 col-span-full text-gray-500">
            <div className="text-2xl mb-4">No offers found in this category</div>
            <button
              onClick={() => setActiveCategory('all')}
              className="text-gray-800 hover:underline"
            >
              View all offers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OffersPage;
