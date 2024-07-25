"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBell, FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from "../components/authprovider";
import MyKadoshDropdown from "./mykadoshdropdown";

const PrimaryNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Check login status when component mounts
    // checkLoginStatus();
  }, []);

  // const checkLoginStatus = () => {
  //   const userToken = localStorage.getItem("userToken");
  //   setIsLoggedIn(!!userToken);
  // };

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (user) {
      router.push("/profile");
    } else {
      router.push("/auth");
    }
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (user) {
      logout();
      //router.push("/profile");
    } else {
      router.push("/auth");
    }
  };

  return (
    <div className="hidden sm:flex h-[50px] p-5 items-center justify-between text-black bg-sky-50 text-sm">
      <div className="flex items-center">
        {user ? (
          <>
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-green-500">Hey! You&apos;re Signed In</span>
          </>
        ) : (
          <>
            <div className="w-4 h-4 bg-orange-500 rounded-full mr-2 flex items-center justify-center"></div>
            <a href="/auth" className="text-orange-500 hover:underline">
              Not Signed In
            </a>
          </>
        )}
      </div>

      <a href="/" className="hover:text-teal-500">
        Contact Us
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
      <MyKadoshDropdown />
      <div className="flex flex-col items-center mt-1 hover:text-teal-500 cursor-pointer">
        <a href="/notifications">
          <FaBell className="text-lg" />
        </a>
        <span className="text-[11px]">Notifications</span>
      </div>
      <div className="flex flex-col items-center mt-1 hover:text-teal-500 cursor-pointer">
        <a href="/cart">
          <FaShoppingCart className="text-lg" />
        </a>
        <span className="text-[11px]">Cart</span>
      </div>
      <div className="relative group mr-2">
        <div className="flex flex-col items-center mt-1 hover:text-teal-500 cursor-pointer">
          <FaUser className="text-lg" />
          <span className="text-[11px]">Profile</span>
        </div>
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
            {user ? "My Account" : "Login"}
          </a>
          {!user && (
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
