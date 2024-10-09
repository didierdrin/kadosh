"use client";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/components/authprovider";
import { setCookie } from "cookies-next";
import { useAuth } from "@/components/authprovider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Import Firestore

const firestore = getFirestore(); // Initialize Firestore

export default function Signup({
  setIsLogin,
}: {
  setIsLogin: (isLogin: boolean) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  const sendSignupEmail = async (email: string) => {
    try {
      await fetch("/api/emailapi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: email,
          params: { name: `${firstName} ${lastName}` }, // Using the full name
        }),
      });
    } catch (err) {
      console.error("Error sending signup email", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!termsAccepted) {
      setError("You must accept the terms and policies.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await userCredential.user.getIdToken();
      setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week

      // Send a welcome email after signup
      await sendSignupEmail(email);

      // Automatically log the user in after signup
      login(email, password);

      // Store first name, last name, and email in Firestore under customer_info
      const userDocRef = doc(firestore, "client_data_new", userCredential.user.uid);
      await setDoc(
        userDocRef,
        {
          customer_info: {
            firstName: firstName,
            lastName: lastName,
            email: email,
          },
        },
        { merge: true }
      );
    } catch (err) {
      setError("Failed to create an account. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Signup Section */}
      <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
        <h2 className="text-2xl mt-[120px] md:text-3xl font-semibold mb-6 md:mb-8">
          Create Account
        </h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="Roger"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Murray"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
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
          <div className="relative w-full">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="e.g: companyXYZ098P!"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 pt-6 right-0 px-3 flex items-center focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <div className="relative w-full">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="e.g: companyXYZ098P!"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="form-checkbox"
              />
              <span className="ml-2 text-sm">
                I accept the terms and policies
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLogin(true)}
            className="text-blue-600 hover:underline"
          >
            Already have an account? Log In
          </button>
        </div>
        <br />
      </div>

      {/* Welcome Section */}
      <div 
        className="hidden md:flex w-1/2 m-8 rounded-sm text-white p-12 flex-col justify-between bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bgimg.png')" }}
      >
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
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@/components/authprovider";
// import { setCookie } from "cookies-next";
// import { useAuth } from "@/components/authprovider";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// export default function Signup({
//   setIsLogin,
// }: {
//   setIsLogin: (isLogin: boolean) => void;
// }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [error, setError] = useState("");
//   const { login } = useAuth();

//   const sendSignupEmail = async (email: string) => {
//     try {
//       await fetch("/api/emailapi", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           to: email,
//           params: { name: `${firstName} ${lastName}` }, // Using the full name
//         }),
//       });
//     } catch (err) {
//       console.error("Error sending signup email", err);
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match.");
//       return;
//     }

//     if (!termsAccepted) {
//       setError("You must accept the terms and policies.");
//       return;
//     }

//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const token = await userCredential.user.getIdToken();
//       setCookie("auth_token", token, { maxAge: 60 * 60 * 24 * 7 }); // 1 week

//       // Send a welcome email after signup
//       await sendSignupEmail(email);

//       // Automatically log the user in after signup
//       login(email, password);
//     } catch (err) {
//       setError("Failed to create an account. Please try again.");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row h-screen bg-gray-100">
//       {/* Signup Section */}
//       <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
//         <h2 className="text-2xl mt-[120px] md:text-3xl font-semibold mb-6 md:mb-8">
//           Create Account
//         </h2>
//         {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label
//               htmlFor="firstName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               First Name
//             </label>
//             <input
//               type="text"
//               id="firstName"
//               placeholder="Roger"
//               value={firstName}
//               onChange={(e) => setFirstName(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="lastName"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Last Name
//             </label>
//             <input
//               type="text"
//               id="lastName"
//               placeholder="Murray"
//               value={lastName}
//               onChange={(e) => setLastName(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
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
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//           </div>
//           <div className="relative w-full">
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700 mb-1"
//             >
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="password"
//               placeholder="e.g: companyXYZ098P!"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 pt-6 right-0 px-3 flex items-center focus:outline-none"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
//           <div className="relative w-full">
//             <label
//               htmlFor="confirmPassword"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Confirm Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               id="confirmPassword"
//               placeholder="e.g: companyXYZ098P!"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//             />
//             {/* <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button> */}
//           </div>
//           <div>
//             <label className="inline-flex items-center">
//               <input
//                 type="checkbox"
//                 checked={termsAccepted}
//                 onChange={(e) => setTermsAccepted(e.target.checked)}
//                 className="form-checkbox"
//               />
//               <span className="ml-2 text-sm">
//                 I accept the terms and policies
//               </span>
//             </label>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             Sign Up
//           </button>
//         </form>
//         <div className="text-center mt-4">
//           <button
//             onClick={() => setIsLogin(true)}
//             className="text-blue-600 hover:underline"
//           >
//             Already have an account? Log In
//           </button>
//         </div>
//         <br />
//       </div>

//       {/* Welcome Section */}
//       {/* <div className="hidden md:flex w-1/2 m-8 rounded-sm bg-blue-500 text-white p-12 flex-col justify-between"> */}
//       <div 
//   className="hidden md:flex w-1/2 m-8 rounded-sm text-white p-12 flex-col justify-between bg-cover bg-center bg-no-repeat"
//   style={{ backgroundImage: "url('/bgimg.png')" }}
// >
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
