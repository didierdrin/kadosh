"use client";
import React, { useState } from 'react';
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { Raleway } from "next/font/google"; // Import Raleway font
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

const raleway = Raleway({ subsets: ["latin"] });

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
  };

  return (
    <div className={raleway.className}> {/* Apply Raleway font globally */}
      <AuthProvider>
        {!isHomePage && (
          <>
            <PrimaryNavbar />
            <hr />
            <SecondaryNavbar />
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
