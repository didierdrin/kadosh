"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/authprovider";
import { db } from "@/components/authprovider";
import { doc, onSnapshot } from "firebase/firestore";

interface Order {
  orderId: string;
  productName: string;
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
      const userDocRef = doc(
        db,
        "users",
        "qWE5sgjt0RRhtHDqwciu",
        "client_data",
        user.uid
      );

      // Listen for changes in the 'recent_orders' field
      const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          const recentOrders: Order[] = data?.recent_orders || [];

          if (recentOrders.length > 0) {
            const lastOrder = recentOrders[recentOrders.length - 1];

            // Add a new notification for the most recent order
            const newNotification: Notification = {
              message: `Order ${lastOrder.orderId} for ${lastOrder.productName} has been purchased.`,
              timestamp: new Date(),
            };

            setNotifications((prev) => [...prev, newNotification]);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Notifications</h2>
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
        <p>No notifications yet.</p>
      )}
    </div>
  );
}
