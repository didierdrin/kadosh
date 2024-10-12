"use client";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

export default function Categorycard({ imgUrl, productName }: any) {
  const router = useRouter();

  const handleCategorySelect = () => {
    // Navigate to /seeall with the category filter
    router.push(`/seeall?category=${productName}`);
    // Force reload to apply filters properly
    window.location.href = `/seeall?category=${productName}`;
  };

  return (
    <div className="flex flex-col items-center hover:border-b border-black cursor-pointer" onClick={handleCategorySelect}>
      <div className="w-40 h-40 bg-white rounded-full shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <Image src={imgUrl} alt={productName} className="object-cover w-full h-full" width="1500" height="1500" />
      </div>
      <span className="mt-3">
        {productName}
      </span>
    </div>
  );
}


// // category card
// import Image from "next/image";
// import React from "react";

// export default function Categorycard({ imgUrl, productName }: any) {
//   return (
//     <div className="flex flex-col items-center hover:border-b border-black">
//       <div className="w-40 h-40 bg-white rounded-full shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
//         <Image src={imgUrl} alt={productName} className="object-cover w-full h-full" width="1500" height="1500" />
//       </div>
//       <a href="/" className="mt-3">
//         {productName}
//       </a>
//     </div>
//   );
// }
