"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/authprovider";
import { db } from "@/components/authprovider";
import { doc, onSnapshot } from "firebase/firestore";

interface Order {
  orderId: string;
  products: { name: string }[];
  qty: number;
  price: number;
  delivered: boolean;
  cancelled: boolean;
}

interface Notification {
  message: string;
  timestamp: Date;
}

export default function Notifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (user) {
      const userDocRef = doc(db, "client_data_new", user.uid);

      // Listen for changes in the specified fields
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();

          // Listen for recent orders
          const recentOrders: Order[] = data?.recent_orders || [];
          if (recentOrders.length > 0) {
            const lastRecentOrder = recentOrders[recentOrders.length - 1];
            const productName =
              lastRecentOrder.products?.length > 0
                ? lastRecentOrder.products[0].name
                : "No products listed";
            const recentOrderNotification: Notification = {
              message: `Order ${lastRecentOrder.orderId} for ${productName} has been purchased.`,
              timestamp: new Date(),
            };
            setNotifications((prev) => [...prev, recentOrderNotification]);
          }

          // Listen for pending orders
          const pendingOrders: Order[] = data?.pending_orders || [];
          console.log("_____________________________________");
          console.log(pendingOrders);
          if (pendingOrders.length > 0) {
            const lastPendingOrder = pendingOrders[pendingOrders.length - 1];
            const productName =
              lastPendingOrder.products?.length > 0
                ? lastPendingOrder.products[0].name
                : "No products listed";
            const pendingOrderNotification: Notification = {
              message: `Order ${lastPendingOrder.orderId} for ${productName} is pending.`,
              timestamp: new Date(),
            };
            setNotifications((prev) => [...prev, pendingOrderNotification]);
          }

          // Listen for cancelled orders
          const cancelledOrders: Order[] = data?.cancelled_orders || [];
          if (cancelledOrders.length > 0) {
            const lastCancelledOrder = cancelledOrders[cancelledOrders.length - 1];
            const productName =
              lastCancelledOrder.products?.length > 0
                ? lastCancelledOrder.products[0].name
                : "No products listed";
            const cancelledOrderNotification: Notification = {
              message: `Order ${lastCancelledOrder.orderId} for ${productName} has been cancelled.`,
              timestamp: new Date(),
            };
            setNotifications((prev) => [...prev, cancelledOrderNotification]);
          }

          // Listen for returned orders
          const returnedOrders: Order[] = data?.returned_orders || [];
          if (returnedOrders.length > 0) {
            const lastReturnedOrder = returnedOrders[returnedOrders.length - 1];
            const productName =
              lastReturnedOrder.products?.length > 0
                ? lastReturnedOrder.products[0].name
                : "No products listed";
            const returnedOrderNotification: Notification = {
              message: `Order ${lastReturnedOrder.orderId} for ${productName} has been returned.`,
              timestamp: new Date(),
            };
            setNotifications((prev) => [...prev, returnedOrderNotification]);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="container h-full pb-5 mx-auto">
      <h2 className="text-2xl font-bold mt-4 mb-4">Notifications</h2>
      
      {notifications.length > 0 ? (
        <ul className="bg-white shadow rounded p-4">
          {notifications.map((notification, index) => (
            <li key={index} className="mb-4 border-b pb-2">
              <p>{notification.message}</p>
              <span className="text-sm text-gray-500">
                {notification.timestamp.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-[200px]">
          <p>No notifications yet.</p>
        </div>
      )}
    </div>
  );
}

