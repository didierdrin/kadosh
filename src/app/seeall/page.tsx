// see all - navigation route
import React from 'react';
import Link from 'next/link';

// ListTile component for individual products
const ListTile = ({ product }: any) => {
  return (
    <div className="border rounded-lg p-4 mb-4 flex items-center hover:-translate-y-1 cursor-pointer">
      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover mr-4" />
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-500">{product.description}</p>
      </div>
    </div>
  );
};

// Main Seeall component
export default function Seeall() {
  // Sample product data
  const products = [
    { id: 1, name: "Product 1", price: 19.99, description: "Description for Product 1", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Product 2", price: 29.99, description: "Description for Product 2", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Product 3", price: 39.99, description: "Description for Product 3", image: "https://via.placeholder.com/150" },
  ];

  // Sample categories for sidebar
  const categories = ["All", "Laptops", "Desktops", "Electronics", "Accessories"];

  return (
    <div className="flex flex-row bg-white min-h-screen">
      {/* Sidebar */}
      <div className='w-1/4 bg-gray-50 p-4 shadow-md hidden sm:block'>
        <h2 className="text-xl mb-4">Categories</h2>
        <hr className='mb-3' />
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="mb-2">
              <Link href={`#${category.toLowerCase().replace(' ', '-')}`} className="text-blue-600 hover:text-sky-900">
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Product list */}
      <div className='w-3/4 p-4'>
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        {products.map(product => (
          <ListTile key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}