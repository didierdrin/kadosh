"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from '@/components/authprovider';
import { FaShoppingCart, FaDollarSign, FaHeart } from 'react-icons/fa';

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
    const router = useRouter();
    const { user } = useAuth();
    const productData = searchParams.get('data');
    const product: Product | null = productData ? JSON.parse(decodeURIComponent(productData)) : null;

    if (!product) return <div className="text-center py-10">Product not found</div>;

    const handleAddToCart = () => {
      if (!user) {
        router.push('/auth');
      } else {
        // Add to cart logic here
        console.log('Added to cart');
        // router.push(`/watchlist?data=${encodeURIComponent(JSON.stringify(product))}`);
      }
    };

    const handleBuyNow = () => {
      if (!user) {
        router.push('/auth');
      } else {
        router.push(`/checkout?data=${encodeURIComponent(JSON.stringify(product))}`);
      }
    };

    const handleAddToWatchlist = () => {
      if (!user) {
        router.push('/auth');
      } else {
        // Add to watchlist logic here
        console.log('Added to watchlist');
      }
    };

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
        <div className="flex items-center space-x-4">
          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            className="bg-green-600 text-white py-2 px-6 rounded-full hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <FaDollarSign className="mr-2" /> Buy Now
          </button>
          <button 
            onClick={handleAddToWatchlist}
            className="text-red-600 hover:text-red-700 transition duration-300 ease-in-out transform hover:scale-110"
          >
            <FaHeart size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}