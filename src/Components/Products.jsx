'use client';
import { useState } from 'react';
import useProducts from '@/hooks/useProducts';
import Link from 'next/link';

export default function Products() {
  const { products, loading } = useProducts();
  const [seeAll, setSeeAll] = useState(false);

  if (loading) return <p>Loading...</p>;

  const displayProducts = seeAll ? products : products.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-orange-500 text-center">
        Product List
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map(product => (
          <div
            key={product._id}
            className="border rounded-lg p-4 shadow hover:shadow-lg"
          >
            <img
              src={product.image || '/placeholder.png'}
              alt={product.title}
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
      {!seeAll && products.length > 8 && (
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
