// page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicOrderConfirmation = dynamic(() => import('./orderconfirmation'), {
  loading: () => <p>Loading...</p>,
});

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicOrderConfirmation />
    </Suspense>
  );
}