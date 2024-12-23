"use client";

import { useState, useEffect } from "react";
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


export default function PurchaseHistory() {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recent orders for the logged-in user
    const fetchRecentOrders = async () => {
      if (user) {
        try {
          const userDocRef = doc(db, "client_data_new", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            const data = docSnap.data();

            // Suppose data.recent_orders is an array of Orders, each with "products" array
            if (data.recent_orders) {
              setRecentOrders(data.recent_orders);
            } else {
              console.log("No recent orders found.");
            }
          } else {
            console.error("User document not found");
          }
        } catch (error) {
          console.error("Error fetching recent orders:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchRecentOrders();
  }, [user]);

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mt-4 mb-4">Purchase History</h2>
      {recentOrders.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Delivered</th>
              <th className="py-2 px-4 border-b">Cancelled</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => {
              // Nested map: each order can have multiple products
              return order.products.map((product, index) => {
                // If you want order info (Order ID, Delivered, Cancelled) 
                // to appear only once per order (on the first product row), 
                // you can do something like:
                const isFirstProduct = index === 0;

                return (
                  <tr key={`${order.orderId}-${index}`}>
                    <td className="py-2 px-4 border-b">
                      {isFirstProduct ? order.orderId : ""}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {product.name || "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">{product.qty || 0}</td>
                    <td className="py-2 px-4 border-b">
                      RWF{" "}
                      {product.price
                        ? product.price.toLocaleString()
                        : "N/A"}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {isFirstProduct ? (order.delivered ? "Yes" : "No") : ""}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {isFirstProduct ? (order.cancelled ? "Yes" : "No") : ""}
                    </td>
                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      ) : (
        <div className="h-[200px]">
          <p>No recent orders found.</p>
        </div>
      )}
    </div>
  );
}


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
//   delivered: boolean;
//   cancelled: boolean;
// }

// export default function PurchaseHistory() {
//   const { user } = useAuth();
//   const [recentOrders, setRecentOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch recent orders for the logged-in user
//     const fetchRecentOrders = async () => {
//       if (user) {
//         try {
//           const userDocRef = doc(db, "client_data_new", user.uid);
//           const docSnap = await getDoc(userDocRef);
//           if (docSnap.exists()) {
//             const data = docSnap.data();
//             if (data.recent_orders) {
//               setRecentOrders(data.recent_orders);
//             } else {
//               console.log("No recent orders found.");
//             }
//           } else {
//             console.error("User document not found");
//           }
//         } catch (error) {
//           console.error("Error fetching recent orders:", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//     };

//     fetchRecentOrders();
//   }, [user]);

//   if (loading) {
//     return <div className="h-[300px] flex items-center justify-center ">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto">
//       <h2 className="text-2xl font-bold mt-4 mb-4">Purchase History</h2>
//       {recentOrders.length > 0 ? (
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b">Order ID</th>
//               <th className="py-2 px-4 border-b">Product Name</th>
//               <th className="py-2 px-4 border-b">Quantity</th>
//               <th className="py-2 px-4 border-b">Price</th>
//               <th className="py-2 px-4 border-b">Delivered</th>
//               <th className="py-2 px-4 border-b">Cancelled</th>
//             </tr>
//           </thead>
//           <tbody>
//             {recentOrders.map((order) => (
//               <tr key={order.orderId}>
//                 <td className="py-2 px-4 border-b">{order.orderId}</td>
//                 <td className="py-2 px-4 border-b">{order.productName}</td>
//                 <td className="py-2 px-4 border-b">{order.qty}</td>
//                 <td className="py-2 px-4 border-b">RWF {order.price}</td>
//                 <td className="py-2 px-4 border-b">
//                   {order.delivered ? "Yes" : "No"}
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   {order.cancelled ? "Yes" : "No"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="h-[200px]">
//           <p>No recent orders found.</p>

//         </div> 
//               )}
//     </div>
//   );
// }
