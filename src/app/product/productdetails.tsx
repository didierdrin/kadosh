"use client";
import { useSearchParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  details: string;
  img: string;
  manufacturer: string;
  model: string;
  category: string;
  qty: number;
}

export default function ProductDetails() {
    const searchParams = useSearchParams();
    const productData = searchParams.get('data');
    const product: Product | null = productData ? JSON.parse(decodeURIComponent(productData)) : null;
  
    if (!product) return <div className="text-center py-10">Product not found</div>;
  
  return (
    <div className="flex flex-wrap -mx-4">
      <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="w-full md:w-1/2 px-4">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-2xl font-semibold text-blue-600 mb-4">
          RWF {product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Product Details</h2>
          <p className="text-gray-700">{product.details}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Specifications</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Manufacturer: {product.manufacturer}</li>
            <li>Model: {product.model}</li>
            <li>Category: {product.category}</li>
            <li>Available Quantity: {product.qty}</li>
          </ul>
        </div>
        <button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
          Add to Cart
        </button>
      </div>
    </div>
  );
}