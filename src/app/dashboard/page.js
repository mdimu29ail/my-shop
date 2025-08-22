'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Example static stats, replace with API fetch
    setStats({
      products: 12,
      orders: 5,
      users: 20,
      revenue: 1200,
    });
  }, []);

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen  z-20">
      {/* Sidebar */}
      <aside
        className={`bg-[#F8EFBA] shadow-md p-6 flex flex-col fixed top-0 left-0 h-full transition-transform duration-300 z-20
        ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 w-64`}
      >
        <Link href="/">
          <h2 className="text-2xl font-bold mb-12  text-orange-500">
            Dashboard
          </h2>
        </Link>
        <p className="mb-6 text-orange-500">
          Hello,{' '}
          <span className="font-semibold text-orange-500">
            {session?.user?.name}
          </span>
        </p>

        <nav className="flex flex-col gap-3">
          <Link
            href="/dashboard/add-product"
            className="px-4 py-2 bg-orange-500  rounded hover:bg-orange-600"
          >
            Add Product
          </Link>
          <Link
            href="/dashboard/orders"
            className="px-4 py-2 bg-orange-500  rounded hover:bg-gray-500"
          >
            View Orders
          </Link>
          <Link
            href="/dashboard/users"
            className="px-4 py-2 bg-orange-500  rounded hover:bg-gray-500"
          >
            Users
          </Link>
        </nav>
      </aside>

      {/* Hamburger Menu for Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-60 bg-[#F8EFBA]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-orange-500  rounded"
        >
          <FiMenu size={24} />
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 p-8 ml-0 md:ml-64 overflow-auto w-full bg-[#F8EFBA] text-black">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className=" p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-semibold">Products</h2>
            <p className="text-2xl mt-2">{stats.products}</p>
          </div>

          <div className=" p-6 rounded-lg shadow-2xl hover:shadow-lg">
            <h2 className="text-xl font-semibold">Orders</h2>
            <p className="text-2xl mt-2">{stats.orders}</p>
          </div>

          <div className=" p-6 rounded-lg shadow-2xl hover:shadow-lg">
            <h2 className="text-xl font-semibold">Users</h2>
            <p className="text-2xl mt-2">{stats.users}</p>
          </div>

          <div className=" p-6 rounded-lg shadow-2xl hover:shadow-lg">
            <h2 className="text-xl font-semibold">Revenue</h2>
            <p className="text-2xl mt-2">${stats.revenue}</p>
          </div>
        </div>
      </main>
    </div>
  );
}
