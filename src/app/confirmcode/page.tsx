"use client";
import React, { useState } from "react";
import { auth } from "@/components/authprovider";
import { confirmPasswordReset } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function ConfirmCode() {
  const [verificationCode, setVerificationCode] = useState("");
  
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate that passwords match
    if (verificationCode !== verificationCode) {
      setError("Passwords do not match.");
      return;
    }

    try {
      
      setSuccess("Your password has been successfully reset.");
      router.push("/resetpassword"); // Redirect to login after success
    } catch (err) {
      setError("Failed the verification code is wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Confirm verification code section */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
          Verification Code
          {/* <br />
          <strong>Don&apos;t panic.</strong> */}
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
