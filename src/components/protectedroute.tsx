"use client";
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

  useEffect(() => {
    if (loading) {
      document.title = "Loading Shamayim..."; // Update the title when loading
    } else {
      document.title = "Shamayim"; // Restore the title when loading is done
    }
  }, [loading]);

  if (loading) {
    return null; // Do not display anything in the body during loading
  }

  return user ? <>{children}</> : null;
}



// "use client";
// import { FaShoppingCart } from "react-icons/fa";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "./authprovider";

// export function ProtectedRoute({ children }: { children: React.ReactNode }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth");
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return (
//       <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100">
//         <div className="animate-pulse">
//           <FaShoppingCart
//             className="text-sky-600 animate-cart-scale"
//             size={64}
//           />
//         </div>
//         <p className="mt-4 text-lg font-semibold text-gray-700">
//           Loading Shamayim...
//         </p>
//       </div>
//     );
//   }

//   return user ? <>{children}</> : null;
// }
