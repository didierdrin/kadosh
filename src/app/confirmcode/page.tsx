"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";

export default function ConfirmCode() {
  const [verificationCode, setVerificationCode] = useState("");  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const userEmail = searchParams.get("email"); // Get email from query params

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!userEmail) {
      setError("Email not provided. Please go back and enter your email.");
      return;
    }

    try {
      const db = getFirestore();
      
      // Query Firestore to find the correct verification code based on the user's email
      const q = query(
        collection(db, "verification_code"),
        where("email", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Retrieve the code from Firestore
        const verificationDoc = querySnapshot.docs[0].data(); // Get the first matching document
        const storedCode = verificationDoc.code;

        // Compare the entered code with the stored code
        if (verificationCode === storedCode) {
          setSuccess("Verification successful. Redirecting to reset password...");
          setTimeout(() => {
            router.push("/resetpassword"); // Redirect to the reset password page
          }, 2000);
        } else {
          setError("Invalid verification code. Please try again.");
        }
      } else {
        setError("No verification code found for the provided email.");
      }
    } catch (err) {
      setError("Failed to verify the code. Please try again.");
      console.error("Verification error: ", err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
          Verification Code
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="verificationCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="verificationCode"
              placeholder="Enter the verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Confirm code
          </button>
        </form>
      </div>
      <div className="hidden md:flex w-1/2 m-8 rounded-sm bg-blue-500 text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">Kadosh</h1>
          <p className="text-xl mb-8">Durable electronics</p>
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            Discover amazing deals, shop with ease, and elevate your office with Kadosh
          </p>
          <p className="text-sm opacity-75">
            Join thousands of users who have already trusted Kadosh.
          </p>
        </div>
      </div>
    </div>
  );
}

