// page.tsx
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicCheckoutContent = dynamic(() => import('@/app/checkout/checkoutcontent'), {
  loading: () => <p>Loading...</p>,
});

function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DynamicCheckoutContent />
    </Suspense>
  );
}

// checkoutpage
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './authprovider';
import { FaLock, FaCreditCard, FaMobile } from 'react-icons/fa';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  price: number;
  details: string;
  img: string;
  manufacturer: string;
  model: string;
  category: string;
  qty: number;
}

export default function CheckoutContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    momoNumber: '',
  });

  useEffect(() => {
    const productData = searchParams.get('data');
    if (productData) {
      try {
        const product = JSON.parse(decodeURIComponent(productData));
        setCartItems([{ ...product, qty: 1 }]);
      } catch (error) {
        console.error('Error parsing product data:', error);
      }
    } else {
      router.push('/checkout');
    }
  }, [searchParams, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order submitted:', formData);
    // Here you would typically send the order data to your backend
  };

  if (!user) {
    return <div className="text-center py-10">Please log in to access the checkout page.</div>;
  }

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-normal mb-8 text-left">Checkout</h1>
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-2/3 px-4 mb-8">
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">
                Full Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="zipCode">
                  ZIP Code
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="zipCode"
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 mt-8">Payment Information</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
                Payment Method
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
              >
                <option value="card">Credit/Debit Card</option>
                <option value="momo">MTN Mobile Money</option>
              </select>
            </div>

            {formData.paymentMethod === 'card' && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                    Card Number
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="cardNumber"
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="flex flex-wrap -mx-2 mb-4">
                  <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                      Expiry Date
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="expiryDate"
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                      CVV
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="cvv"
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {formData.paymentMethod === 'momo' && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="momoNumber">
                  MTN Mobile Money Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="momoNumber"
                  type="text"
                  name="momoNumber"
                  value={formData.momoNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}

            <div className="flex items-center justify-between mt-8">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                type="submit"
              >
                <FaLock className="mr-2" />
                Place Order
              </button>
            </div>
          </form>
        </div>

        <div className="w-full lg:w-1/3 px-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center mb-4 border-b pb-4">
                <img src={item.img} alt={item.name} width={50} height={50} className="mr-4" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-gray-600">Qty: {item.qty}</p>
                  <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            <div className="mb-4">
              <p className="text-gray-700">Subtotal: ${totalAmount.toFixed(2)}</p>
              <p className="text-gray-700">Shipping: $10.00</p>
              <p className="text-gray-700">Tax: ${(totalAmount * 0.1).toFixed(2)}</p>
            </div>
            <div className="border-t pt-4">
              <p className="text-xl font-bold">Total: ${(totalAmount + 10 + totalAmount * 0.1).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




