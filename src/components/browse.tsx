// browse - Used in home page.tsx
"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Browse() {
  const router = useRouter();

  const handleBuyNowBtn = () => {
    router.push("/seeall");
  };

  return (
    <div className="flex flex-col sm:flex-row w-full justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 md:space-x-6 lg:space-x-10 bg-orange-200 p-4 sm:p-6 lg:p-8">
      {/* Image */}
      <div className="w-full sm:w-1/2 lg:w-[45%] xl:w-[40%]">
        <Image
          src="https://res.cloudinary.com/dezvucnpl/image/upload/v1720171564/Kadosh_edit_kujjio.png"
          className="w-full h-auto object-cover rounded-lg shadow-md"
          alt="Digital products"
        />
      </div>

      {/* Text and Button */}
      <div className="flex flex-col space-y-4 items-start sm:w-1/2 lg:w-[45%] xl:w-[40%]">
        <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl">
          Get your digital products
        </h3>
        <a href="/" className="text-sm sm:text-base lg:text-lg hover:underline">
          Save, Sell, Smile.
          <br />
          Best delivery service in town
        </a>
        <button
          onClick={handleBuyNowBtn}
          className="rounded px-4 py-2 mt-2 border border-black text-black hover:text-white hover:bg-black transition duration-300 text-sm sm:text-base"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
