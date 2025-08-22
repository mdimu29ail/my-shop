'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t  py-6 px-8 flex flex-col md:flex-row items-center justify-between bg-[#F8EFBA] text-black">
      {/* Logo */}
      <div className="flex items-center mb-4 md:mb-0">
        <span className="font-semibold text-lg text-amber-600">MyShop</span>
      </div>

      {/* Links */}
      <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
        <a href="#" className="hover:text-blue-500 transition">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-blue-500 transition">
          Terms of Service
        </a>
        <a href="#" className="hover:text-blue-500 transition">
          Contact
        </a>
      </div>

      {/* Copyright */}
      <p className="text-sm mt-4 md:mt-0">
        &copy; {new Date().getFullYear()} MyShop. All rights reserved.
      </p>
    </footer>
  );
}
