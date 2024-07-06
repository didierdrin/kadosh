// Slideshow navbar
'use client';
import React from 'react'; 
import { useRouter } from "next/navigation";

export default function SlideshowNavbar () {
  const router = useRouter();

  const HandleShopNowBtn = () => {
    router.push("/seeall");
  }
    return (

        <div className="flex flex-col md:flex-row h-auto w-full p-6 mt-5 justify-around items-center bg-green-100 space-y-6 md:space-y-0 md:space-x-6">
  <div className='flex flex-col items-center md:items-start text-center md:text-left'>
    <h2 className='font-semibold text-xl'>Everything you<br />need with just a click</h2>
    <a href="/" className='my-2'>Get your computer <br />accessories in a bit</a>
    <button onClick={HandleShopNowBtn} className="rounded p-2 my-3 bg-black text-white hover:text-teal-500">Shop now</button>
  </div>
  
  <div className='flex flex-col items-center'>
  <img 
      src="https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80" 
      alt="Computer accessories" 
      className="w-64 h-auto rounded-lg shadow-md"
    />
    
 
  <div className='relative my-3'>
  <a href="/" className="mt-4 mx-4 text-blue-500 hover:text-blue-800 transition-colors duration-200">
    Computers & desktop
  </a>
  <svg 
      className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 text-blue-500 hover:mx-1"
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7" 
      />
    </svg>
  </div>
  </div>
  
  <div className='flex flex-col items-center'>
  <img 
      src="https://res.cloudinary.com/dezvucnpl/image/upload/v1720125977/c-d-x-PDX_a_82obo-unsplash_rqphy7.jpg" 
      alt="Electronic accessories" 
      className="w-64 h-auto rounded-lg shadow-md"
    />
    
 
  <div className='relative my-3'>
  <a href="/" className="mt-4 mx-4 text-blue-500 hover:text-blue-800 transition-colors duration-200">
    Electronic accessories
  </a>
  <svg 
      className="absolute -right-4 top-1/2 transform -translate-y-1/2 h-8 w-8 text-blue-500 hover:mx-2"
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M9 5l7 7-7 7" 
      />
    </svg>
  </div>
  </div>
</div>

    );
};