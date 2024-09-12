'use client';
import React, { useState, useEffect } from 'react';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    preferredPaymentMethod: '',
  });

  useEffect(() => {
    // Fetch user profile data when component mounts
    // This is a placeholder. Replace with your actual API call
    const fetchProfile = async () => {
      try {
        // const response = await fetch('/api/profile');
        // const data = await response.json();
        // setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = ({e}:any) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSubmit = async ({e}:any) => {
    e.preventDefault();
    // This is a placeholder. Replace with your actual API call
    try {
      // await fetch('/api/profile', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(profile)
      // });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={profile.firstName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={profile.lastName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={profile.email}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
            required
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={profile.phone}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
          />
        </div>
        
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={profile.address}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              id="city"
              value={profile.city}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              name="state"
              id="state"
              value={profile.state}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">ZIP Code</label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              value={profile.zipCode}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              value={profile.country}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="preferredPaymentMethod" className="block text-sm font-medium text-gray-700">Preferred Payment Method</label>
          <select
            name="preferredPaymentMethod"
            id="preferredPaymentMethod"
            value={profile.preferredPaymentMethod}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600-300 focus:ring focus:ring-blue-600-200 focus:ring-opacity-50"
          >
            <option value="">Select a payment method</option>
            <option value="creditCard">Credit Card</option>
            <option value="paypal">PayPal</option>
            <option value="bankTransfer">Bank Transfer</option>
          </select>
        </div>
        
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-600-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600-500"
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;