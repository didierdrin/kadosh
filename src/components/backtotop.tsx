"use client";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className="flex h-[50px] w-full items-center justify-center text-black bg-sky-50 text-sm cursor-pointer hover:bg-sky-100 transition-colors duration-300"
      onClick={scrollToTop}
    >
      <div className="flex items-center space-x-2">
        <FaArrowUp className="text-lg" />
        <span>Back To Top</span>
      </div>
    </div>
  );
};

export default BackToTop;