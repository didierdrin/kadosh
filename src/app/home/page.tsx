'use client';
// home page
// importing page contents
import Allproducts from "@/components/allproducts";
import Explorecategories from "@/components/explorecategories";
import Browse from '@/components/browse';
import SlideshowNavbar from "@/components/slideshownav";
import ErrorBoundaryWrapper from './errorboundarywrapper';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <ErrorBoundaryWrapper>
        <SlideshowNavbar />
      </ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper>
        <Allproducts />
      </ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper>
        <Explorecategories />
      </ErrorBoundaryWrapper>
      <ErrorBoundaryWrapper>
        <Browse />
      </ErrorBoundaryWrapper>
    </main>
  );
}