"use client";
import React from "react";
import { FaEnvelope } from "react-icons/fa"; // Importing the envelope icon
import { useRouter } from "next/navigation";

const MessageIconButton = () => {
  const router = useRouter(); 

  const handleClick = () => {
    // Add functionality here if you want it to open a chat, redirect, etc.
    console.log("Message icon clicked!");
    router.push("/messages");
  };

  return (
    <div 
      className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition-colors duration-300"
      onClick={handleClick}
      style={{ zIndex: 1000 }} // Ensure the button is on top
    >
      <FaEnvelope className="text-xl" /> {/* Centered Envelope Icon */}
    </div>
  );
};

export default MessageIconButton;
