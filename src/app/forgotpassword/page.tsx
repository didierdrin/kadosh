'use client';
import React, { useState } from "react";
import { auth } from "@/components/authprovider";
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const db = getFirestore(); // Initialize Firestore

      // Generate a unique verification code
      const verificationCode = uuidv4().slice(0, 6).toUpperCase();

      // Add the verification code to Firestore
      await addDoc(collection(db, "verification_code"), {
        email: email,
        code: verificationCode,
        createdAt: new Date(),
      });

      // Send the verification code via email
      await fetch("/api/verificationapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          verificationCode: verificationCode,
        }),
      });

      router.push('/resetpassword');

      setSuccess("Verification code sent to your email.");
    } catch (err) {
      setError("Failed to send verification code. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Forgot password section */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
          Forgot your password?<br /><strong>Don&apos;t panic.</strong>
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="e.g: xyz@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Get a verification code
          </button>
        </form>
      </div>
       {/* Welcome Section */}
       <div className="hidden md:flex w-1/2 m-8 rounded-sm bg-blue-500 text-white p-12 flex-col justify-between">
         <div>
           <h1 className="text-4xl font-bold mb-4">Kadosh</h1>
           <p className="text-xl mb-8">Durable electronics</p>
         </div>
         <div className="space-y-4">
           <p className="text-lg">
             Discover amazing deals, shop with ease, and elevate your office with
             Kadosh
           </p>
           <p className="text-sm opacity-75">
             Join thousands of users who have already trusted Kadosh.
           </p>
         </div>
       </div>
    </div>
  );
}



// "use client";
// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/components/authprovider";
// import { setCookie } from "cookies-next";
// import { useAuth } from "@/components/authprovider";
// import { Router } from "next/router";
// import { useRouter } from "next/navigation";

// export default function ForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const router = useRouter();


//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const token = await userCredential.user.getIdToken();
//       setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
//       login(email, password);
//     } catch (err) {
//       setError("Failed to log in. Please check your email/password.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       {/* Login Section */}
//       <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
//         <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
//           Forgot your password?<br /><strong>Don't panic.</strong>
//         </h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               placeholder="e.g: xyz@company.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
         
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Get a verification code
//           </button>
//         </form>
//         <div className="text-center mt-4">
//           <a href="/auth" className="text-blue-600 hover:underline">
//             Already have an account? Sign in
//           </a>
//         </div>
//       </div>

//       {/* Welcome Section */}
//       <div className="hidden md:flex w-1/2 m-8 rounded-sm bg-blue-500 text-white p-12 flex-col justify-between">
//         <div>
//           <h1 className="text-4xl font-bold mb-4">Kadosh</h1>
//           <p className="text-xl mb-8">Durable electronics</p>
//         </div>
//         <div className="space-y-4">
//           <p className="text-lg">
//             Discover amazing deals, shop with ease, and elevate your office with
//             Kadosh
//           </p>
//           <p className="text-sm opacity-75">
//             Join thousands of users who have already trusted Kadosh.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }