import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicCheckoutContent = dynamic(() => import('./checkoutcontent'), {
  loading: () => <p>Loading...</p>,
});

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicCheckoutContent />
    </Suspense>
  );
}