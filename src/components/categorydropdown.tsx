// Category dropdown
'use client';
import React, { useState } from 'react';

export default function CategoryDropdown() {
  return (
    <div className="relative group">
      <div className="flex items-center cursor-pointer">
        <a href="/" className="mx-3 text-gray-700 group-hover:text-blue-500">
          Shop by<br />category
        </a>
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
      
      <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Laptops</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Desktops</a>
          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Computer Accessories</a>
        </div>
      </div>
    </div>
  );
}
