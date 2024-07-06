// Explore - USED IN homePAGE.tsx
import React from "react";
// import category cards
import Categorycard from "./categorycard";

export default function Explorecategories() {
  return (
    <div className="w-full p-4 sm:p-5 mb-6">
      <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">
        Explore Various Categories
      </h3>

      {/* Category list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <Categorycard
          imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166555/quaritsch-photography-m2zuB8DqwyM-unsplash_vbgijs.jpg"
          productName="Latest"
        />
        <Categorycard
          imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166594/vinit-vispute-IpIqJwxdiog-unsplash_gqnf8c.jpg"
          productName="Accessories"
        />
        {/* Add more Categorycard components here as needed */}
      </div>
    </div>
  );
}
