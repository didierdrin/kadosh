
// all products - USED IN homePAGE.tsx
"use client";
import { FaArrowLeft, FaArrowRight, FaShoppingCart } from "react-icons/fa";
import React, { useState } from "react";
import Link from "next/link";
// import product cards
import Productcard from "./productcard";
import { useProducts } from "@/components/useproducts";

const ITEMS_PER_PAGE = 12; // Display 16 items per page

export default function Allproducts() {
  const [selectedCategory, setSelectedCategory] = useState(""); // Filter by category
  const [minPrice, setMinPrice] = useState(0); // Filter by price range
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [searchTerm, setSearchTerm] = useState(""); // General search for name/description

  const { products, loading, error } = useProducts({
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
  });
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return null;
  if (error) return <div>Error: {error.message}</div>;

  // Pagination logic
  const totalPages = Math.ceil((products?.length || 0) / ITEMS_PER_PAGE);
  const currentProducts = products?.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
        <div className="flex flex-wrap justify-spaceBetween gap-6">
          {currentProducts && currentProducts.length > 0 ? (
            currentProducts.map((product, index) => (
              <Link
  key={product.id || `product-${index}`}
  href={`/product?id=${product.id}&data=${encodeURIComponent(
    JSON.stringify({
      ...product,
      qty: 1,
      img: product.img.join(","), // Join the array into a single string
    })
  )}`}
  className="block"
  target="_blank"
  rel="noopener noreferrer"
>
  <Productcard 
  product={product}
    //imgUrl={product.img[0]} // Use the first image as the thumbnail
    //productName={product.name}
    //productPrice={product.price}
    discountPercentage={null}
  />
</Link>

              
            ))
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaArrowLeft className="text-2xl text-blue-500 hover:text-blue-700" />
          </button>
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaArrowRight className="text-2xl text-blue-500 hover:text-blue-700" />
          </button>
        </div>
    </div>
  );
}

