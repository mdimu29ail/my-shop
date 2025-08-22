'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2';

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!session) return;

    try {
      // Fetch only orders for the logged-in user
      const res = await fetch(`/api/orders?email=${session.user.email}`);
      const data = await res.json();
      if (Array.isArray(data)) setOrders(data);
      else setOrders([]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (status === 'authenticated') fetchOrders();
  }, [status, session]);

  const handleDelete = async id => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`/api/orders/${id}`, {
          method: 'DELETE',
        });

        const result = await res.json();

        if (res.ok) {
          Swal.fire('Deleted!', result.message, 'success');
          fetchOrders(); // Refresh orders list
        } else {
          Swal.fire('Error', result.message || 'Failed to delete', 'error');
        }
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      }
    }
  };

  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Please login to see your orders.</p>;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div
              key={order._id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Product:</strong> {order.productName}
                </p>
                <p>
                  <strong>Price:</strong> ${order.price}
                </p>
                <p>
                  <strong>User:</strong> {order.userName}
                </p>
                <p>
                  <strong>Email:</strong> {order.userEmail}
                </p>
              </div>
              <button
                onClick={() => handleDelete(order._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
