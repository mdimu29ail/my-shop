'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t mt-12 py-6 px-8 flex flex-col md:flex-row items-center justify-between">
      {/* Logo */}
      <div className="flex items-center mb-4 md:mb-0">
        <Image
          src="/logo.png" // replace with your logo path
          alt="MyShop Logo"
          width={50}
          height={50}
          className="mr-3"
        />
        <span className="font-semibold text-lg">MyShop</span>
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
