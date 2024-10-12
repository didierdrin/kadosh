// page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import { FaHeart } from 'react-icons/fa';

const DynamicWatchlistDetails = dynamic(() => import('./watchlistdetails'), {
  ssr: false,
});

export default function WatchlistPage() {
  
  return (
    <div className="container h-[300px] mx-auto px-4 py-8">
      <Link
        href="/seeall"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to products
      </Link>
      <Suspense fallback={<div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-pulse">
          <FaHeart className="text-red-600 animate-heart-scale" size={64} />
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Loading Watchlist...</p>
      </div>}>
        <DynamicWatchlistDetails />
      </Suspense>
    </div>
  );
}
