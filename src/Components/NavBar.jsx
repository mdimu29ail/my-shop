'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-orange-500 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold ml-40 md:ml-0 lg:ml-0">
              MyShop
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
            <Link href="/products" className="hover:text-gray-200">
              Products
            </Link>
            {session && (
              <Link href="/dashboard" className="hover:text-gray-200">
                Dashboard
              </Link>
            )}
            {session && (
              <Link href="/myproducts" className="hover:text-gray-200">
                My Products
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* <ThemeToggle></ThemeToggle> */}

            {session ? (
              <>
                <span className="mr-3">{session.user.name}</span>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="bg-white text-orange-500 px-3 py-1 rounded hover:bg-gray-100"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-orange-500 px-3 py-1 rounded hover:bg-gray-100"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="bg-gray-200 text-orange-500 px-3 py-1 rounded hover:bg-gray-100"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-orange-500">
          <Link href="/" className="block hover:text-gray-200">
            Home
          </Link>
          <Link href="/products" className="block hover:text-gray-200">
            Products
          </Link>
          {session && (
            <Link href="/dashboard" className="block hover:text-gray-200">
              Dashboard
            </Link>
          )}
          {session ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="w-full bg-white text-orange-500 px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                className="block bg-white text-orange-500 px-3 py-1 rounded hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block bg-gray-200 text-orange-500 px-3 py-1 rounded hover:bg-gray-100"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
