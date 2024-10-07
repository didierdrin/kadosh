"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaBell, FaShoppingCart, FaUser } from "react-icons/fa";
import { useAuth } from "../components/authprovider";
import { db } from "../components/authprovider";
import { doc, getDoc } from "firebase/firestore";
import MyKadoshDropdown from "./mykadoshdropdown";
import Image from "next/image";

const PrimaryNavbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const [shippingAddress, setShippingAddress] = useState<string | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(
          db,
          "client_data_new",
          user.uid
        );
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Set shipping address if available
          const addressData = data.customer_info?.shippingAddress;
          if (addressData) {
            setShippingAddress(
              `${addressData.addressLine1}, ${addressData.city}`
            );
          } else {
            setShippingAddress(null);
          }
          // Set profile image if available
          setProfileImage(data.customer_info?.profileImage || null);
        }
      };
      fetchUserData();
    }
  }, [user]);

  const handleProfileClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (user) {
      router.push("/myaccount");
    } else {
      router.push("/auth");
    }
  };

  const handleLoginClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (user) {
      logout();
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

      {/* Shipping Address Section */}
      <a
        href={user ? "/myaccount" : "/auth"}
        className="text-xs hover:text-teal-500"
      >
        {shippingAddress ? (
          <>
            Shipping to
            <br />
            {shippingAddress}
          </>
        ) : (
          <>
            Shipping Address
            <br />
            Not Added
          </>
        )}
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

      {/* Profile and Dropdown */}
      <div className="relative group mr-2">
        <div className="flex flex-col items-center hover:text-teal-500 cursor-pointer">
          {/* Display user image if logged in, otherwise FaUser */}
          {user && profileImage ? (
            <Image
              src={profileImage}
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <>
              {user && user.email ? (
                <div className="h-[40px] w-[40px] flex items-center justify-center rounded-full bg-slate-400 hover:bg-slate-600 text-white text-xl font-bold">
                  <a href="/myaccount">{user.email.charAt(0).toUpperCase()}</a>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FaUser className="text-lg" />
                  <span className="text-[11px]">Guest</span>
                </div>
              )}
            </>
          )}
        </div>
        <div className="absolute right-0 top-full w-48 bg-white rounded-md shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
          {/* Conditional rendering for dropdown options */}
          {user ? (
            <>
              {/* <a
                href="#"
                // onClick={handleProfileClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile
              </a> */}
              <a
                href="/myaccount"
                // onClick={handleLoginClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Account
              </a>
              <a
                href="/myaccount"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Log out
              </a>
            </>
          ) : (
            <>
              <a
                href="/auth"
                onClick={handleProfileClick}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </a>
              <a
                href="/auth"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Create account
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrimaryNavbar;
