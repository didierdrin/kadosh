// page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";
import { FaShoppingCart } from 'react-icons/fa';

const DynamicCartDetails = dynamic(() => import('./cartdetails'), {
  ssr: false,
});

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/seeall"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to products
      </Link>
      <Suspense fallback={<div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
      <div className="animate-pulse">
        <FaShoppingCart className="text-sky-600 animate-cart-scale" size={64} />
      </div>
      <p className="mt-4 text-lg font-semibold text-gray-700">Loading Kadosh...</p>
    </div>}>
        <DynamicCartDetails />
      </Suspense>
    </div>
  );
}