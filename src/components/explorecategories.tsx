// Explorecategories.tsx
import React, { useRef } from "react";
import Categorycard from "./categorycard";
import { FaArrowRight } from "react-icons/fa"; // Add an arrow icon

export default function Explorecategories() {

 // Explicitly typing the ref as HTMLDivElement
 const scrollRef = useRef<HTMLDivElement>(null);
  // Function to scroll the category list
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full p-4 sm:p-5 mb-6 relative">
      <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">
        Explore Various Categories
      </h3>

      {/* Category list */}

      <div
        className="flex overflow-x-scroll scroll-smooth gap-4 sm:gap-6 scrollbar-hide"
        ref={scrollRef}
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} // For Firefox and IE/Edge
      >
        <Categorycard
          imgUrl="/latest.jpeg"
          productName="Latest"
        />
        <Categorycard
          imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166594/vinit-vispute-IpIqJwxdiog-unsplash_gqnf8c.jpg"
          productName="Accessories"
        />
        <Categorycard
          imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166555/quaritsch-photography-m2zuB8DqwyM-unsplash_vbgijs.jpg"
          productName="Desktops"
        />
        <Categorycard
          imgUrl="/laptops.jpg"
          productName="Laptops"
        />
        <Categorycard
          imgUrl="/phonet.jpeg"
          productName="Phone & Tablets"
        />
    
        {/* Add more Categorycard components here as needed */}
      </div>

      {/* Scroll arrow */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-700 focus:outline-none"
        onClick={scrollRight}
        aria-label="Scroll right"
      >
        <FaArrowRight size={20} />
      </button>
    </div>
  );
}



// // Explore - USED IN homePAGE.tsx
// import React from "react";
// // import category cards
// import Categorycard from "./categorycard";

// export default function Explorecategories() {
//   return (
//     <div className="w-full p-4 sm:p-5 mb-6">
//       <h3 className="font-semibold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">
//         Explore Various Categories
//       </h3>

//       {/* Category list */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
//         <Categorycard
//           imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166555/quaritsch-photography-m2zuB8DqwyM-unsplash_vbgijs.jpg"
//           productName="Latest"
//         />
//         <Categorycard
//           imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166594/vinit-vispute-IpIqJwxdiog-unsplash_gqnf8c.jpg"
//           productName="Accessories"
//         />
//         <Categorycard
//           imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166594/vinit-vispute-IpIqJwxdiog-unsplash_gqnf8c.jpg"
//           productName="Desktops"
//         />
//         <Categorycard
//           imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166594/vinit-vispute-IpIqJwxdiog-unsplash_gqnf8c.jpg"
//           productName="Laptops"
//         />
//         <Categorycard
//           imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166594/vinit-vispute-IpIqJwxdiog-unsplash_gqnf8c.jpg"
//           productName="Phone & Tablets"
//         />
//         {/* Add more Categorycard components here as needed */}
//       </div>
//     </div>
//   );
// }
