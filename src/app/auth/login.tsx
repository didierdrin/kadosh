"use client";
import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/components/authprovider";
import { setCookie } from "cookies-next";
import { useAuth } from "@/components/authprovider";
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ setIsLogin }: { setIsLogin: (isLogin: boolean) => void; }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const navigatetoForgotpassword = () => {
    router.push("/forgotpassword");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
      login(email, password);
    } catch (err) {
      setError("Failed to log in. Please check your email/password.");
      console.error(err);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week
      router.push("/home");
    } catch (error) {
      setError("Failed to log in with Google. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Login Section */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6 md:mb-8">
          Welcome!
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              placeholder="e.g: xyz@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <div className="flex justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="text-center text-xs">
                <button onClick={navigatetoForgotpassword} className="text-blue-600 hover:underline">
                  Forgot password?
                </button>
              </div>
            </div>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="e.g: companyXYZ098P!"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Log In
          </button>
        </form>
        <div className="text-center mt-4">
          <button onClick={() => setIsLogin(false)} className="text-blue-600 hover:underline">
            Don’t have an account? Sign Up
          </button>
        </div>
        <div className="text-center mt-4">
          <hr className="mb-4 border-t border-slate-200 border-0 h-px bg-slate-500" />
          <button onClick={handleGoogleSignIn} className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300">
            Continue with Google
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      {/* <div className="hidden md:flex w-1/2 m-8 rounded-sm bg-blue-500 text-white p-12 flex-col justify-between"> */}
      <div 
  className="hidden md:flex w-1/2 m-8 rounded-sm text-white p-12 flex-col justify-between bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/bgimg.png')" }}
>
        <div>
          <h1 className="text-4xl font-bold mb-4">Kadosh</h1>
          <p className="text-xl mb-8">Durable electronics</p>
        </div>
        <div className="space-y-4">
          <p className="text-sm">Discover amazing deals, shop with ease, and elevate your office with Kadosh</p>
          <p className="text-xs opacity-75">Join thousands of users who have already trusted Kadosh.</p>
        </div>
      </div>
    </div>
  );
}
