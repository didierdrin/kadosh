"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icons
import { useProducts } from "@/components/useproducts"; // Assuming you have a custom hook for Firestore products


const ITEMS_PER_PAGE = 12;

// ListTile component for individual products
const ListTile = ({ product }: any) => {
  const commafy = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="border rounded-lg p-4 mb-4 overflow-hidden flex items-start h-[230px] hover:-translate-y-1 cursor-pointer">
      <Image
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
        <p className="text-sm text-blue-600 mb-2 mt-1 overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
          RWF {commafy(product.price)}
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

function SeeallContent() {
  const searchParams = useSearchParams(); // Get search params
  const initialCategory = searchParams.get("category") || "All"; // Get the selected category from the query or default to "All"
  const [selectedCategory, setSelectedCategory] = useState(initialCategory); 
  // const selectedCategory = searchParams.get("category") || ""; // Get the selected category from the query
  // const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0); 
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [searchTerm, setSearchTerm] = useState(""); 

  const { products, loading, error } = useProducts({
    searchTerm,
    selectedCategory,
    minPrice,
    maxPrice,
  });

  const categories = ["All", "Laptops", "Desktops", "Electronics", "Accessories"];

  useEffect(() => {
    if (loading) {
      document.title = "Loading Kadosh...";
    } else {
      document.title = "Kadosh";
    }
  }, [loading]);

  if (loading) return <div>Loading...</div>;
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

  const applyFilters = () => {
    setCurrentPage(1); // Reset to page 1 on filter change
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white min-h-screen">
      {/* Sidebar - with filters */}
      <div className="w-full sm:w-1/4 bg-slate-50 p-4 shadow-md">
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
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                  />
                  <span className="ml-2">{category}</span>
                </label>
              </li>
            ))}
          </ul>
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
      <div className="w-full sm:w-full p-4">
        <h1 className="text-2xl font-bold mb-6">
          {searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
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
              <ListTile product={product} />
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
}

export default SeeallContent;



// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Import icons
// import { useProducts } from "@/components/useproducts"; // Assuming you have a custom hook for Firestore products

// const ITEMS_PER_PAGE = 12; // Display 16 items per page

// // ListTile component for individual products
// const ListTile = ({ product }: any) => {
//   const commafy = (num: number) => {
//     return num.toLocaleString();
//   };

//   return (
//     <div className="border rounded-lg p-4 mb-4 overflow-hidden flex items-start h-[230px] hover:-translate-y-1 cursor-pointer">
//       <Image
//         src={product.img}
//         alt={product.name}
//         width="1500"
//         height="1500"
//         className="w-24 h-24 object-cover mr-4"
//       />
//       <div className="flex flex-col justify-between h-full">
//         <h3 className="text-lg font-semibold overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
//           {product.name}
//         </h3>
//         <p className="text-sm text-blue-600 mb-2 mt-1 overflow-hidden whitespace-nowrap text-ellipsis max-w-full">
//           RWF {commafy(product.price)}
//         </p>
//         <p className="text-sm text-gray-500">
//           {product.details.length > 80
//             ? `${product.details.substring(0, 80)}...`
//             : product.details}
//         </p>
//       </div>
//     </div>
//   );
// };

// // Main SeeallContent component with filters and pagination
// function SeeallContent() {
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedCategory, setSelectedCategory] = useState(""); // Filter by category
//   const [minPrice, setMinPrice] = useState(0); // Filter by price range
//   const [maxPrice, setMaxPrice] = useState(Infinity);
//   const [searchTerm, setSearchTerm] = useState(""); // General search for name/description

//   const { products, loading, error } = useProducts({
//     searchTerm,
//     selectedCategory,
//     minPrice,
//     maxPrice,
//   });

//   const categories = ["All", "Laptops", "Desktops", "Electronics", "Accessories"];

//   useEffect(() => {
//     if (loading) {
//       document.title = "Loading Kadosh...";
//     } else {
//       document.title = "Kadosh";
//     }
//   }, [loading]);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error.message}</div>;

