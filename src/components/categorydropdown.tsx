'use client';
import React from 'react';

interface CategoryDropdownProps {
  onCategorySelect: (category: string) => void; // Callback to handle category selection
}

export default function CategoryDropdown({ onCategorySelect }: CategoryDropdownProps) {
  const categories = ['All', 'Laptops', 'Desktops', 'Electronics', 'Accessories'];

  return (
    <div className="relative group">
      <div className="flex items-center cursor-pointer">
        <span className="mx-3 text-gray-700 group-hover:text-blue-500">
          Find<br />category
        </span>
        <svg
          className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-transform duration-200 ease-in-out transform group-hover:-rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown menu */}
      <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          {categories.map((category) => (
            <a
              key={category}
              onClick={() => onCategorySelect(category)} // Use callback to handle category selection
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
              role="menuitem"
            >
              {category}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}





// Category dropdown
// 'use client';
// import React, { useState } from 'react';

// export default function CategoryDropdown() {
//   return (
//     <div className="relative group">
//       <div className="flex items-center cursor-pointer">
//         <a href="/" className="mx-3 text-gray-700 group-hover:text-blue-500">
//           Find<br />category
//         </a>
//         <svg
//           className="h-6 w-6 text-gray-400 group-hover:text-blue-500 transition-transform duration-200 ease-in-out transform group-hover:-rotate-180"
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </div>
      
//       <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//         <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//           <a href="/seeall" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">All</a>
//           <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Laptops</a>
//           <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Desktops</a>
//           <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Accessories</a>
//         </div>
//       </div>
//     </div>
//   );
// }
