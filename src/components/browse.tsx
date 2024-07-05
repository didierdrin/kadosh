// browse - Used in home page.tsx
import React from 'react'; 

export default function Browse() {
    return(
        <div className="flex flex-row w-full justify-center space-x-10 bg-orange-200">
            {/* img */}
            <img src="https://res.cloudinary.com/dezvucnpl/image/upload/v1720171564/Kadosh_edit_kujjio.png" className='w-[50%] h-[360px]' />
            <div className="flex flex-col pt-6 space-x-4 items-start">
            <h3 className='font-semibold text-lg ml-4'>Get your digital products</h3>
            <a href="/">Save, Sell, Smile</a>
            <button className="rounded p-2 mt-6 border border-black text-black hover:text-white hover:bg-black">Buy Now</button>
            </div>
            <div></div>
        </div>
    );
};