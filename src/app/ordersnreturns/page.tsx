"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/authprovider";
import { db } from "@/components/authprovider";
import { doc, getDoc } from "firebase/firestore";

interface Order {
  orderId: string;
  productName: string;
  qty: number;
  price: number;
  status: 'pending' | 'cancelled' | 'returned';
  delivered: boolean;
}

export default function OrdersAndReturns() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'pending' | 'cancelled' | 'returned'>('pending');

  useEffect(() => {
    // Fetch orders for the logged-in user
    const fetchOrders = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "client_data_new", user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            if (data.orders) {
              setOrders(data.orders);
            } else {
              console.log("No orders found.");
            }
          } else {
            console.error("User document not found");
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const filteredOrders = orders.filter((order) => order.status === activeTab);

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center ">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Orders & Returns</h2>

      {/* Tab Bar */}
      <div className="flex space-x-6 mb-6 border-b">
        <button
          className={`text-lg pb-2 ${activeTab === 'pending' ? 'border-b-4 border-blue-600' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Pending
        </button>
        <button
          className={`text-lg pb-2 ${activeTab === 'cancelled' ? 'border-b-4 border-blue-600' : ''}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
        <button
          className={`text-lg pb-2 ${activeTab === 'returned' ? 'border-b-4 border-blue-600' : ''}`}
          onClick={() => setActiveTab('returned')}
        >
          Returned
        </button>
      </div>

      {/* Orders Table */}
      {filteredOrders.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Delivered</th>
              <th className="py-2 px-4 border-b">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.orderId}>
                <td className="py-2 px-4 border-b">{order.orderId}</td>
                <td className="py-2 px-4 border-b">{order.productName}</td>
                <td className="py-2 px-4 border-b">{order.qty}</td>
                <td className="py-2 px-4 border-b">RWF {order.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}</td>
                <td className="py-2 px-4 border-b">{order.delivered ? "Yes" : "No"}</td>
                <td className="py-2 px-4 border-b capitalize">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No {activeTab} orders found.</p>
      )}
    </div>
  );
}
