import React from "react";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shamayim - Authentication",
  description: "Login or register for Shamayim",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      {children}
    </main>
  );
}
