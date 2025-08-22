'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

export default function MyProductsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products for the logged-in user
  const fetchProducts = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/products?email=${session.user.email}`);
      const data = await res.json();

      // Filter by email in case backend sends all products
      const userProducts = Array.isArray(data)
        ? data.filter(p => p.email === session.user.email)
        : [];

      setProducts(userProducts);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') fetchProducts();
  }, [status, session]);

  // Delete product (with email verification)
  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email }),
      });
      const result = await res.json();

      if (res.ok) {
        Swal.fire('Deleted!', result.message || 'Product deleted', 'success');
        fetchProducts();
      } else {
        Swal.fire('Error', result.message || 'Failed to delete', 'error');
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
  };

  if (status === 'loading' || loading)
    return <p className="text-center mt-8">Loading...</p>;

  if (!session)
    return (
      <p className="text-center mt-8">Please login to see your products.</p>
    );

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-orange-500">
        My Products
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No products added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product._id}
              className="p-4 border border-gray-300 rounded-2xl shadow-lg flex flex-col justify-between transition-transform transform hover:scale-105 hover:shadow-2xl"
            >
              {/* Product Image */}
              <div className="overflow-hidden rounded-xl mb-4">
                <img
                  src={product.image || '/placeholder.png'}
                  alt={product.name || 'Product'}
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="mb-4">
                <h2 className="font-semibold text-lg truncate">
                  {product.name}
                </h2>

                <p className="font-bold text-lg mt-1">
                  ${product.current_price}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => router.push(`/products/${product._id}`)}
                  className="px-4 py-2 rounded-full bg-orange-300 hover:bg-orange-400 transition"
                >
                  See Details
                </button>
                <button
                  onClick={() => router.push(`/products/update/${product._id}`)}
                  className="px-4 py-2 rounded-full bg-yellow-300 hover:bg-yellow-400 transition"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="px-4 py-2 rounded-full bg-red-300 hover:bg-red-400 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
