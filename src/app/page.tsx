// home page
import Image from "next/image";
// importing page contents
import Allproducts from "@/components/allproducts";
import Explorecategories from "@/components/explorecategories";
import Browse from '@/components/browse';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-10">
      <Allproducts />
      <Explorecategories />
      <Browse />
    </main>
  );
}
