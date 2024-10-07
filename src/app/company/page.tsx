import React from "react";
import Image from "next/image"; 

export default function Company() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="bg-blue-600 text-white py-4 px-8 flex justify-between items-center">
        <div className="text-4xl font-bold">Kadosh</div>
        <div className="space-x-6 text-lg">
          <a href="#company" className="hover:text-teal-400">
            Company
          </a>
          <a href="#stories" className="hover:text-teal-400">
            Stories
          </a>
          <a href="#impact" className="hover:text-teal-400">
            Impact
          </a>
          <a href="#innovation" className="hover:text-teal-400">
            Innovation
          </a>
          <a href="#investors" className="hover:text-teal-400">
            Investors
          </a>
          <a href="#careers" className="hover:text-teal-400">
            Careers
          </a>
        </div>
      </nav>

      {/* Tab Bar */}
      <nav className="bg-teal-500 text-white py-3 px-8 flex justify-around">
        <a href="#overview" className="hover:text-slate-600">
          Overview
        </a>
        <a href="#history" className="hover:text-slate-600">
          Our History
        </a>
        <a href="#commerce" className="hover:text-slate-600">
          Sustainable Commerce
        </a>
        <a href="#government" className="hover:text-slate-600">
          Government Relation
        </a>
        <a href="#reports" className="hover:text-slate-600">
          Reports & Policies
        </a>
        <a href="#leaders" className="hover:text-slate-600">
          Our Leaders
        </a>
        <a href="#privacy" className="hover:text-slate-600">
          Privacy Center
        </a>
      </nav>

      {/* Main Content */}
      <main className="px-8 py-10">
        {/* Slideshow Section */}
        <div className="h-[800px] bg-gray-200 flex items-center justify-center">
          {/* Replace with your slideshow component */}
          <p className="text-2xl">Slideshow Placeholder (800px height)</p>
        </div>

        {/* Pathways Description */}
        <section className="mt-10 text-center px-6">
          <p className="text-xl leading-relaxed">
            We create pathways to connect millions of sellers and buyers in more than 190
            markets around the world. Our technology empowers our customers, providing
            everyone the opportunity to grow and thrive — no matter who they are or where
            they are in the world. And the ripple effect of our work creates waves of change
            for our customers, our company, our communities, and our planet.
          </p>
        </section>

        {/* Sellers and Buyers Info Cards */}
        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-lg p-6">
            <Image
              src="/path-to-seller-image.jpg"
              alt="Seller Info"
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="mt-4 text-lg text-center">Seller Information</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-6">
            <Image
              src="/path-to-buyer-image.jpg"
              alt="Buyer Info"
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="mt-4 text-lg text-center">Buyer Information</p>
          </div>
        </section>

        {/* Our Purpose in Action */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Our Purpose in Action</h2>
          <div className="bg-gray-800 text-white h-[400px] flex items-center justify-center">
            {/* Placeholder for the video */}
            <p>Video Section (400px height)</p>
          </div>
        </section>

        {/* Global Scale and Reach */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-6">Global Scale and Reach</h2>
          <div className="flex justify-around">
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl">
                190+
              </div>
              <p className="mt-4">Countries Reached</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl">
                1M+
              </div>
              <p className="mt-4">Sellers Empowered</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="h-24 w-24 rounded-full bg-teal-500 flex items-center justify-center text-white text-2xl">
                2M+
              </div>
              <p className="mt-4">Transactions Daily</p>
            </div>
          </div>
        </section>

        {/* Our Leaders Section */}
        <section className="mt-16 flex items-center">
          <div className="w-1/2">
            <Image
              src="/path-to-leader-image.jpg"
              alt="Our Leaders"
              className="w-full h-80 object-cover rounded-md"
            />
          </div>
          <div className="w-1/2 p-8">
            <h2 className="text-2xl font-bold">Our Leaders</h2>
            <p className="mt-4">
              Meet the visionaries who guide Kadosh to be a leader in sustainable commerce and innovation.
            </p>
            <a href="#learn-more" className="mt-6 inline-block text-teal-600 hover:text-blue-600">
              Learn More
            </a>
          </div>
        </section>

        {/* Additional Tab Pages (for Overview, Our History, etc.) */}
        <section className="mt-16">
          {/* Add content for Overview, Our History, etc. below */}
          <h3 className="text-2xl font-bold mb-6">Overview</h3>
          <p className="leading-relaxed">
            This section contains an overview of Kadosh&apos;s vision and mission...
          </p>

          <h3 className="text-2xl font-bold mt-10 mb-6">Our History</h3>
          <p className="leading-relaxed">
            Kadosh has a rich history of innovation and empowering communities around the world...
          </p>
          {/* Add other tab sections as needed */}
        </section>
      </main>
    </div>
  );
}
