// strip of words navbar
"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MyKadoshDropdown from "./mykadoshdropdown";

const StripNavbar = () => {
  const router = useRouter();
  return (
    <div className="text-xs hidden sm:flex h-[10px] py-3 items-center justify-center space-x-[70px] text-black bg-yellow-50">
      <a href="/seeall" className="hover:text-teal-500">
        All
      </a>
      <a href="/" className="hover:text-teal-500">
        Apple
      </a>
      <a href="/" className="hover:text-teal-500">
        HP
      </a>
      <a href="/" className="hover:text-teal-500">
        Dell
      </a>
      <a href="/" className="hover:text-teal-500">
        Accessories
      </a>
      <a href="/" className="hover:text-teal-500">
        Samsung
      </a>
      <a href="/cart" className="hover:text-teal-500">
        Sony
      </a>
      <a href="/cart" className="hover:text-teal-500">
        Huawei
      </a>
    </div>
  );
};

export default StripNavbar;
