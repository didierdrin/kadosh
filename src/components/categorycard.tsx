// category card
import Image from "next/image";
import React from "react";

export default function Categorycard({ imgUrl, productName }: any) {
  return (
    <div className="flex flex-col items-center hover:border-b border-black">
      <div className="w-40 h-40 bg-white rounded-full shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <Image src={imgUrl} alt={productName} className="object-cover w-full h-full" width={1500} height={1500} />
      </div>
      <a href="/" className="mt-3">
        {productName}
      </a>
    </div>
  );
}
