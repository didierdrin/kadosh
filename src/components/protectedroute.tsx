"use client";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./authprovider";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
        <div className="animate-pulse">
          <FaShoppingCart
            className="text-sky-600 animate-cart-scale"
            size={64}
          />
        </div>
        <p className="mt-4 text-lg font-semibold text-gray-700">
          Loading Kadosh...
        </p>
      </div>
    );
  }

  return user ? <>{children}</> : null;
}
