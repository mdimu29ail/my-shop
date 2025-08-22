'use client';
import { useState } from 'react';
import useProducts from '@/hooks/useProducts';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Products() {
  const { products, loading } = useProducts();
  const [seeAll, setSeeAll] = useState(false);

  const displayProducts = seeAll ? products : products.slice(0, 8);

  return (
    <div className="bg-[#F8EFBA] text-black mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">
        Product List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow animate-pulse"
              >
                <Skeleton height={160} className="mb-4 rounded" />
                <Skeleton height={20} width={`80%`} className="mb-2" />
                <Skeleton height={20} width={`50%`} className="mb-4" />
                <Skeleton height={36} width={`100%`} />
              </div>
            ))
          : displayProducts.map(product => (
              <div
                key={product._id}
                className="border rounded-lg p-4 shadow hover:shadow-lg"
              >
                <img
                  src={product.image || '/placeholder.png'}
                  alt={product.name}
                  className="w-full h-40 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.current_price}</p>
                <Link
                  href={`/products/${product._id}`}
                  className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 w-full text-center"
                >
                  Details
                </Link>
              </div>
            ))}
      </div>

      {!seeAll && !loading && products.length > 8 && (
        <div className="text-center mt-6">
          <button
            onClick={() => setSeeAll(true)}
            className="bg-orange-500 px-4 py-2 rounded hover:bg-gray-300"
          >
            See All
          </button>
        </div>
      )}
    </div>
  );
}
