// Slideshow navbar
"use client";
import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function SlideshowNavbar() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  const headlines = [
    <>Everything you need<br />with just a click</>,
    <>Discover amazing deals<br />every day</>,
    <>Shop smart,<br />save big on gadgets</>
  ];
  
  const subheadlines = [
    <>Get your computer<br />accessories in a bit</>,
    <>Upgrade your setup<br />with ease</>,
    <>Find the perfect gear<br />for your needs</>
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % headlines.length);
    }, 8000); // Change slide every 8 seconds
  
    return () => clearInterval(timer);
  }, [headlines.length]);

  const HandleShopNowBtn = () => {
    if (router) {
      router.push("/seeall");
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-auto w-full p-6 mt-5 justify-around items-center bg-green-100 space-y-6 md:space-y-0 md:space-x-6">
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="font-semibold text-xl h-16 overflow-hidden">
          {headlines.map((headline, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform -translate-y-8"
              }`}
              style={{
                position: index === currentSlide ? "relative" : "absolute",
              }}
            >
              {headline}
            </div>
          ))}
        </h2>
        <div className="my-2 h-12 overflow-hidden">
          {subheadlines.map((subheadline, index) => (
            <div
              key={index}
              className={`transition-all duration-500 ${
                index === currentSlide
                  ? "opacity-100 transform translate-y-0"
                  : "opacity-0 transform translate-y-8"
              }`}
              style={{
                position: index === currentSlide ? "relative" : "absolute",
              }}
            >
              {subheadline}
            </div>
          ))}
        </div>
        <button
          onClick={HandleShopNowBtn}
          className="rounded border border-black p-2 my-3 bg-white text-black hover:bg-black hover:text-white transition-colors duration-300"
        >
          Shop now
        </button>
      </div>

      <div className="flex flex-col items-center">
        <img
          src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          alt="Computer accessories"
          width="1500"
          height="1500"
          className="w-64 h-auto rounded-lg shadow-md"
        />

        <div className="relative my-3">
          <a
            href="/"
            className="mt-4 mx-4 text-blue-500 hover:text-blue-800 transition-colors duration-200"
          >
            Desktops & Laptops
          </a>
          <svg
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 text-blue-500 hover:mx-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <img
          src="https://res.cloudinary.com/dezvucnpl/image/upload/v1720125977/c-d-x-PDX_a_82obo-unsplash_rqphy7.jpg"
          alt="Electronic accessories"
          width="1500"
          height="1500"
          className="w-64 h-auto rounded-lg shadow-md"
        />

        <div className="relative my-3">
          <a
            href="/"
            className="mt-4 mx-4 text-blue-500 hover:text-blue-800 transition-colors duration-200"
          >
            Electronic accessories
          </a>
          <svg
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 text-blue-500 hover:mx-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
