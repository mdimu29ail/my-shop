'use client';

import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function UserProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-[#F8EFBA] p-8 rounded-3xl shadow-2xl max-w-md w-full text-center transform transition-all duration-500 hover:scale-105 hover:shadow-orange-400">
        {/* Profile Image */}
        <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-gradient-to-tr from-orange-400 to-orange-600 shadow-lg transition-transform duration-500 hover:scale-110">
          <Image
            src={session?.user?.image || '/placeholder.png'}
            alt={session?.user?.name || 'User'}
            width={128}
            height={128}
            className="object-cover w-full h-full"
          />
        </div>

        {/* User Info */}
        <h2 className="text-3xl font-bold mb-2 text-orange-600 animate-pulse">
          {session?.user?.name || 'No Name'}
        </h2>
        <p className="text-gray-600 mb-2">
          <strong>Email:</strong> {session?.user?.email || 'No Email'}
        </p>

        {/* Optional: Additional info */}
        <p className="text-gray-500 mb-4">Welcome to your profile dashboard!</p>

        {/* Action Button */}
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-full hover:scale-105 hover:shadow-lg transition transform duration-300">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
