
// all products - USED IN homePAGE.tsx
"use client";
import { FaShoppingCart } from "react-icons/fa";
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
                    img: encodeURIComponent(product.img)
                  })
                )}`}
                className="block"
                target="_blank"
                rel="noopener noreferrer"
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-5">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 cursor-pointer rounded text-sm font-semibold text-white bg-red-500 hover:bg-red-700 "
        >
          Previous
        </button>
        <span className="text-sm font-medium px-4 py-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 cursor-pointer rounded text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700  "
        >
          Next
        </button>
      </div>
    </div>
  );
}


// // all products - USED IN homePAGE.tsx
// "use client";
// import { FaShoppingCart } from "react-icons/fa";
// import React from "react";
// import Link from "next/link";
// // import product cards
// import Productcard from "./productcard";
// import { useProducts } from "@/components/useproducts";

// export default function Allproducts() {
//   const { products, loading, error } = useProducts();

//   if (loading) return null;
// //   if (loading) return (<div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
// //   <div className="animate-pulse">
// //     <FaShoppingCart className="text-sky-600 animate-cart-scale" size={64} />
// //   </div>
// //   <p className="mt-4 text-lg font-semibold text-gray-700">Loading Kadosh...</p>
// // </div>);
//   if (error) return <div>Error: {error.message}</div>;

//   return (
//     <div className="flex flex-col p-5 w-full border-b border-slate-100">
//       <div className="flex flex-row justify-between">
//         <div className="flex flex-col">
//           <h3 className="font-semibold text-lg">All products</h3>
//           <a href="/" className="text-xs">
//             Recommended for you
//           </a>
//         </div>
//         <a
//           href="/seeall"
//           className="text-xs underline underline-offset-2 hover:text-blue-900"
//         >
//           See all
//         </a>
//       </div>
//       {/* Products list */}
//       <div className="flex flex-col sm:flex-row mt-3 space-y-4 sm:space-y-0 sm:space-x-4">
//         <div className="flex flex-wrap justify-spaceBetween gap-6">
//           {products && products.length > 0 ? (
//             products.map((product, index) => (
//               <Link
//                 key={product.id || `product-${index}`}
//                 // href={`/product?id=${product.id}&data=${encodeURIComponent(
//                 //   JSON.stringify(product)
//                 // )}`}
//                 href={`/product?id=${product.id}&data=${encodeURIComponent(
//                   JSON.stringify({
//                     ...product,
//                     img: encodeURIComponent(product.img)
//                   })
//                 )}`}
//                 className="block"
//                 target="_blank"
//   rel="noopener noreferrer"
  
//               >
//                 <Productcard
//                   imgUrl={product.img}
//                   productName={product.name}
//                   productPrice={product.price}
//                   discountPercentage={null}
//                 />
//               </Link>
//             ))
//           ) : (
//             <div>No products available</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
