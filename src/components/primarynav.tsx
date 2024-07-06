// Primarynavbar
'use client';
import React, { useState } from 'react';
import { FaBell, FaShoppingCart, FaUser } from 'react-icons/fa';

const PrimaryNavbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className='hidden sm:flex h-[50px] p-5 items-center justify-between text-black bg-sky-50 text-sm'>
            <a href="/">Hey!</a>
            <a href="/" className='hover:text-teal-500'>Become a seller</a>
            <a href="/" className='hover:text-teal-500'>Contact</a>
            <a href="/" className="text-xs hover:text-teal-500">Shipping to<br></br>22 KG 25 ST</a>
            <div></div>
            <a href="/" className="text-xs hover:text-teal-500">Orders<br/>& Returns</a>
            <a href="/" className='hover:text-teal-500'>Watchlist</a>
            <a href="/" className='hover:text-teal-500'>My Kadosh</a>
            <FaBell className='text-lg hover:text-teal-500' /> 
            <FaShoppingCart className='text-lg hover:text-teal-500' />
            <div 
                className="relative group"
            >
                <FaUser className='text-lg hover:text-teal-500 cursor-pointer' />
                <div className="absolute right-0 top-full w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
                    <a href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Login</a>
                    <a href="/create-account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Create an account</a>
                </div>
            </div>
        </div>
    );
};

export default PrimaryNavbar;
