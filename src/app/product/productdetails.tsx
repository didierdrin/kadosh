"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/components/authprovider";
import { FaShoppingCart, FaDollarSign, FaHeart } from "react-icons/fa";
import { db } from "@/components/authprovider";
import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  price: number;
  details: string;
  img: string[]; // img is an array of strings (URLs)
  manufacturer: string;
  model: string;
  category: string;
  qty: number;
}

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const productData = searchParams.get("data");

  const product: Product | null = productData 
    ? {
        ...JSON.parse(decodeURIComponent(productData)),
        img: decodeURIComponent(JSON.parse(decodeURIComponent(productData)).img).split(",") // Convert the string back to an array
      }
    : null;

  // State to track if the product is in the watchlist
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Set the first image as the main image
  const [mainImage, setMainImage] = useState<string>(product?.img[0] || "");

  useEffect(() => {
    const checkIfInWatchlist = async () => {
      if (user && product) {
        const userDocRef = doc(db, "client_data_new", user.uid);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data();
          setIsInWatchlist(userData.watchlist?.some((item: Product) => item.id === product.id) || false);
        }
      }
    };
    checkIfInWatchlist();
  }, [user, product]);

  if (!product) return <div className="text-center py-10">Product not found</div>;

  const handleAddToWatchlist = async () => {
    if (!user) {
      router.push("/auth");
    } else {
      try {
        const userDocRef = doc(db, "client_data_new", user.uid);
        const docSnap = await getDoc(userDocRef);

        const watchlistItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          details: product.details,
          img: product.img,
          manufacturer: product.manufacturer,
          model: product.model,
          category: product.category,
        };

        if (!docSnap.exists()) {
          await setDoc(userDocRef, { watchlist: [watchlistItem] });
        } else {
          await updateDoc(userDocRef, {
            watchlist: arrayUnion(watchlistItem),
          });
        }

        setIsInWatchlist(true); // Set watchlist status to true after adding
        console.log("Added to watchlist");
      } catch (error) {
        console.error("Error adding to watchlist: ", error);
      }
    }
  };
  
  

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/auth");
    } else {
      try {
        const userDocRef = doc(db, "client_data_new", user.uid);
        const docSnap = await getDoc(userDocRef);

        const newProduct = {
          id: product.id,
          name: product.name,
          price: product.price,
          details: product.details,
          img: product.img, // Storing the array
          manufacturer: product.manufacturer,
          model: product.model,
          category: product.category,
          qty: 1,
        };

        if (!docSnap.exists()) {
          await setDoc(userDocRef, { cart: [newProduct] });
        } else {
          await updateDoc(userDocRef, {
            cart: arrayUnion(newProduct),
          });
        }

        console.log("Added to cart");
        router.push("/cart");
      } catch (error) {
        console.error("Error adding to cart: ", error);
      }
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      router.push("/auth");
    } else {
      router.push(`/checkout?data=${encodeURIComponent(JSON.stringify(product))}`);
    }
  };

  

  const handleThumbnailClick = (imgUrl: string) => {
    setMainImage(imgUrl);
  };

  return (
    <div className="flex flex-wrap -mx-4">
      {/* Image section */}
      <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
        {/* Main image */}
        <Image
          src={mainImage}
          alt={product.name}
          width="1500"
          height="1500"
          className="w-full h-[500px] object-cover rounded-lg shadow-md"
        />

        {/* Thumbnails */}
        {product.img.length > 1 && (
          <div className="flex space-x-2 mt-4">
            {product.img.map((imgUrl, index) => (
              <Image
                key={index}
                src={imgUrl}
                height="500"
                width="500"
                alt={`${product.name}-${index}`}
                className={`w-20 h-20 object-cover cursor-pointer rounded ${
                  imgUrl === mainImage ? "border-2 border-blue-500" : "border"
                }`}
                onClick={() => handleThumbnailClick(imgUrl)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product details section */}
      <div className="w-full md:w-1/2 px-4">
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        <p className="text-lg text-blue-600 mb-4">
          RWF {product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Product Details</h2>
          <p className="text-gray-700">{product.details}</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Specifications</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Manufacturer: {product.manufacturer}</li>
            <li>Model: {product.model}</li>
            <li>Category: {product.category}</li>
            <li>Available Quantity: {product.qty}</li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
        <button
            onClick={handleAddToWatchlist}
            className="text-slate-600 bg-white border border-black rounded-xl p-2 hover:text-red-700 transition duration-300 ease-in-out transform hover:scale-110 relative"
          >
            <FaHeart size={24} />
            {isInWatchlist && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                
              </span>
            )}
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <FaShoppingCart className="mr-2" /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
          >
            <FaDollarSign className="mr-2" /> Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
