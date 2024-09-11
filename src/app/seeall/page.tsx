// see all - navigation route
"use client";
import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
// Firebase Firestore Data hook
import { useProducts } from "@/components/useproducts";
import { FaShoppingCart } from "react-icons/fa";

import { useSearchParams } from "next/navigation";

// ListTile component for individual products
const ListTile = ({ product }: any) => {
  // Function to format the price with commas
  function commafy(num: any) {
    var str = num.toString().split(".");
    if (str[0].length >= 5) {
      str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, "$1,");
    }
    if (str[1] && str[1].length >= 5) {
      str[1] = str[1].replace(/(\d{3})/g, "$1 ");
    }
    return str.join(".");
  }

  return (
    <div className="border rounded-lg p-4 mb-4 overflow-hidden flex items-start h-[220px] hover:-translate-y-1 cursor-pointer">
      <img
        src={product.img}
        alt={product.name}
        width="1500"
        height="1500"
        className="w-24 h-24 object-cover mr-4"
      />
      <div className="flex flex-col justify-between h-full">
        <h3 className="text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
          {product.name}
        </h3>
        <p className="text-sm text-indigo-600 mb-3 mt-1 overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
          RWF {commafy(product.price.toFixed(2))}
        </p>
        <p className="text-sm text-gray-500">
          {product.details.length > 80
            ? `${product.details.substring(0, 80)}...`
            : product.details}
        </p>
        
      </div>
    </div>
  );
};



// Main Seeall component
function SeeallContent() {
  const [showFilters, setShowFilters] = useState(false);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const searchTerm = search || "";
  const { products, loading, error } = useProducts(searchTerm);

  useEffect(() => {
    // This effect will run when the search term changes
    if (loading) {
      document.title = "Loading Kadosh..."; // Update title when loading
    } else {
      document.title = "Kadosh"; // Restore the title once loaded
    }
  }, [searchTerm, loading]);

  if (loading) return null;
  // if (loading)
  //   return (
  //     <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
  //       <div className="animate-pulse">
  //         <FaShoppingCart
  //           className="text-sky-600 animate-cart-scale"
  //           size={64}
  //         />
  //       </div>
  //       <p className="mt-4 text-lg font-semibold text-gray-700">
  //         Loading Kadosh...
  //       </p>
  //     </div>
  //   );
  if (error) return <div>Error: {error.message}</div>;

  // Sample categories for sidebar
  const categories = [
    "All",
    "Laptops",
    "Desktops",
    "Electronics",
    "Accessories",
  ];

  return (
    <div className="flex flex-col sm:flex-row bg-white min-h-screen">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 bg-slate-50 p-4 shadow-md">
        <button
          className="sm:hidden w-full bg-blue-600 text-white py-2 px-4 rounded mb-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
          <h2 className="text-xl font-semibold mb-4">Filters</h2>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category, index) => (
                <li key={index}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox text-blue-600"
                    />
                    <span className="ml-2">{category}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Price Range</h3>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                placeholder="Min"
                className="w-1/2 px-2 py-1 border rounded"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                className="w-1/2 px-2 py-1 border rounded"
              />
            </div>
          </div>

          {/* Store */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Store</h3>
            <select className="w-full px-2 py-1 border rounded">
              <option value="">All Stores</option>
              <option value="Store1">Kadosh</option>
              <option value="Store2">QuickTech</option>
              <option value="Store3">MegaPCs</option>
            </select>
          </div>

          {/* Apply Filters Button */}
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
            Apply Filters
          </button>
        </div>
      </div>

      {/* Product list */}
      <div className="w-full sm:w-full p-4">
        <h1 className="text-2xl font-bold mb-6">
          {searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link
              key={product.id}
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
              target="_blank"
  rel="noopener noreferrer"
            >
              <ListTile product={product} />
            </Link>
          ))}
        </div>
        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No products found.</p>
        )}
      </div>
    </div>
  );
}

// Main Seeall component
export default function Seeall() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SeeallContent />
    </Suspense>
  );
}
