"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icons
import { useProducts } from "@/components/useproducts"; // Assuming you have a custom hook for Firestore products
import Image from "next/image";

const ITEMS_PER_PAGE = 12;

const SeeallContent = () => {
  const searchParams = useSearchParams(); // Get search params
  const initialCategory = searchParams.get("category") || "All"; // Get the selected category from the query or default to "All"
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [selectedBrand, setSelectedBrand] = useState(""); // Filter by brand
  const [selectedRating, setSelectedRating] = useState(""); // Filter by ratings
  const [inStockOnly, setInStockOnly] = useState(false); // Filter by availability
  const [discountOnly, setDiscountOnly] = useState(false); // Filter by discounts
  const [sortOption, setSortOption] = useState(""); // Sorting options
  
  const { products, loading, error } = useProducts({
    selectedCategory,
    minPrice,
    maxPrice,
    selectedBrand,
    selectedRating,
    inStockOnly,
    discountOnly,
    sortOption,
  });

  const brands = ["All", "Apple", "Dell", "HP", "Samsung", "Sony"];
  const ratings = ["1+", "2+", "3+", "4+", "5"];

  const applyFilters = () => {
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  useEffect(() => {
    if (loading) {
      document.title = "Loading Shamayim...";
    } else {
      document.title = "Shamayim";
    }
  }, [loading]);

  if (loading) return <div className="h-[300px] flex justify-center items-center">Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

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
    <div className="flex flex-col sm:flex-row bg-white min-h-screen">
      {/* Sidebar - with filters */}
      <div className="w-full sm:w-1/4 bg-slate-50 p-4 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Price Range</h3>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min" 
              value={minPrice === 0 ? '' : minPrice}
              //value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="border rounded p-1 w-full"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice === 0 ? '' : maxPrice}
              //value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="border rounded p-1 w-full"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Categories</h3>
          <ul className="space-y-2">
            {["All", "Laptops", "Desktops", "Electronics", "Accessories"].map((category, index) => (
              <li key={index}>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    className="form-radio"
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                  />
                  <span className="ml-2">{category}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Model</h3>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Model</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Customer Rating</h3>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Rating</option>
            {ratings.map((rating, index) => (
              <option key={index} value={rating}>
                {rating} Stars
              </option>
            ))}
          </select>
        </div>

        {/* Availability Filter */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={() => setInStockOnly(!inStockOnly)}
              className="form-checkbox"
            />
            <span className="ml-2">In Stock Only</span>
          </label>
        </div>

        {/* Discount Filter */}
        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={discountOnly}
              onChange={() => setDiscountOnly(!discountOnly)}
              className="form-checkbox"
            />
            <span className="ml-2">Discount Only</span>
          </label>
        </div>

        {/* Sort Option */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Sort By</h3>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="">Sort by</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
            <option value="newest">Newest</option>
            <option value="bestsellers">Bestsellers</option>
          </select>
        </div>

        {/* Apply Filters Button */}
        <button
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          onClick={applyFilters}
        >
          Apply Filters
        </button>
      </div>

      {/* Product list */}
      <div className="w-full sm:w-3/4 p-4">
        <h1 className="text-2xl font-bold mb-6">
          {searchParams.get("term") ? `Search Results for "${searchParams.get("term")}"` : "All Products"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product?id=${product.id}&data=${encodeURIComponent(
                JSON.stringify({
                  ...product,
                  img: product.img.join(","), // Join the array into a single string
                })
              )}`}
              className="block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="border rounded-lg p-4 mb-4 overflow-hidden flex items-start h-[280px] hover:-translate-y-1 cursor-pointer">
                <Image
                  src={product.img[0]}
                  alt={product.name}
                  width="1500"
                  height="1500"
                  className="w-24 h-24 object-cover mr-4"
                />
                <div className="flex flex-col justify-start space-y-3 h-full">
                  <h3 className="text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                    {product.name}
                  </h3>
                  <p className="text-sm text-blue-600 overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
                    RWF {product.price.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.details.length > 80
                      ? `${product.details.substring(0, 80)}...`
                      : product.details}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {products.length === 0 && (
          <p className="text-center text-gray-500 mt-8">No products found.</p>
        )}

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
    </div>
  );
};

export default SeeallContent;

