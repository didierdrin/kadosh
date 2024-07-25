"use client";
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

  return (
    <div className={inter.className}>
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
            <BackToTop />
            <FooterNavbar />
          </>
        )}
      </AuthProvider>
    </div>
  );
}
