import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "@/components/authprovider";
import { db } from "@/components/authprovider";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  id?: number;
  img: string[];
  name: string;
  manufacturer: string;
  model: string;
  qty: number;
  price: number;
  category: string;
  details: string;
}

interface ProductCardProps {
  product: Product;
  discountPercentage?: any;
}

export default function ProductCard({
  product,
  discountPercentage,
}: ProductCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const checkIfInCart = async () => {
      if (user) {
        const userDocRef = doc(db, "client_data_new", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setIsInCart(
            userData.cart?.some((item: Product) => item.id === product.id) ||
              false
          );
        }
      }
    };
    checkIfInCart();
  }, [user, product.id]);

  const handleAddToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent the click from bubbling up to the Link component
    if (!user) {
      router.push("/auth");
    } else {
      try {
        const userDocRef = doc(db, "client_data_new", user.uid);
        const docSnap = await getDoc(userDocRef);

        const newProduct = {
          ...product,
          qty: 1, // Set initial quantity to 1
        };

        if (!docSnap.exists()) {
          await setDoc(userDocRef, { cart: [newProduct] });
        } else {
          await updateDoc(userDocRef, {
            cart: arrayUnion(newProduct),
          });
        }

        setIsInCart(true);
        console.log("Added to cart");
        // Optionally, you can redirect to the cart page here
        // router.push("/cart");
      } catch (error) {
        console.error("Error adding to cart: ", error);
      }
    }
  };

  function commafy(num: number): string {
    return num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  }

  return (
    <div className="flex flex-col w-[270px] bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Product image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={product.img[0]}
          alt={product.name}
          width={1500}
          height={1500}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        {discountPercentage && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {discountPercentage}% OFF
          </div>
        )}
      </div>
      {/* Product description */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        <div className="flex justify-between items-center">
          <p className="text-sm font-bold text-blue-600">
            RWF {commafy(product.price)}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-black transition-colors duration-300 relative"
          >
            <FaShoppingCart className="text-lg" />
            {isInCart && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              
            </span>
           
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

