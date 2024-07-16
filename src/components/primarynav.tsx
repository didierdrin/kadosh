"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBell, FaShoppingCart, FaUser } from "react-icons/fa";

const PrimaryNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check login status when component mounts
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const userToken = localStorage.getItem("userToken");
    setIsLoggedIn(!!userToken);
  };

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      router.push("/auth");
    }
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      router.push("/auth");
    }
  };

  return (
    <div className="hidden sm:flex h-[50px] p-5 items-center justify-between text-black bg-sky-50 text-sm">
      <a href="/">Hey!</a>
      <a href="/" className="hover:text-teal-500">
        Become a seller
      </a>
      <a href="/" className="hover:text-teal-500">
        Contact
      </a>
      <a href="/" className="text-xs hover:text-teal-500">
        Shipping to<br></br>22 KG 25 ST
      </a>
      <div></div>
      <a href="/" className="text-xs hover:text-teal-500">
        Orders
        <br />& Returns
      </a>
      <a href="/cart" className="hover:text-teal-500">
        Watchlist
      </a>
      <a href="/" className="hover:text-teal-500">
        My Kadosh
      </a>
      <FaBell href="/cart" className="text-lg hover:text-teal-500" />
      <a href="/cart">
      <FaShoppingCart className="text-lg hover:text-teal-500" />
      </a>
      <div className="relative group">
        <FaUser className="text-lg hover:text-teal-500 cursor-pointer" />
        <div className="absolute right-0 top-full w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          <a
            href="#"
            onClick={handleProfileClick}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </a>
          <a
            href="#"
            onClick={handleLoginClick}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {isLoggedIn ? "My Account" : "Login"}
          </a>
          {!isLoggedIn && (
            <a
              href="/auth"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Create an account
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimaryNavbar;