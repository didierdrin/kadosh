import React from "react";
import { Inter } from "next/font/google";
import FooterNavbar from "@/components/footernav";
import BackToTop from "@/components/backtotop";
import { Metadata } from "next";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shamayim - About us",
  description: "Best electronics store in Kigali",
};

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      {children}
      <BackToTop />
      <FooterNavbar />
    </main>
  );
}