//   // Pagination logic
//   const totalPages = Math.ceil((products?.length || 0) / ITEMS_PER_PAGE);
//   const currentProducts = products?.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const applyFilters = () => {
//     setCurrentPage(1); // Reset to page 1 on filter change
//   };

//   return (
//     <div className="flex flex-col sm:flex-row bg-white min-h-screen">
//       {/* Sidebar - with filters */}
//       <div className="w-full sm:w-1/4 bg-slate-50 p-4 shadow-md">
//         <button
//           className="sm:hidden w-full bg-blue-600 text-white py-2 px-4 rounded mb-4"
//           onClick={() => setShowFilters(!showFilters)}
//         >
//           {showFilters ? "Hide Filters" : "Show Filters"}
//         </button>

//         <div className={`${showFilters ? "block" : "hidden"} sm:block`}>
//           <h2 className="text-xl font-semibold mb-4">Filters</h2>

//           {/* Categories */}
//           <div className="mb-6">
//             <h3 className="text-lg font-medium mb-2">Categories</h3>
//             <ul className="space-y-2">
//               {categories.map((category, index) => (
//                 <li key={index}>
//                   <label className="flex items-center">
//                     <input
//                       type="checkbox"
//                       className="form-checkbox text-blue-600"
//                       checked={selectedCategory === category}
//                       onChange={() =>
//                         setSelectedCategory(
//                           selectedCategory === category ? "" : category
//                         )
//                       }
//                     />
//                     <span className="ml-2">{category}</span>
//                   </label>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Price Range */}
//           <div className="mb-6">
//             <h3 className="text-lg font-medium mb-2">Price Range</h3>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="number"
//                 placeholder="Min"
//                 className="w-1/2 px-2 py-1 border rounded"
//                 value={minPrice}
//                 onChange={(e) => setMinPrice(Number(e.target.value))}
//               />
//               <span>-</span>
//               <input
//                 type="number"
//                 placeholder="Max"
//                 className="w-1/2 px-2 py-1 border rounded"
//                 value={maxPrice === Infinity ? "" : maxPrice}
//                 onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)}
//               />
//             </div>
//           </div>

//           {/* General Search */}
//           <div className="mb-6">
//             <h3 className="text-lg font-medium mb-2">Search</h3>
//             <input
//               type="text"
//               placeholder="Search by name or description"
//               className="w-full px-2 py-1 border rounded"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Apply Filters Button */}
//           <button
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
//             onClick={applyFilters}
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>

//       {/* Product list */}
//       <div className="w-full sm:w-full p-4">
//         <h1 className="text-2xl font-bold mb-6">
//           {searchTerm ? `Search Results for "${searchTerm}"` : "All Products"}
//         </h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           {currentProducts.map((product) => (
//             <Link
//               key={product.id}
//               href={`/product?id=${product.id}&data=${encodeURIComponent(
//                 JSON.stringify({
//                   ...product,
//                   img: product.img.join(","), // Join the array into a single string
//                 })
//               )}`}
//               // href={`/product?id=${product.id}&data=${encodeURIComponent(
//               //   JSON.stringify({
//               //     ...product,
//               //     img: encodeURIComponent(product.img),
//               //   })
//               // )}`}
//               className="block"
//               target="_blank"
//               rel="noopener noreferrer"
//             >
//               <ListTile product={product} />
//             </Link>
//           ))}
//         </div>
//         {products.length === 0 && (
//           <p className="text-center text-gray-500 mt-8">No products found.</p>
//         )}

//         {/* Pagination Controls */}
//         <div className="flex justify-center items-center mt-6 space-x-4">
//           <button
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}
//             className="disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <FaArrowLeft className="text-2xl text-blue-500 hover:text-blue-700" />
//           </button>
//           <span className="text-sm font-medium">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className="disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <FaArrowRight className="text-2xl text-blue-500 hover:text-blue-700" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SeeallContent;
