"use client";
import React, { useState } from 'react';

type SettingsType = {
  notifications: boolean;
  darkMode: boolean;
  language: string;
  currency: string;
  address: string;
  paymentMethod: string;
  privacySettings: boolean;
};

const Settings = () => {
  const [settings, setSettings] = useState<SettingsType>({
    notifications: true,
    darkMode: false,
    language: 'en',
    currency: 'USD',
    address: '',
    paymentMethod: 'Credit Card',
    privacySettings: false,
  });

  const handleToggle = (setting: keyof Pick<SettingsType, 'notifications' | 'darkMode' | 'privacySettings'>) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: !prevSettings[setting]
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }));
  };

  return (
    <div className="bg-white mt-4 mb-4 p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h3 className="text-xl font-semibold mb-6">Settings</h3>
      <div className="space-y-4">
        {/* Notifications */}
        <div className="flex items-center justify-between">
          <span>Notifications</span>
          <button
            onClick={() => handleToggle('notifications')}
            className={`w-12 h-6 rounded-full p-1 ${settings.notifications ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transform duration-300 ease-in-out ${settings.notifications ? 'translate-x-6' : ''}`}></div>
          </button>
        </div>

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <button
            onClick={() => handleToggle('darkMode')}
            className={`w-12 h-6 rounded-full p-1 ${settings.darkMode ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transform duration-300 ease-in-out ${settings.darkMode ? 'translate-x-6' : ''}`}></div>
          </button>
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="block mb-1">Language</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        {/* Currency */}
        <div>
          <label htmlFor="currency" className="block mb-1">Currency</label>
          <select
            id="currency"
            name="currency"
            value={settings.currency}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="RWF">RWF</option>
          </select>
        </div>

        {/* Address Management */}
        <div>
          <label htmlFor="address" className="block mb-1">Shipping Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={settings.address}
            onChange={handleChange}
            placeholder="1234 Main St, City, Country"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Payment Method */}
        <div>
          <label htmlFor="paymentMethod" className="block mb-1">Preferred Payment Method</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={settings.paymentMethod}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Credit Card">Credit Card</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Mobile Money">Mobile Money</option>
          </select>
        </div>

        {/* Privacy Settings */}
        <div className="flex items-center justify-between">
          <span>Privacy Settings (e.g., hide profile)</span>
          <button
            onClick={() => handleToggle('privacySettings')}
            className={`w-12 h-6 rounded-full p-1 ${settings.privacySettings ? 'bg-blue-500' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white transform duration-300 ease-in-out ${settings.privacySettings ? 'translate-x-6' : ''}`}></div>
          </button>
        </div>

        {/* Save Settings */}
        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300">
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
