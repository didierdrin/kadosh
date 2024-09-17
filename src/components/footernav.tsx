// Footer navbar
"use client";
import React from "react";
// AuthProvider, useAuth
import { useAuth } from "./authprovider";

export default function FooterNavbar() {
  const { logout } = useAuth();
  return (
    <footer className="bg-gradient-to-b w-full from-teal-100 via-slate-100 to-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-sm sm:text-base">
        <div>
          <h4 className="font-bold mb-3 text-base lg:text-lg">Buy</h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline hover:text-teal-500">
                Registration
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline hover:text-teal-500">
                Kadosh Refund Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline hover:text-teal-500">
                Bidding & buying help
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline hover:text-teal-500">
                Stores
              </a>
            </li>
            <li>
              <hr />
            </li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
                className="flex items-center float-b mt-10 space-x-2 hover:text-red-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          {/* <h4 className='font-bold mb-3 text-base lg:text-lg'>Sell</h4>
              <ul className="space-y-2">
                  <li><a href="/" className="hover:underline hover:text-teal-500">Start selling</a></li>
                  <li><a href="/" className="hover:underline hover:text-teal-500">Learn to sell</a></li>
                  <li><a href="/" className="hover:underline hover:text-teal-500">Affiliates</a></li>
              </ul> */}
          {/* <h4 className='font-bold mb-3 mt-6 text-base lg:text-lg'>Tools & apps</h4>
              <ul className="space-y-2">
                  <li><a href="/" className="hover:underline hover:text-teal-500">Developers</a></li>
                  <li><a href="/" className="hover:underline hover:text-teal-500">Security center</a></li>
                  <li><a href="/" className="hover:underline hover:text-teal-500">Site map</a></li>
              </ul> */}
        </div>
        <div>
          <h4 className="font-bold mb-3 text-base lg:text-lg">
            Stay connected
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/"
                className="flex items-center space-x-2 hover:text-teal-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Kadosh blogs</span>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center space-x-2 hover:text-blue-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Facebook</span>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center space-x-2 hover:text-green-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM7 9a1 1 0 011-1h4a1 1 0 110 2H9.5v3a1 1 0 11-2 0V9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>WhatsApp</span>
              </a>
            </li>
            <li>
              <a
                href="/"
                className="flex items-center space-x-2 hover:text-pink-600"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.058 15.13a7.953 7.953 0 01-10.116 0A7.946 7.946 0 012 10c0-4.411 3.589-8 8-8s8 3.589 8 8a7.946 7.946 0 01-2.942 5.13zM10 12a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Instagram</span>
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-base lg:text-lg">About Kadosh</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/company"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-teal-500"
              >
                Company info
              </a>
            </li>
            <li>
              <a
                href="/company"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-teal-500"
              >
                News
              </a>
            </li>
            <li>
              <a
                href="/company"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-teal-500"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="/company"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-teal-500"
              >
                Advertise with us
              </a>
            </li>
            <li>
              <a
                href="/company"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-teal-500"
              >
                Policies
              </a>
            </li>
            <li>
              <a
                href="/company"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-teal-500"
              >
                Become a seller
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3 text-base lg:text-lg">
            Help & Contact
          </h4>
          <ul className="space-y-2">
            <li>
              <a
                href="/company"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline hover:text-teal-500"
              >
                Seller information center
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline hover:text-teal-500">
                Contact us
              </a>
            </li>
          </ul>
          <h4 className="font-bold mb-3 mt-6 text-base lg:text-lg">
            Select language
          </h4>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline hover:text-teal-500">
                English
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline hover:text-teal-500">
                Kinyarwanda
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-6 border-t border-gray-300" />
      <div className="text-center text-sm">
        <p>&#169; Copyright 2024 | Kadosh ltd. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
