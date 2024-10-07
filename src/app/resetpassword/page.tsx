"use client";
import React, { useState } from "react";
import { auth } from "@/components/authprovider";
import { confirmPasswordReset } from "firebase/auth";
import { useRouter } from "next/router";

export default function ResetPassword() {
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate that passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Confirm the password reset using the verification code and new password
      await confirmPasswordReset(auth, verificationCode, newPassword);

      setSuccess("Your password has been successfully reset.");
      router.push("/login"); // Redirect to login after success
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Reset password section */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
          Reset your password
          <br />
          <strong>Don&apos;t panic.</strong>
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
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Reset Password
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