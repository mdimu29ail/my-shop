'use client';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  // Your product JSON (as per previous data)
  const productData = {
    name: 'Wireless Earbuds',
    brand: 'SoundMax',
    rating: 4.5,
    reviews_count: 120,
    current_price: 59.99,
    original_price: 79.99,
    currency: 'USD',
    discount_percent: 25,
    stock_status: 'In stock',
    quantity_left: 50,
    colors_available: ['Black', 'White', 'Blue'],
    selected_color: 'Black',
    sku: 'SM-EAR-100',
    image: 'https://example.com/images/wireless-earbuds.jpg',
  };

  // Handle form input changes
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle order submission
  const handleOrder = async () => {
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: params.id,
          productName: productData.name,
          productImage: productData.image,
          price: productData.current_price,
          sku: productData.sku,
          userName: formData.name,
          userEmail: formData.email,
          userPhone: formData.phone,
          orderDate: new Date(),
        }),
      });

      if (res.ok) {
        toast.success('Order placed successfully!');
        router.push('/dashboard/orders');
      } else {
        toast.error('Failed to place order.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-8 space-y-4">
      <h1 className="text-2xl font-bold">Place Your Order</h1>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="phone"
        placeholder="Your Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        onClick={handleOrder}
        disabled={loading}
        className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 w-full"
      >
        {loading ? 'Placing...' : 'Confirm Order'}
      </button>
    </div>
  );
}
