import React from 'react';

function CorporatePage() {

  const news = [
    {
      title:"Swiggy Announces New Features",
      image:"https://www.hindustantimes.com/ht-img/img/2024/12/20/1600x900/SWIGGY-RESULTS--0_1734677286153_1734677637821.JPG",
      media:"newspaper",
      publishedDate:"12/01/2013"
    },
    {
      title:"Swiggy Announces New Features",
      image:"https://tradebrains.in/wp-content/uploads/2025/02/Swiggy1-1080x675.jpg",
      media:"newspaper",
      publishedDate:"12/01/2013"
    },
    {
      title:"Swiggy Announces New Features",
      image:"https://www.prabhatkhabar.com/wp-content/uploads/2024/01/swiggy-new-1.jpg",
      media:"newspaper",
      publishedDate:"12/01/2013"
    },
    {
      title:"Swiggy Announces New Features",
      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdIVkiL2eClmxaxnrGSN0Uc2oZUhCf7Xh5ug&s",
      media:"newspaper",
      publishedDate:"12/01/2013"
    },
  ]


  return (
    <div className="font-sans w-[98%] lg:w-[80%] mx-auto text-gray-800">
      {/* Hero Section */}
      <section className="relative h-96 bg-white text-black">
        <div className="flex items-center justify-center h-full px-4">
          <div className="max-w-2xl text-center">
            <h1 className="text-4xl font-bold mb-4">Driving Innovation in Food Tech</h1>
            <p className="text-lg mb-6">Connecting millions of customers to thousands of restaurants across India</p>
            <button className="px-8 py-3 border border-gray-300 rounded-full font-semibold bg-white hover:bg-gray-100 transition">
              Explore Opportunities
            </button>
          </div>
        </div>
      </section>

      {/* Key Offerings Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Offerings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Instant Delivery", description: "Pioneering hyperlocal food delivery with industry-leading technology" },
              { title: "Partner Growth", description: "Empowering restaurant partners with technology and insights" },
              { title: "Innovation First", description: "Continuous innovation in logistics and customer experience" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-gray-300">
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investor Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Trusted by Global Investors</h2>
              <p className="text-gray-600 mb-6">
                Backed by world-renowned investors who believe in our vision to transform food tech
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• $1.5B+ total funding</li>
                <li>• 20+ Global Investors</li>
              </ul>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://inc42.com/cdn-cgi/image/quality=75/https://asset.inc42.com/2024/09/swiggy-FY24-featured-760x570.png" 
                alt="Investors" 
                className="rounded-lg border border-gray-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Press Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">In the News</h2>
          <div className="flex overflow-x-auto gap-8">
            {news.map((item) => (
              <div key={item} className="min-w-[300px] bg-white p-6 rounded-xl border border-gray-300">
                <div className="h-40 bg-gray-200 rounded-lg mb-4">
                  <img  className='w-full object-cover rounded-xl ' src={item.image} alt="" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.media} • {item.publishedDate}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Careers CTA */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Journey</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto text-gray-600">
          Be part of a team that's redefining food tech in India and beyond
        </p>
        <button className="px-8 py-3 border border-gray-300 rounded-full font-semibold bg-white hover:bg-gray-100 transition">
          View Open Positions
        </button>
      </section>
    </div>
  );
}

export default CorporatePage;
