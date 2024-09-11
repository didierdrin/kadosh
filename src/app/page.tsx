'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/authprovider';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect to /home once loading is finished and user is authenticated
  useEffect(() => {
    if (!loading) {
      router.push('/home');
    }
  }, [loading, router]);

  // Dynamically update the document title based on loading status
  useEffect(() => {
    if (loading) {
      document.title = 'Loading Kadosh...'; // Set the title during loading
    } else {
      document.title = 'Kadosh'; // Restore the original title
    }
  }, [loading]);

  // Do not render any loading animation in the body, only update the title
  return null;
}

// 'use client';
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../components/authprovider';
// import { FaShoppingCart } from 'react-icons/fa';
// import './globals.css';

// export default function Home() {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading) {
//       router.push('/home');
//     }
//   }, [loading, router]);

//   return (
//     <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
//       <div className="animate-pulse">
//         <FaShoppingCart className="text-sky-600 animate-cart-scale" size={64} />
//       </div>
//       <p className="mt-4 text-lg font-semibold text-gray-700">Loading Kadosh...</p>
//     </div>
//   );
// };