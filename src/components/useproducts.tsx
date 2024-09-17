// 

'use client';
import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';

interface Product {
    id?: number;
    img: string;
    name: string;
    manufacturer: string;
    model: string;
    qty: number;
    price: number;
    category: string;
    details: string;
}

interface UseProductsProps {
  searchTerm?: string;
  selectedCategory?: string;
  minPrice?: number;
  maxPrice?: number;
}

export function useProducts({
  searchTerm = '',
  selectedCategory = '',
  minPrice = 0,
  maxPrice = Infinity,
}: UseProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const db = getFirestore();
        const usersCollection = collection(db, 'users');
        const userDoc = doc(usersCollection, 'qWE5sgjt0RRhtHDqwciu');
        const sellerDataCollection = collection(userDoc, 'seller_data');
        const sellerDataDoc = doc(sellerDataCollection, 'Aa8DJ0GHYuhpI1Tt861e');
        
        const sellerDataSnapshot = await getDoc(sellerDataDoc);
        
        if (sellerDataSnapshot.exists()) {
          const sellerData = sellerDataSnapshot.data();
          if (sellerData && sellerData.products) {
            let filteredProducts = sellerData.products;

            // Apply search term filter
            if (searchTerm) {
              filteredProducts = filteredProducts.filter((product: Product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (product.details && product.details.toLowerCase().includes(searchTerm.toLowerCase()))
              );
            }

            // Apply category filter
            if (selectedCategory && selectedCategory !== 'All') {
              filteredProducts = filteredProducts.filter(
                (product: Product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
              );
            }

            // Apply price range filter
            filteredProducts = filteredProducts.filter(
              (product: Product) => product.price >= minPrice && product.price <= maxPrice
            );

            setProducts(filteredProducts);
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
  }, [searchTerm, selectedCategory, minPrice, maxPrice]);

  return { products, loading, error };
}


//'use client';
// import { useState, useEffect } from 'react';
// import { getFirestore, doc, getDoc, collection } from 'firebase/firestore';

// interface Product {
//     id?: number;
//     img: string; 
//     name: string; 
//     manufacturer: string; 
//     model: string,
//     qty: number; 
//     price: number; 
//     category: string; 
//     details: string; 
// }

// export function useProducts(searchTerm: string = '') {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<Error | null>(null);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const db = getFirestore();
//         const usersCollection = collection(db, 'users');
//         const userDoc = doc(usersCollection, 'qWE5sgjt0RRhtHDqwciu');
//         const sellerDataCollection = collection(userDoc, 'seller_data');
//         const sellerDataDoc = doc(sellerDataCollection, 'Aa8DJ0GHYuhpI1Tt861e');
        
//         const sellerDataSnapshot = await getDoc(sellerDataDoc);
        
//         if (sellerDataSnapshot.exists()) {
//           const sellerData = sellerDataSnapshot.data();
//           if (sellerData && sellerData.products) {
//             let filteredProducts = sellerData.products;
//             if (searchTerm) {
//               filteredProducts = filteredProducts.filter((product: Product) =>
//                 product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 product.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                 (product.details && product.details.toLowerCase().includes(searchTerm.toLowerCase()))
//               );
//             }
//             setProducts(filteredProducts);
//           }
//         } else {
//           setError(new Error('Seller data not found'));
//         }
//         setLoading(false);
//       } catch (err) {
//         setError(err instanceof Error ? err : new Error('An unknown error occurred'));
//         setLoading(false);
//       }
//     }

//     fetchProducts();
//   }, [searchTerm]);

//   return { products, loading, error };
// }


