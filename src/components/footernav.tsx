// Footer navbar
import React from 'react';

export default function FooterNavbar() {
    return (
        <div className="flex flex-col h-[350px] bg-gradient-to-b from-teal-100 via-slate-100 to-slate-50 p-10">
            <div className='flex-grow flex flex-row justify-between'>
                <div className='flex flex-col'>
                    <h4 className='font-bold mb-3'>Buy</h4>
                    <a href="/">Registration</a>
                    <a href="/">Kadosh Refund Policy</a>
                    <a href="/">Bidding & buying help</a>
                    <a href="/">Stores</a>
                </div>
                <h4>Sell</h4>
                <h4>Stay connected</h4>
                <h4>About Kadosh</h4>
                <h4>Help & Contact</h4>
            </div>
            <hr className="my-4 border-t border-gray-300" />
            <div className="mt-auto">
                <p>Copyright 2024 Kadosh ltd. All Rights Reserved.</p>
            </div>
        </div>
    );
};