"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../components/authprovider";
import { FaLock, FaCreditCard, FaMobile, FaPaypal } from "react-icons/fa";

import { useRouter, useSearchParams } from "next/navigation";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { doc, getFirestore, updateDoc, arrayUnion } from "firebase/firestore";

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
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    momoNumber: "",
  });

  useEffect(() => {
    const productData = searchParams.get("data");
    if (productData) {
      try {
        const product = JSON.parse(decodeURIComponent(productData));
        setCartItems([{ ...product, qty: 1 }]);
      } catch (error) {
        console.error("Error parsing product data:", error);
      }
    } else {
      router.push("/checkout");
    }

    const script = document.createElement("script");
    script.src = `https://js.braintreegateway.com/web/dropin/1.33.0/js/dropin.min.js`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [searchParams, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const db = getFirestore();

  const handleSubmit = async (e: React.FormEvent | null, paymentDetails: any = null) => {
    if (e) e.preventDefault();
    console.log("Order submitted:", formData);

    if (user) {
      const userDocRef = doc(
        db,
        "users",
        "qWE5sgjt0RRhtHDqwciu",
        "client_data",
        user.uid
      );

      try {
        const order = {
          orderId: paymentDetails ? paymentDetails.id : Date.now().toString(),
          createTime: paymentDetails ? paymentDetails.create_time : new Date().toISOString(),
          products: cartItems.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            qty: item.qty,
          })),
          total: totalAmount,
          shippingDetails: {
            fullName: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            zipCode: formData.zipCode,
          },
          delivered: false,
          cancelled: false,
        };

        await updateDoc(userDocRef, {
          current_orders: arrayUnion(order),
        });

        console.log("Order added to Firestore successfully");
        router.push("/orderconfirmation");
      } catch (error) {
        console.error("Error adding order to Firestore:", error);
      }
    }
  };

  const handlePayPalSuccess = async (details: any, data: any) => {
    console.log("PayPal payment successful:", details);
    await handleSubmit(null, details);
  };

  if (!user) {
    return (
      <div className="text-center py-10">
        Please log in to access the checkout page.
      </div>
    );
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AcK9e5xMO-p0AQ5kX9JWrdt4SlSXzs3fV1Dcoar6BiGclpQ5EaPg68656EbcMu2DIwQtXVBTpDca6rtc",
        currency: "USD",
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-normal mb-8 text-left">Checkout</h1>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8">
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="fullName"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="address"
                >
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
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="city"
                  >
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
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="zipCode"
                  >
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

              <h2 className="text-2xl font-bold mb-6 mt-8">
                Payment Information
              </h2>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="paymentMethod"
                >
                  Payment Method
                </label>
                <div className="relative">
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-8"
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    required
                  >
                    {/* <option value="card">Credit/Debit Card</option> */}
                    <option value="momo">MTN Mobile Money</option>
                    <option value="paypal">Card Payment/PayPal</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    {formData.paymentMethod === "card" && (
                      <FaCreditCard className="text-gray-500" />
                    )}
                    {formData.paymentMethod === "momo" && (
                      <FaMobile className="text-gray-500" />
                    )}
                    {formData.paymentMethod === "paypal" && (
                      <FaPaypal className="text-gray-500" />
                    )}
                  </div>
                </div>
              </div>

              {formData.paymentMethod === "card" && (
                <div id="braintree-drop-in-container"></div>
              )}

              {formData.paymentMethod === "momo" && (
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="momoNumber"
                  >
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

              {formData.paymentMethod === "paypal" && (
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order?.create({
                      intent: "CAPTURE",
                      purchase_units: [
                        {
                          amount: {
                            currency_code: "USD",
                            value: ((totalAmount/1100).toFixed(2)).toString(),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return (
                      actions.order?.capture().then((details) => {
                        handlePayPalSuccess(details, data);
                      }) ?? Promise.resolve()
                    );
                  }}
                />
              )}

              {formData.paymentMethod !== "paypal" && (
                <div className="flex items-center justify-between mt-8">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
                    type="submit"
                  >
                    <FaLock className="mr-2" />
                    Place Order
                  </button>
                </div>
              )}
            </form>
          </div>

          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center mb-4 border-b pb-4"
                >
                  <img
                    src={item.img}
                    alt={item.name}
                    width="50"
                    height="50"
                    className="mr-4"
                  />
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600">Qty: {item.qty}</p>
                    <p className="text-gray-600">
                      Price: RWF
                      {typeof item.price === "number"
                        ? item.price.toFixed(2)
                        : "N/A"}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mb-4">
                <p className="text-gray-700">
                  Subtotal: RWF {totalAmount.toFixed(2)}
                </p>
                <p className="text-gray-700">Shipping: RWF 3000</p>
                <p className="text-gray-700">
                  Tax: RWF {(totalAmount * 0.1).toFixed(2)}
                </p>
              </div>
              <div className="border-t pt-4">
                <p className="text-xl font-bold">
                  Total: RWF {(totalAmount + 3000 + totalAmount * 0.1).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
};