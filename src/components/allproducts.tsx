// all products - USED IN homePAGE.tsx
"use client";
import { FaShoppingCart } from "react-icons/fa";
import React from "react";
import Link from "next/link";
// import product cards
import Productcard from "./productcard";
import { useProducts } from "@/components/useproducts";

export default function Allproducts() {
  const { products, loading, error } = useProducts();

  if (loading) return null;
//   if (loading) return (<div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
//   <div className="animate-pulse">
//     <FaShoppingCart className="text-sky-600 animate-cart-scale" size={64} />
//   </div>
//   <p className="mt-4 text-lg font-semibold text-gray-700">Loading Kadosh...</p>
// </div>);
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex flex-col p-5 w-full border-b border-slate-100">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <h3 className="font-semibold text-lg">All products</h3>
          <a href="/" className="text-xs">
            Recommended for you
          </a>
        </div>
        <a
          href="/seeall"
          className="text-xs underline underline-offset-2 hover:text-blue-900"
        >
          See all
        </a>
      </div>
      {/* Products list */}
      <div className="flex flex-col sm:flex-row mt-3 space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex flex-wrap justify-center gap-4">
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <Link
                key={product.id || `product-${index}`}
                // href={`/product?id=${product.id}&data=${encodeURIComponent(
                //   JSON.stringify(product)
                // )}`}
                href={`/product?id=${product.id}&data=${encodeURIComponent(
                  JSON.stringify({
                    ...product,
                    img: encodeURIComponent(product.img)
                  })
                )}`}
                className="block"
              >
                <Productcard
                  imgUrl={product.img}
                  productName={product.name}
                  productPrice={product.price}
                  discountPercentage={null}
                />
              </Link>
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    </div>
  );
}
