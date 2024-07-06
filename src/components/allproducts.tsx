// all products - USED IN homePAGE.tsx
import React from 'react'; 
// import product cards
import Productcard from './productcard';

export default function Allproducts() {
    return (
        <div className="flex flex-col p-5 w-full border-b border-slate-100">
            <div className='flex flex-row justify-between'>
                <div className='flex flex-col'>
                    <h3 className='font-semibold text-lg'>All products</h3>
                    <a href="/" className='text-xs'>Recommended for you</a>
                </div>
                <a href="/seeall" className='text-xs underline underline-offset-2 hover:text-blue-900'>See all</a>
            </div>
            {/* Products list */}
            <div className="flex flex-col sm:flex-row mt-3 space-y-4 sm:space-y-0 sm:space-x-4">
    <Productcard 
        imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166555/quaritsch-photography-m2zuB8DqwyM-unsplash_vbgijs.jpg" 
        productName="MSI i7" 
        productPrice={200000} 
        discountPercentage={null} 
    />
    <Productcard 
        imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166594/vinit-vispute-IpIqJwxdiog-unsplash_gqnf8c.jpg" 
        productName="Bluetooth Headsets" 
        productPrice={50000} 
        discountPercentage={5} 
    />
    <Productcard 
        imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720172199/maxim-hopman-Hin-rzhOdWs-unsplash_vjphim.jpg" 
        productName="Macbook Pro" 
        productPrice={650000} 
        discountPercentage={null} 
    />
</div>
        </div>
    );
};