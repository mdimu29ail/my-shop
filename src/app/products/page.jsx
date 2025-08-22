import clientPromise from '@/lib/mongodb';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductsPage() {
  const client = await clientPromise;
  const db = client.db('myshop');

  const products = await db.collection('products').find({}).toArray();

  return (
    <div className="mx-auto p-8 bg-[#F8EFBA] text-black">
      <h1 className="text-3xl text-center font-bold mb-6 text-orange-500 ">
        Products
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <div
            key={product._id.toString()}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow duration-200 flex flex-col"
          >
            <Image
              src={product.image || '/placeholder.png'}
              alt={product.title}
              width={400}
              height={300}
              className="w-full h-44 object-cover mb-4 rounded"
            />
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.brand}</p>
            <p className="text-orange-500 font-semibold text-lg mb-4">
              ${product.current_price}
            </p>

            <Link
              href={`/products/${product._id.toString()}`}
              className="mt-auto bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-center"
            >
              Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
