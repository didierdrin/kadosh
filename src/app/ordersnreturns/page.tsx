"use client";
import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/components/authprovider";
import { db } from "@/components/authprovider";


// Define the shapes of your data
interface Product {
  id?: number;
  img: string[]; // Updated to array of images
  name: string;
  manufacturer: string;
  model: string;
  qty: number;
  price: number;
  category: string;
  details: string;
}

interface Order {
  orderId: string;
  createTime: string;
  delivered: boolean;
  cancelled: boolean;
  products: Array<{
    id: number;
    name: string;
    price: number;
    qty: number;
  }>;
  shippingDetails: {
    address: string;
    city: string;
    email: string;
    fullName: string;
    zipCode: string;
  };
  total: number;
  userId: string;
}

// For demonstration, we assume user has at least uid
// In a real app, you might fetch this from context or a custom hook


function OrdersAndReturnsPage() {
  const [loading, setLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);
  const [cancelledOrders, setCancelledOrders] = useState([]);
  const [returnedOrders, setReturnedOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");

  // Example user from context/auth
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "client_data_new", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setPendingOrders(data.pending_orders || []);
            setCancelledOrders(data.cancelled_orders || []);
            setReturnedOrders(data.returned_orders || []);
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

  if (loading) {
    return <div className="h-[300px] flex items-center justify-center">Loading...</div>;
  }

  // Determine which set of orders to display
  let filteredOrders: Order[] = [];
  switch (activeTab) {
    case "pending":
      filteredOrders = pendingOrders;
      break;
    case "cancelled":
      filteredOrders = cancelledOrders;
      break;
    case "returned":
      filteredOrders = returnedOrders;
      break;
    default:
      filteredOrders = [];
      break;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
      <h2 className="text-2xl font-bold mb-6">Orders & Returns</h2>
      <a href="/purchasehistory" className="block  px-4 py-4 text-sm text-gray-700 hover:text-red-500 hover:underline" role="menuitem">Purchase History</a>
      </div>
      {/* Tab Bar */}
      <div className="flex space-x-6 mb-6 border-b">
        <button
          className={`text-lg pb-2 ${
            activeTab === "pending" ? "border-b-4 border-blue-600" : ""
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending
        </button>
        <button
          className={`text-lg pb-2 ${
            activeTab === "cancelled" ? "border-b-4 border-blue-600" : ""
          }`}
          onClick={() => setActiveTab("cancelled")}
        >
          Cancelled
        </button>
        <button
          className={`text-lg pb-2 ${
            activeTab === "returned" ? "border-b-4 border-blue-600" : ""
          }`}
          onClick={() => setActiveTab("returned")}
        >
          Returned
        </button>
      </div>

      {/* Orders Table */}
      {filteredOrders && filteredOrders.length > 0 ? (
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
            {/* For each order, map over its products */}
            {filteredOrders.map((order) => {
              // If an order has multiple products, we'll create multiple rows.
              // We'll show 'orderId' and 'delivered' only in the first row of each order.
              return order.products.map((product, productIndex) => {
                const isFirstProduct = productIndex === 0;

                // Derive a simpler 'status' if needed. You can modify as desired.
                // E.g. "pending", "delivered", or "cancelled".
                // If not needed, just remove or display directly from order.
                let derivedStatus = "Pending";
                if (order.cancelled) derivedStatus = "Cancelled";
                if (order.delivered) derivedStatus = "Delivered";

                return (
                  <tr key={`${order.orderId}-${product.id}-${productIndex}`}>
                    {/* Show orderId only in the first row for that order */}
                    <td className="py-2 px-4 border-b">
                      {isFirstProduct ? order.orderId : ""}
                    </td>

                    <td className="py-2 px-4 border-b">
                      {product.name || "N/A"}
                    </td>

                    <td className="py-2 px-4 border-b">
                      {product.qty ?? "N/A"}
                    </td>

                    <td className="py-2 px-4 border-b">
                      {product.price
                        ? "RWF " +
                          product.price
                            .toFixed(2)
                            .replace(/\d(?=(\d{3})+\.)/g, "$&,")
                        : "RWF N/A"}
                    </td>

                    {/* Show 'delivered' only in the first row for that order */}
                    <td className="py-2 px-4 border-b">
                      {isFirstProduct ? (order.delivered ? "Yes" : "No") : ""}
                    </td>

                    <td className="py-2 px-4 border-b capitalize">
                      {isFirstProduct ? derivedStatus : ""}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      ) : (
        <p>No {activeTab} orders found.</p>
      )}
    </div>
  );
}

export default OrdersAndReturnsPage;


// // 

// "use client";
// import { useState, useEffect } from "react";
// import { useAuth } from "@/components/authprovider";
// import { db } from "@/components/authprovider";
// import { doc, getDoc } from "firebase/firestore";

// interface Order {
//   orderId: string;
//   productName: string;
//   qty: number;
//   price: number;
//   status: 'pending' | 'cancelled' | 'returned';
//   delivered: boolean;
// }

// export default function OrdersAndReturns() {
//   const { user } = useAuth();
//   const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
//   const [cancelledOrders, setCancelledOrders] = useState<Order[]>([]);
//   const [returnedOrders, setReturnedOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState<'pending' | 'cancelled' | 'returned'>('pending');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       if (user) {
//         try {
//           const userDocRef = doc(db, "client_data_new", user.uid);
//           const docSnap = await getDoc(userDocRef);

//           if (docSnap.exists()) {
//             const data = docSnap.data();

//             // Set each order type based on existing data, defaulting to empty arrays if undefined
//             setPendingOrders(data.pending_orders || []);
//             setCancelledOrders(data.cancelled_orders || []);
//             setReturnedOrders(data.returned_orders || []);
//           } else {
//             console.error("User document not found");
//           }
//         } catch (error) {
//           console.error("Error fetching orders:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchOrders();
//   }, [user]);

//   // Filtered orders based on active tab
//   const filteredOrders = activeTab === 'pending'
//     ? pendingOrders
//     : activeTab === 'cancelled'
//     ? cancelledOrders
//     : returnedOrders;

//   if (loading) {
//     return <div className="h-[300px] flex items-center justify-center">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6">Orders & Returns</h2>

//       {/* Tab Bar */}
//       <div className="flex space-x-6 mb-6 border-b">
//         <button
//           className={`text-lg pb-2 ${activeTab === 'pending' ? 'border-b-4 border-blue-600' : ''}`}
//           onClick={() => setActiveTab('pending')}
//         >
//           Pending
//         </button>
//         <button
//           className={`text-lg pb-2 ${activeTab === 'cancelled' ? 'border-b-4 border-blue-600' : ''}`}
//           onClick={() => setActiveTab('cancelled')}
//         >
//           Cancelled
//         </button>
//         <button
//           className={`text-lg pb-2 ${activeTab === 'returned' ? 'border-b-4 border-blue-600' : ''}`}
//           onClick={() => setActiveTab('returned')}
//         >
//           Returned
//         </button>
//       </div>

//       {/* Orders Table */}
//       {filteredOrders.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Order ID</th>
//               <th className="py-2 px-4 border-b">Product Name</th>
//               <th className="py-2 px-4 border-b">Quantity</th>
//               <th className="py-2 px-4 border-b">Price</th>
//               <th className="py-2 px-4 border-b">Delivered</th>
//               <th className="py-2 px-4 border-b">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredOrders.map((order) => (
//               <tr key={order.orderId}>
//                 <td className="py-2 px-4 border-b">{order.orderId}</td>
//                 <td className="py-2 px-4 border-b">{order.productName}</td>
//                 <td className="py-2 px-4 border-b">{order.qty}</td>
//                 <td className="py-2 px-4 border-b">RWF {order.price? order.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : "N/A"}</td>
//                 <td className="py-2 px-4 border-b">{order.delivered ? "Yes" : "No"}</td>
//                 <td className="py-2 px-4 border-b capitalize">{order.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No {activeTab} orders found.</p>
//       )}
//     </div>
//   );
// }

