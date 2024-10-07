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
