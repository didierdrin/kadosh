// Footer navbar
import React from 'react';

export default function FooterNavbar() {
    return (
        <div className="flex flex-col h-[350px] text-[15px] bg-gradient-to-b from-teal-100 via-slate-100 to-slate-50 p-7">
            <div className='flex-grow flex flex-row justify-between'>
                <div className='flex flex-col'>
                    <h4 className='font-bold mb-3 text-base'>Buy</h4>
                    <a href="/">Registration</a>
                    <a href="/">Kadosh Refund Policy</a>
                    <a href="/">Bidding & buying help</a>
                    <a href="/">Stores</a>
                </div>
                <div className='flex flex-col'>
                    <h4 className='font-bold mb-3  text-base'>Sell</h4>
                    <a href="/">Start selling</a>
                    <a href="/">Learn to sell</a>
                    <a href="/">Affiliates</a>
                    <h4 className='font-bold mb-3 mt-3 text-base'>Tools & apps</h4>
                    <a href="/">Developers</a>
                    <a href="/">Security center</a>
                    <a href="/">Site map</a>
                </div>
                <div className='flex flex-col'>
      <h4 className='font-bold mb-3 text-base'>Stay connected</h4>
      <a href="/" className="flex items-center space-x-2 mb-2 hover:text-blue-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        <span>Kadosh blogs</span>
      </a>
      <a href="/" className="flex items-center space-x-2 mb-2 hover:text-blue-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
        </svg>
        <span>Facebook</span>
      </a>
      <a href="/" className="flex items-center space-x-2 mb-2 hover:text-green-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zM7 9a1 1 0 011-1h4a1 1 0 110 2H9.5v3a1 1 0 11-2 0V9z" clipRule="evenodd" />
        </svg>
        <span>WhatsApp</span>
      </a>
      <a href="/" className="flex items-center space-x-2 mb-2 hover:text-pink-600">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.477 0 10c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10zm5.058 15.13a7.953 7.953 0 01-10.116 0A7.946 7.946 0 012 10c0-4.411 3.589-8 8-8s8 3.589 8 8a7.946 7.946 0 01-2.942 5.13zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>
        <span>Instagram</span>
      </a>
    </div>
                <div className='flex flex-col'>
                    <h4 className='font-bold mb-3 text-base'>About Kadosh</h4>
                    <a href="/">Company info</a>
                    <a href="/">News</a>
                    <a href="/">Careers</a>
                    <a href="/">Advertise with us</a>
                    <a href="/">Policies</a>
                </div>
                <div className='flex flex-col'>
                    <h4 className='font-bold mb-3 text-base'>Stay connected</h4>
                    <a href="/">Seller information center</a>
                    <a href="/">Contact us</a>
                    <h4 className='font-bold mb-3 mt-3 text-base'>Select language</h4>
                    <a href="/">English</a>
                    <a href="/">Kinyarwanda</a>
                </div>
            </div>
            <hr className="my-4 border-t border-gray-300" />
            <div className="mt-auto">
                <p>Copyright 2024 Kadosh ltd. All Rights Reserved.</p>
            </div>
        </div>
    );
};