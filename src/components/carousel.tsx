// components/Carousel.tsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Define the images for the carousel
const carouselImages = [
  {
    src: "/electronics1.png", // Replace with your image URLs
    alt: "Laptops, Desktops, and Accessories",
    text: "Discover the Latest Laptops,\nDesktops, and Accessories",
  },
  {
    src: "/electronics2.png", // Replace with your image URLs
    alt: "Smartphones and Accessories",
    text: "Shop the Best Smartphones\nand Gadgets Today",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically move to the next image every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 4000); // 3000ms = 3 seconds
    return () => clearInterval(interval); // Clean up on component unmount
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? carouselImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === carouselImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* Image with dark overlay */}
      <div className="relative w-full h-full">
        <Image
          src={carouselImages[currentIndex].src}
          alt={carouselImages[currentIndex].alt}
          layout="fill"
          objectFit="cover"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <h2 className="text-white text-3xl md:text-4xl font-bold text-center px-4 whitespace-pre-line">
          {carouselImages[currentIndex].text}
        </h2>
      </div>

      {/* Left Arrow */}
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
        onClick={goToPrevious}
      >
        <FaArrowLeft />
      </button>

      {/* Right Arrow */}
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
        onClick={goToNext}
      >
        <FaArrowRight />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;

// // components/Carousel.tsx
// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// // Define the images for the carousel
// const carouselImages = [
//   {
//     src: "/electronics1.png", // Replace with your image URLs
//     alt: "Electronic devices display",
//   },
//   {
//     src: "/electronics2.png", // Replace with your image URLs
//     alt: "Smartphones and accessories",
//   },
// ];

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToPrevious = () => {
//     const isFirstSlide = currentIndex === 0;
//     const newIndex = isFirstSlide ? carouselImages.length - 1 : currentIndex - 1;
//     setCurrentIndex(newIndex);
//   };

//   const goToNext = () => {
//     const isLastSlide = currentIndex === carouselImages.length - 1;
//     const newIndex = isLastSlide ? 0 : currentIndex + 1;
//     setCurrentIndex(newIndex);
//   };

//   return (
//     <div className="relative w-full h-[400px] overflow-hidden">
//       {/* Image Display */}
//       <Image
//         src={carouselImages[currentIndex].src}
//         alt={carouselImages[currentIndex].alt}
//         layout="fill"
//         objectFit="cover"
//         className="w-full h-full"
//       />
//       {/* Left Arrow */}
//       <button
//         className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
//         onClick={goToPrevious}
//       >
//         <FaArrowLeft />
//       </button>
//       {/* Right Arrow */}
//       <button
//         className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black"
//         onClick={goToNext}
//       >
//         <FaArrowRight />
//       </button>
//     </div>
//   );
// };

// export default Carousel;
