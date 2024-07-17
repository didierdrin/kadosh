"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from '@/components/authprovider';

interface OrderItem {
    id: number;
    name: string;
    price: number;
    qty: number;
  }
  
  interface Order {
    orderId: string;
    createTime: string;
    products: OrderItem[];
    total: number;
  }

const OrderConfirmation: React.FC = () => {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const db = getFirestore();

  useEffect(() => {
    const checkAuth = async () => {
      if (!authLoading) {
        if (user) {
          await fetchOrderData();
        } else {
          router.push('/auth');
        }
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [user, authLoading, router]);

  const fetchOrderData = async () => {
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    const userDocRef = doc(db, 'users', 'qWE5sgjt0RRhtHDqwciu', 'client_data', user.uid);

    try {
      const docSnap = await getDoc(userDocRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        const currentOrders = userData.current_orders || [];

        if (currentOrders.length > 0) {
          const mostRecentOrder = currentOrders[currentOrders.length - 1];
          setOrder(mostRecentOrder);
        } else {
          console.log('No orders found');
        }
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching order data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !authChecked) {
    return <div className="container mx-auto px-4 py-8 text-center">Checking authentication...</div>;
  }

  if (!user) {
    router.push('/auth');
    return null;
  }

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading order details...</div>;
  }

  if (!order) {
    return <div className="container mx-auto px-4 py-8 text-center">No order found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Order Confirmation</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Thank you for your order!</h2>
          <p className="text-gray-600">Your order has been successfully placed and is being processed.</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Order Details</h3>
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Date:</strong> {new Date(order.createTime).toLocaleString()}</p>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Items</h3>
          <ul>
            {order.products.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name} - Quantity: {item.qty} - Price: RWF {item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Total</h3>
          <p className="text-2xl font-bold">RWF {order.total.toFixed(2)}</p>
        </div>
        <div className="mt-8">
          <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;