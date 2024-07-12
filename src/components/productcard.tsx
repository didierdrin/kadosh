// Produt card component
import React from 'react';
import { FaShoppingCart } from "react-icons/fa";

export default function ProductCard({ imgUrl, productName, productPrice, discountPercentage }: any) {
    const formattedPrice = new Intl.NumberFormat('en-RW', { style: 'currency', currency: 'RWF' }).format(productPrice);
    
    return (
        <div className='flex flex-col w-64 bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1'>
            {/* Product image */}
            <div className='relative h-48 overflow-hidden'>
                <img 
                    src={imgUrl} 
                    alt={productName} 
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
                />
                {discountPercentage && (
                    <div className='absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded'>
                        {discountPercentage}% OFF
                    </div>
                )}
            </div>
            {/* Product description */}
            <div className='p-4'>
                <h3 className='text-lg font-semibold text-gray-800 mb-2 truncate'>{productName}</h3>
                <div className='flex justify-between items-center'>
                    <p className='text-xl font-bold text-indigo-600'>{formattedPrice}</p>
                    <button className='bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium hover:bg-black transition-colors duration-300'>
                    <FaShoppingCart className='text-lg hover:text-teal-100' />
                    </button>
                </div>
            </div>
        </div>
    );
};