import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from "next/link";

const DynamicProductDetails = dynamic(() => import('./productdetails'), {
  ssr: false,
});

export default function ProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/seeall"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to products
      </Link>
      <Suspense fallback={<div>Loading...</div>}>
        <DynamicProductDetails />
      </Suspense>
    </div>
  );
}