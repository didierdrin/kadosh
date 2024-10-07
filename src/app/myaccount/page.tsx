
"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/authprovider";
import { db } from "@/components/authprovider";
import { doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Image from "next/image"; 

export default function MyAccount() {
  const { user } = useAuth();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null); // To store the image file
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    addressLine1: "",
    city: "",
    province: "",
    country: "",
    zipCode: "",
  });

  const [isEditing, setIsEditing] = useState(false); // New state to track editing mode
  const [customerInfoAvailable, setCustomerInfoAvailable] = useState(false); // Track if data exists

  useEffect(() => {
    // Fetch existing user info if available
    if (user) {
      const fetchUserData = async () => {
        const userDocRef = doc(
          db,
          "client_data_new",
          user.uid
        );
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.customer_info) {
            setCustomerInfoAvailable(true);
            setProfileImage(data.customer_info.profileImage || "");
            setFirstName(data.customer_info.firstName || "");
            setLastName(data.customer_info.lastName || "");
            setAge(data.customer_info.age || "");
            setPhoneNumber(data.customer_info.phoneNumber || "");
            setShippingAddress({
              addressLine1: data.customer_info.shippingAddress?.addressLine1 || "",
              city: data.customer_info.shippingAddress?.city || "",
              province: data.customer_info.shippingAddress?.province || "",
              country: data.customer_info.shippingAddress?.country || "",
              zipCode: data.customer_info.shippingAddress?.zipCode || "",
            });
          } else {
            setCustomerInfoAvailable(false);
          }
        }
      };
      fetchUserData();
    }
  }, [user]);

  // Handle file selection for image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]); // Store the uploaded image file
    }
  };

  // Upload image to Firebase Storage and return the download URL
  const uploadProfileImage = async (): Promise<string | null> => {
    if (!imageFile) return profileImage; // If no new image is selected, return existing URL
    const storage = getStorage();
    const storageRef = ref(storage, `${user?.uid}-${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSaveProfile = async () => {
    if (user) {
      const userDocRef = doc(
        db,
        "client_data_new",
        user.uid
      );

      // Upload the image if a new one is selected
      const uploadedImageUrl = await uploadProfileImage();

      const customerInfo = {
        profileImage: uploadedImageUrl,
        firstName,
        lastName,
        age,
        phoneNumber,
        shippingAddress,
      };
      await setDoc(userDocRef, { customer_info: customerInfo }, { merge: true });
      setIsEditing(false); // Exit edit mode after saving
      console.log("Profile updated");
    } else {
      router.push("/auth");
    }
  };

 
  return (
    <div className="flex flex-col">
    <div className="mx-2 mt-4 mb-4">
    {!isEditing && customerInfoAvailable && (
          <div className="bg-white p-4 rounded shadow-md mb-6 border-t border-slate-300">
            <h2 className="text-lg font-semibold mb-4">Your Information</h2>
            {profileImage && (
              <Image
                src={profileImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
            )}
            <p><strong>First Name:</strong> {firstName || "Not added"}</p>
            <p><strong>Last Name:</strong> {lastName || "Not added"}</p>
            <p><strong>Age:</strong> {age || "Not added"}</p>
            <p><strong>Phone Number:</strong> {phoneNumber || "Not added"}</p>
            <p><strong>Shipping Address:</strong> {`${shippingAddress.addressLine1}, ${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.country}, ${shippingAddress.zipCode}` || "Not added"}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        )}
    </div>
    <div className="flex flex-wrap mx-2 mt-4 mb-4">
      <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
        {/* Add a container with elevation - card that display the details added below if not added it shows that no customer_info added*/}
        <div className="mb-6">
          <h1 className="text-xl font-bold mb-4 underline ">My Account</h1>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
          {profileImage && (
            <Image
              src={profileImage}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover mb-4 opacity-20"
            />
          )}
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 px-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Address Line 1</label>
          <input
            type="text"
            value={shippingAddress.addressLine1}
            onChange={(e) => setShippingAddress({ ...shippingAddress, addressLine1: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
          <input
            type="text"
            value={shippingAddress.city}
            onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Province</label>
          <input
            type="text"
            value={shippingAddress.province}
            onChange={(e) => setShippingAddress({ ...shippingAddress, province: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
          <input
            type="text"
            value={shippingAddress.country}
            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
          <input
            type="text"
            value={shippingAddress.zipCode}
            onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          onClick={handleSaveProfile}
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Save Profile
        </button>
      </div>
    </div>
</div>
  );
}
