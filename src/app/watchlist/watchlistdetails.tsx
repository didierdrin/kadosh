"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/authprovider';
import { db } from '@/components/authprovider';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FaTrash } from 'react-icons/fa';
import Image from "next/image";

interface WatchlistItem {
  id: number;
  name: string;
  price: number;
  details: string;
  img: string[]; // Assuming array of strings for images
  manufacturer: string;
  model: string;
  category: string;
}

export default function Watchlist() {
  const [watchlistItems, setWatchlistItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const checkAuth = async () => {
      if (!authLoading) {
        if (user) {
          const fetchWatchlistItems = async () => {
            try {
              const userDocRef = doc(db, 'client_data_new', user.uid);
              const userDoc = await getDoc(userDocRef);

              if (userDoc.exists()) {
                const userData = userDoc.data();
                setWatchlistItems(userData.watchlist || []);
                if (userData.watchlist && userData.watchlist[0]?.img.length > 0) {
                  setMainImage(userData.watchlist[0].img[0]); // Set the first image as the main image
                }
              } else {
                await setDoc(userDocRef, { watchlist: [] });
                setWatchlistItems([]);
              }
            } catch (error) {
              console.error("Error fetching watchlist items: ", error);
            } finally {
              setLoading(false);
            }
          };

          await fetchWatchlistItems();
        } else {
          router.push('/auth');
        }
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [user, authLoading, router]);

  const updateWatchlist = async (newWatchlist: WatchlistItem[]) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'client_data_new', user.uid);
      await updateDoc(userDocRef, { watchlist: newWatchlist });
      setWatchlistItems(newWatchlist);
    } catch (error) {
      console.error("Error updating watchlist: ", error);
    }
  };

  const removeFromWatchlist = async (item: WatchlistItem) => {
    try {
      const newWatchlist = watchlistItems.filter((watchlistItem) => watchlistItem.id !== item.id);
      await updateWatchlist(newWatchlist);
    } catch (error) {
      console.error("Error removing item from watchlist: ", error);
    }
  };

  if (authLoading || !authChecked) {
    return <div className="text-center py-10">Checking authentication...</div>;
  }

  if (!user) {
    router.push('/auth');
    return null;
  }

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center ">Loading...</div>;
    //return <div className="text-center py-10">Loading watchlist...</div>;
  }

  if (watchlistItems.length === 0) {
    return <div className="text-center py-10">Your watchlist is empty</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Watchlist</h1>
      {watchlistItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center">
            {/* Main image and thumbnail images */}
            <div className="flex flex-row mr-6">
              {/* Main image */}
              <Image
                src={mainImage || item.img[0]}
                alt={item.name}
                className="w-40 h-40 object-cover mr-4 rounded"
                width="40"
                height="40"
              />

              {/* Thumbnails */}
              {item.img.length > 1 && (
                <div className="flex flex-col items-center mt-4">
                  <div className="flex flex-col space-y-2 overflow-y-auto scrollbar-hide h-32">
                    {item.img.map((imgUrl, index) => (
                      <Image
                        key={index}
                        src={imgUrl}
                        alt={`${item.name}-${index}`}
                        className="w-12 h-12 object-cover rounded cursor-pointer"
                        height="12" 
                        width="12"
                        onClick={() => setMainImage(imgUrl)} // Set the clicked image as the main image
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">RWF {item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</p>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={() => removeFromWatchlist(item)} className="ml-4 text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
