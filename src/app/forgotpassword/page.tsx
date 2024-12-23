'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
      // Call the backend to generate the password reset link and send the custom email
      await fetch("/api/resetapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
        }),
      });

      setSuccess("A password reset link has been sent to your email.");
    } catch (err) {
      setError("Failed to send password reset link. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
      <Link 
      onClick={() => {window.location.href = "/auth";}}
        href="/auth"
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to login
      </Link>
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
          Forgot your password?<br /><strong>Don&apos;t panic.</strong>
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
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
            Get a password reset link
          </button>
        </form>
      </div>
      <div className="hidden md:flex w-1/2 m-8 rounded-sm bg-blue-500 text-white p-12 flex-col justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-4">Shamayim</h1>
          <p className="text-xl mb-8">Durable electronics</p>
        </div>
        <div className="space-y-4">
          <p className="text-lg">
            Discover amazing deals, shop with ease, and elevate your office with Shamayim.
          </p>
          <p className="text-sm opacity-75">
            Join thousands of users who have already trusted Shamayim.
          </p>
        </div>
      </div>
    </div>
  );
}

