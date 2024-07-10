'use client';
import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';
import { auth } from '../../firebaseConfig';

interface Product {
    id?: number;
    img: string; 
    name: string; 
    manufacturer: string; 
    model: string,
    qty: number; 
    price: number; 
    category: string; 
    details: string; 
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const db = getFirestore();
        // Get the "users" collection
        const usersCollection = collection(db, 'users');
        // Get the specific user document (assuming there's only one or you know its ID)
        const userDoc = doc(usersCollection, 'qWE5sgjt0RRhtHDqwciu');
        // Get the "seller_data" subcollection
        const sellerDataCollection = collection(userDoc, 'seller_data');
        // Get the specific document in "seller_data" (assuming there's only one or you know its ID)
        const sellerDataDoc = doc(sellerDataCollection, 'Aa8DJ0GHYuhpI1Tt861e');
        
        const sellerDataSnapshot = await getDoc(sellerDataDoc);
        
        if (sellerDataSnapshot.exists()) {
          const sellerData = sellerDataSnapshot.data();
          if (sellerData && sellerData.products) {
            setProducts(sellerData.products);
          }
        } else {
          setError(new Error('Seller data not found'));
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading, error };
}





















// const userDoc = doc(db, 'users', auth.currentUser!.uid);
/* 
useEffect(() => {
    async function fetchProducts() {
      try {
        const db = getFirestore();
        const userDoc = doc(db, 'users', auth.currentUser!.uid);
        const userSnapshot = await getDoc(userDoc);
        
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          const sellerData = userData.seller_data;
          if (sellerData && sellerData.products) {
            setProducts(sellerData.products);
          }
        }
        setLoading(false);
      } catch (err) {
        //setError('$err');
        setLoading(false);
      }
    }

    fetchProducts();
  }, []); */