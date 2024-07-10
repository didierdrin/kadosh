// see all - navigation route
'use client';
import React from 'react';
import Link from 'next/link';
// Firebase Firestore Data hook
import { useProducts } from '@/components/useproducts';

// ListTile component for individual products
const ListTile = ({ product }: any) => {
    //var num = product.price;
    function commafy(num : any) {
        var str = num.toString().split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }

  return (
    <div className="border rounded-lg p-4 mb-4 flex items-center hover:-translate-y-1 cursor-pointer">
      <img src={product.img} alt={product.name} className="w-24 h-24 object-cover mr-4" />
      <div>
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-600">RWF{commafy(product.price.toFixed(2))}</p>
        <p className="text-sm text-gray-500">{product.details}</p>
      </div>
    </div>
  );
};

// Main Seeall component
export default function Seeall() {
  // Sample product data
  /*
  const products = [
    { id: 1, name: "Apple iTouch", price: 19990, description: "Description for Product 1", image: "https://res.cloudinary.com/dezvucnpl/image/upload/v1720272875/katlyn-luz-ZreKkcuqMU8-unsplash_vaxrq2.jpg" },
    { id: 2, name: "2.4G Wireless Keyboard", price: 29000, description: "Description for Product 2", image: "https://res.cloudinary.com/dezvucnpl/image/upload/v1720272880/bryan-natanael-hR8l1s4u8QE-unsplash_on46hy.jpg" },
    { id: 3, name: "USB C-cable", price: 4000, description: "Description for Product 3", image: "https://res.cloudinary.com/dezvucnpl/image/upload/v1720272910/maxence-pira-OJJhibC7cEM-unsplash_gg3q0n.jpg" },
  ]; */
  const { products, loading, error } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


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
      <div className='w-full p-4 sm:w-3/4'>
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        {products.map(product => (
          <Link href={`/product?id=${product.id}&data=${encodeURIComponent(JSON.stringify(product))}`} className="block">
          <ListTile key={product.id} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
