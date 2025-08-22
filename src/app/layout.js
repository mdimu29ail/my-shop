'use client'; // Make this client if you want Navbar to use session
import { Toaster } from 'react-hot-toast';

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import Navbar from '@/components/navBar';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-800">
        <SessionProvider>
          <Navbar /> {/* Navbar now has access to session */}
          {children}
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
