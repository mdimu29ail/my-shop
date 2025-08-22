// app/products/[id]/page.jsx
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';

export default async function ProductPage({ params }) {
  const client = await clientPromise;
  const db = client.db('myshop');

  const product = await db
    .collection('products')
    .findOne({ _id: new ObjectId(params.id) });

  if (!product) return <p className="text-center mt-8">Product not found</p>;

  return (
    <div className="bg-[#F8EFBA] text-black mx-auto p-6 grid md:grid-cols-2 gap-8 items-start">
      {/* Left: Product Image */}
      <div className="w-full h-full flex justify-center items-center">
        <Image
          src={product.image || '/placeholder.png'}
          alt={product.title || 'Product'}
          width={600}
          height={600}
          className="w-full h-[500px] object-cover rounded-lg shadow"
        />
      </div>

      {/* Right: Product Info */}
      <div className="flex flex-col justify-between h-full">
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <div className="flex justify-between text-lg mb-4">
            <span>
              Brand: <strong>{product.brand}</strong>
            </span>
            <span>
              Reviews: <strong>{product.reviews_count}</strong>
            </span>
          </div>

          <div className="flex justify-between text-lg mb-4">
            <span>
              Current: <strong>${product.current_price}</strong>
            </span>
            <span>
              Original: <strong>${product.original_price}</strong>
            </span>
            <span>
              Discount: <strong>{product.discount_percent}%</strong>
            </span>
          </div>

          <div className="flex justify-between text-lg mb-4">
            <span>
              Stock: <strong>{product.stock_status}</strong>
            </span>
            <span>
              Quantity Left: <strong>{product.quantity_left}</strong>
            </span>
          </div>

          {/* Colors */}
          <div className="text-lg mb-4 flex items-center gap-3 flex-wrap">
            Colors:
            {(product.colors_available || [])?.map((color, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-amber-500 text-white text-sm shadow"
              >
                {color}
              </span>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="text-lg mb-4 flex items-center gap-3 flex-wrap">
            Payment:
            {(product.payment_methods || [])?.map((payment, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-green-500 text-white text-sm shadow"
              >
                {payment}
              </span>
            ))}
          </div>

          <div className="flex justify-between text-lg mb-4">
            <span>
              Selected Quantity: <strong>{product.quantity_selected}</strong>
            </span>
            <span>
              SKU: <strong>{product.sku}</strong>
            </span>
          </div>

          <p className="text-lg mb-4">
            Email: <strong>{product.email}</strong>
          </p>
        </div>

        {/* Buy Button */}
        <Link
          href={`/order/${product._id.toString()}`}
          className="mt-6 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition text-center"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
}
