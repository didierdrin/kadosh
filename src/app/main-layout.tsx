"use client";
import React, { useState } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import PrimaryNavbar from "@/components/primarynav";
import SecondaryNavbar from "@/components/secondarynav";
import FooterNavbar from "@/components/footernav";
import BackToTop from "@/components/backtotop";
import StripNavbar from "@/components/stripnavbar"; 
import { AuthProvider } from "../components/authprovider";
import { useProducts } from '@/components/useproducts'; // Assuming you have a custom hook for Firestore products

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kadosh - Rwanda's best electronics shop",
  description: "Best computer shop in Rwanda",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { products, loading, error } = useProducts({
    searchTerm,
    selectedCategory,
  });

  const handleSearchSubmit = (term: string, category: string) => {
    setSearchTerm(term);
    setSelectedCategory(category);
  };
  return (
    <div className={inter.className}>
      <AuthProvider>
        {!isHomePage && (
          <>
            <PrimaryNavbar />
            <hr />
            <SecondaryNavbar onSearchSubmit={handleSearchSubmit} />
            <StripNavbar /> 
          </>
        )}
        {children}
        {!isHomePage && (
          <>
            <BackToTop />
            <FooterNavbar />
          </>
        )}
      </AuthProvider>
    </div>
  );
}
