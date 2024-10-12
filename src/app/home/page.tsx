'use client';
// home page
// importing page contents
import Allproducts from "@/components/allproducts";
import Explorecategories from "@/components/explorecategories";
import Browse from '@/components/browse';
import SlideshowNavbar from "@/components/slideshownav";
import ErrorBoundaryWrapper from './errorboundarywrapper';
import Carousel from "@/components/carousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <ErrorBoundaryWrapper>
        {/* Carousel Section */}
        <Carousel />
      </ErrorBoundaryWrapper>
      <div className="p-10">
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
      </div>
    </main>
  );
}