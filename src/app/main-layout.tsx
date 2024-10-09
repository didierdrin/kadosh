"use client";
import React, { useState } from 'react';
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import PrimaryNavbar from "@/components/primarynav";
import SecondaryNavbar from "@/components/secondarynav";
import FooterNavbar from "@/components/footernav";
import BackToTop from "@/components/backtotop";
import StripNavbar from "@/components/stripnavbar"; 
import { AuthProvider } from "../components/authprovider";
import { useProducts } from '@/components/useproducts'; // Assuming you have a custom hook for Firestore products
import "./globals.css";
import MessageIconButton from  "@/components/messageiconbutton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kadosh - Rwanda's best electronics shop",
  description: "Best computer shop in Rwanda",
};


export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { products, loading, error } = useProducts({
    searchTerm,
    selectedCategory,
  });

  

const router = useRouter(); 
const handleCategorySelect = (category: string) => {
  setSelectedCategory(category); 
  router.push("/seeall");
  //setSearchTerm('');  // If you want to clear the search term when a category is selected
};


  return (
    <div>
      <AuthProvider>
        {!isHomePage && (
          <>
            <PrimaryNavbar />
            <hr />
            <SecondaryNavbar />
            {/* Pass handleSearchSubmit to StripNavbar */}
            <StripNavbar />
          </>
        )}
        {children}
        {!isHomePage && (
          <>
            <MessageIconButton />
            <BackToTop />
            <FooterNavbar />
          </>
        )}
      </AuthProvider>
    </div>
  );
}
