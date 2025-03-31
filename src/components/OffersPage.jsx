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
      image: "https://via.placeholder.com/300x150?text=Food+Offer"
    },
    {
      id: 2,
      title: "Free Delivery",
      code: "FREEDEL",
      description: "On first order with new restaurants",
      category: "delivery",
      validity: "15 Nov 2026",
      image: "https://via.placeholder.com/300x150?text=Delivery+Offer"
    },
    {
      id: 3,
      title: "20% Cashback",
      code: "PAYTM20",
      description: "Using Paytm Wallet payments",
      category: "payment",
      validity: "30 Nov 2026",
      image: "https://via.placeholder.com/300x150?text=Payment+Offer"
    },
    // Add more offers as needed
  ];

  const filteredOffers = activeCategory === 'all' 
    ? offers 
    : offers.filter(offer => offer.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Daily Offers & Deals</h1>
          <p className="text-xl mb-8">Save big on your favorite meals!</p>
          <div className="max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search offers..."
              className="w-full px-6 py-3 rounded-full bg-white bg-opacity-20 border border-white border-opacity-30 placeholder-white focus:outline-none focus:bg-opacity-30"
            />
          </div>
        </div>
      </div>

      {/* Offer Categories */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'all' 
                ? 'bg-orange-600 text-white' 
                : 'bg-white text-gray-600 border hover:border-white-500'
            }`}
          >
            All Offers
          </button>
          <button
            onClick={() => setActiveCategory('food')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'food' 
                ? 'bg-orange-600 text-white' 
                :  'bg-white text-gray-600 border hover:border-white-500'
            }`}
          >
            Food Discounts
          </button>
          <button
            onClick={() => setActiveCategory('delivery')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'delivery' 
                ? 'bg-orange-600 text-white' 
                :  'bg-white text-gray-600 border hover:border-white-500'
            }`}
          >
            Free Delivery
          </button>
          <button
            onClick={() => setActiveCategory('payment')}
            className={`px-6 py-2 rounded-full ${
              activeCategory === 'payment' 
                ? 'bg-orange-600 text-white' 
                :  'bg-white text-gray-600 border hover:border-white-500'
            }`}
          >
            Payment Offers
          </button>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOffers.map(offer => (
            <div key={offer.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <img 
                  src={offer.image} 
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  {offer.category.toUpperCase()}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-sm font-medium">CODE:</span>
                    <span className="ml-2 font-mono bg-gray-100 px-3 py-1 rounded">{offer.code}</span>
                  </div>
                  <span className="text-sm text-gray-500">Valid till {offer.validity}</span>
                </div>

                <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors">
                  Grab Offer
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredOffers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-2xl text-gray-500 mb-4">No offers found in this category</div>
            <button 
              onClick={() => setActiveCategory('all')}
              className="text-orange-600 hover:underline"
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