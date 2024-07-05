// Explore - USED IN homePAGE.tsx
import React from 'react'; 
// import category cards
import Categorycard from './categorycard';

export default function Explorecategories() {
    return (
        <div className="flex flex-col p-5 w-full mb-6">
            <h3 className='font-semibold text-lg'>Explore Various Categories</h3>
            {/* Category list */}
            <div className="flex flex-row mt-3 space-x-4">
                <Categorycard imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166555/quaritsch-photography-m2zuB8DqwyM-unsplash_vbgijs.jpg" productName="Latest" />
                <Categorycard imgUrl="https://res.cloudinary.com/dezvucnpl/image/upload/v1720166594/vinit-vispute-IpIqJwxdiog-unsplash_gqnf8c.jpg" productName="Accessories" />
            </div>
        </div>
    );
};