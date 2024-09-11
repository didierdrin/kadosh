"use client";

import { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/authprovider';
import { db } from '@/components/authprovider';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';

interface CartItem {
  id: number;
  name: string;
  price: number;
  details: string;
  img: string;
  manufacturer: string;
  model: string;
  category: string;
  qty: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // const fetchCartItems = async () => {
  //   try {
  //     if (!user) throw new Error("No user found");

  //     const userDocRef = doc(db, 'users', 'qWE5sgjt0RRhtHDqwciu', 'client_data', user.uid);
  //     const userDoc = await getDoc(userDocRef);

  //     if (userDoc.exists()) {
  //       const userData = userDoc.data();
  //       setCartItems(userData.cart || []);
  //     } else {
  //       await setDoc(userDocRef, { cart: [] });
  //       setCartItems([]);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching cart items: ", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const checkAuth = async () => {
      if (!authLoading) {
        if (user) {
          const fetchCartItems = async () => {
            try {
              if (!user) throw new Error("No user found");
  
              const userDocRef = doc(db, 'users', 'qWE5sgjt0RRhtHDqwciu', 'client_data', user.uid);
              const userDoc = await getDoc(userDocRef);
  
              if (userDoc.exists()) {
                const userData = userDoc.data();
                setCartItems(userData.cart || []);
              } else {
                await setDoc(userDocRef, { cart: [] });
                setCartItems([]);
              }
            } catch (error) {
              console.error("Error fetching cart items: ", error);
            } finally {
              setLoading(false);
            }
          };
  
          await fetchCartItems();
        } else {
          router.push('/auth');
        }
        setAuthChecked(true);
      }
    };
  
    checkAuth();
  }, [user, authLoading, router]);

  const updateCart = async (newCart: CartItem[]) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', 'qWE5sgjt0RRhtHDqwciu', 'client_data', user.uid);
      await updateDoc(userDocRef, { cart: newCart });
      setCartItems(newCart);
    } catch (error) {
      console.error("Error updating cart: ", error);
    }
  };

  const removeFromCart = async (item: CartItem) => {
    try {
      const newCart = cartItems.filter((cartItem) => cartItem.id !== item.id);
      await updateCart(newCart);
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  const updateQuantity = async (item: CartItem, change: number) => {
    try {
      const newCart = cartItems.map((cartItem) => {
        if (cartItem.id === item.id) {
          const newQty = Math.max(1, cartItem.qty + change);
          return { ...cartItem, qty: newQty };
        }
        return cartItem;
      });
      await updateCart(newCart);
    } catch (error) {
      console.error("Error updating quantity: ", error);
    }
  };

  const handleBuyNow = (item: CartItem) => {
    router.push(`/checkout?data=${encodeURIComponent(JSON.stringify(item))}`);
  };

  const handleBuyAll = () => {
    router.push(`/checkout?data=${encodeURIComponent(JSON.stringify(cartItems))}`);
  };

  if (authLoading || !authChecked) {
    return <div className="text-center py-10">Checking authentication...</div>;
  }

  if (!user) {
    router.push('/auth');
    return null;
  }

  if (loading) {
    return <div className="text-center py-10">Loading cart...</div>;
  }

  if (cartItems.length === 0) {
    return <div className="text-center py-10">Your cart is empty</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-between border-b py-4">
          <div className="flex items-center">
            <img src={item.img} alt={item.name} className="w-20 h-20 object-cover mr-4" width="20" height="20" />
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">RWF {item.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</p>
            </div>
          </div>
          <div className="flex items-center">
            <button onClick={() => updateQuantity(item, -1)} className="text-gray-500 hover:text-gray-700">
              <FaMinus />
            </button>
            <span className="mx-2">{item.qty}</span>
            <button onClick={() => updateQuantity(item, 1)} className="text-gray-500 hover:text-gray-700">
              <FaPlus />
            </button>
            <button onClick={() => removeFromCart(item)} className="ml-4 text-red-500 hover:text-red-700">
              <FaTrash />
            </button>
            <button
              onClick={() => handleBuyNow(item)}
              className="ml-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Buy Now
            </button>
          </div>
        </div>
      ))}
      <div className="mt-8 flex justify-between items-center">
        <div className="text-xl">
          <strong>Total:</strong> RWF {cartItems.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </div>
        <button
          onClick={handleBuyAll}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-300"
        >
          Buy All
        </button>
      </div>
    </div>
  );
}