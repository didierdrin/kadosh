import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Extra imports
import PrimaryNavbar from "@/components/primarynav";
import SecondaryNavbar from "@/components/secondarynav";
import FooterNavbar from "@/components/footernav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kadosh - Rwanda's best electronics shop",
  description: "Best computer shop in Rwanda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrimaryNavbar />
        <hr />
        <SecondaryNavbar />
        {children}
        <FooterNavbar />
        </body>
    </html>
  );
}
