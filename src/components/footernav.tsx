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
              <a href="/auth" className="hover:underline hover:text-teal-500">
                Registration
              </a>
            </li>
            <li>
              <a href="/company" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-500">
                Kadosh Refund Policy
              </a>
            </li>
            <li>
              <a href="/company" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-500">
                Bidding & buying help
              </a>
            </li>
            <li>
              <a href="/company" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-500">
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
                <span>Log out</span>
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
    href="https://wa.me/yourwhatsappnumber" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center space-x-2 hover:text-green-600"
  >
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.52 3.47A11.81 11.81 0 0 0 12.18 0a11.81 11.81 0 0 0-8.36 3.46A11.81 11.81 0 0 0 0 11.82a11.63 11.63 0 0 0 1.57 5.87L0 24l6.47-1.69a11.82 11.82 0 0 0 5.7 1.47 11.82 11.82 0 0 0 8.35-3.47 11.81 11.81 0 0 0 3.47-8.36 11.7 11.7 0 0 0-3.47-8.35zm-8.34 18.42a10.35 10.35 0 0 1-5.34-1.48l-.38-.23-3.83 1 1-3.72-.25-.39a10.4 10.4 0 0 1-1.6-5.52 10.45 10.45 0 0 1 3.08-7.44 10.47 10.47 0 0 1 7.44-3.08 10.42 10.42 0 0 1 7.41 3.07 10.39 10.39 0 0 1 3.07 7.43 10.43 10.43 0 0 1-3.07 7.44 10.43 10.43 0 0 1-7.43 3.08zm5.86-7.87c-.32-.16-1.89-.93-2.18-1.03s-.51-.16-.73.16-.84 1.03-1.03 1.24-.38.24-.7.08a8.54 8.54 0 0 1-2.54-1.57 9.38 9.38 0 0 1-1.7-2.12c-.16-.32-.02-.5.12-.67.13-.14.32-.38.48-.57.16-.18.22-.32.33-.54s.05-.43-.02-.6c-.08-.16-.72-1.74-1-2.39-.27-.65-.55-.56-.73-.57h-.6a1.16 1.16 0 0 0-.83.4c-.28.3-1.1 1.07-1.1 2.61s1.13 3.02 1.29 3.23c.16.22 2.21 3.36 5.34 4.7.74.32 1.32.51 1.77.66.74.24 1.41.2 1.94.13.59-.09 1.89-.77 2.16-1.5.27-.73.27-1.35.19-1.5-.07-.16-.29-.25-.6-.4z"
      />
    </svg>
    <span>WhatsApp</span>
  </a>
</li>

<li>
  <a
    href="https://instagram.com/yourusername"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center space-x-2 hover:text-red-600"
  >
    <svg
      className="w-5 h-5"
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.35 3.608 1.326.976.975 1.264 2.242 1.326 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.35 2.633-1.326 3.608-.975.976-2.242 1.264-3.608 1.326-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.35-3.608-1.326-.976-.975-1.264-2.242-1.326-3.608C2.175 15.746 2.163 15.366 2.163 12s.012-3.584.07-4.85c.062-1.366.35-2.633 1.326-3.608.975-.976 2.242-1.264 3.608-1.326C8.417 2.175 8.797 2.163 12 2.163zm0-2.163C8.741 0 8.332.015 7.053.073 5.775.132 4.626.336 3.682 1.281 2.737 2.226 2.533 3.375 2.474 4.653 2.416 5.932 2.4 6.341 2.4 12c0 5.659.016 6.068.074 7.347.059 1.278.263 2.427 1.208 3.372.945.945 2.094 1.149 3.372 1.208C8.332 23.985 8.741 24 12 24s3.668-.015 4.947-.073c1.278-.059 2.427-.263 3.372-1.208.945-.945 1.149-2.094 1.208-3.372.058-1.279.074-1.688.074-7.347 0-5.659-.016-6.068-.074-7.347-.059-1.278-.263-2.427-1.208-3.372-.945-.945-2.094-1.149-3.372-1.208C15.668.015 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.838 3.838 0 1 1 0-7.676 3.838 3.838 0 0 1 0 7.676zm6.406-11.845a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88z"
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
              <a href="/company" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-teal-500">
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
