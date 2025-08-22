'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

export default function UpdateProduct() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState({
    name: '',
    brand: '',
    rating: '',
    reviews_count: '',
    current_price: '',
    original_price: '',
    stock_status: '',
    quantity_left: '',
    colors_available: [],
    selected_color: '',
    quantity_selected: 1,
    delivery_date: '',
    sku: '',
    payment_methods: [],
    email: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct({
          ...product,
          name: data.name || '',
          brand: data.brand || '',
          rating: data.rating || '',
          reviews_count: data.reviews_count || '',
          current_price: data.current_price || '',
          original_price: data.original_price || '',
          stock_status: data.stock_status || '',
          quantity_left: data.quantity_left || '',
          colors_available: data.colors_available || [],
          selected_color: data.selected_color || '',
          quantity_selected: data.quantity_selected || 1,
          delivery_date: data.delivery_date || '',
          sku: data.sku || '',
          payment_methods: data.payment_methods || [],
          email: data.email || '',
          image: data.image || '',
        });
      } catch (err) {
        Swal.fire('Error', err.message, 'error');
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleChange = e => {
    const { name, value } = e.target;

    // Handle arrays separately for comma-separated input
    if (name === 'colors_available' || name === 'payment_methods') {
      setProduct(prev => ({
        ...prev,
        [name]: value.split(',').map(i => i.trim()),
      }));
    } else {
      setProduct(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });
      const result = await res.json();
      if (res.ok) {
        Swal.fire('Success', result.message, 'success');
        router.push('/myproducts');
      } else {
        Swal.fire('Error', result.message || 'Failed to update', 'error');
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-orange-500">
        Update Product
      </h1>

      <form
        onSubmit={handleUpdate}
        className="bg-white p-6 rounded shadow-md space-y-4"
      >
        {/* Name & Brand */}
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Brand</label>
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Prices */}
        <div>
          <label className="block font-semibold mb-1">Current Price</label>
          <input
            type="number"
            name="current_price"
            value={product.current_price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Original Price</label>
          <input
            type="number"
            name="original_price"
            value={product.original_price}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Rating & Reviews */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-semibold mb-1">Rating</label>
            <input
              type="number"
              step="0.1"
              name="rating"
              value={product.rating}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-semibold mb-1">Reviews Count</label>
            <input
              type="number"
              name="reviews_count"
              value={product.reviews_count}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        </div>

        {/* Stock & Quantity */}
        <div>
          <label className="block font-semibold mb-1">Stock Status</label>
          <input
            type="text"
            name="stock_status"
            value={product.stock_status}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity Left</label>
          <input
            type="number"
            name="quantity_left"
            value={product.quantity_left}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Colors & Payment Methods */}
        <div>
          <label className="block font-semibold mb-1">
            Colors Available (comma separated)
          </label>
          <input
            type="text"
            name="colors_available"
            value={product.colors_available.join(', ')}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Selected Color</label>
          <input
            type="text"
            name="selected_color"
            value={product.selected_color}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity Selected</label>
          <input
            type="number"
            name="quantity_selected"
            value={product.quantity_selected}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Delivery, SKU & Email */}
        <div>
          <label className="block font-semibold mb-1">Delivery Date</label>
          <input
            type="date"
            name="delivery_date"
            value={product.delivery_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">SKU</label>
          <input
            type="text"
            name="sku"
            value={product.sku}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={product.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Payment Methods (comma separated)
          </label>
          <input
            type="text"
            name="payment_methods"
            value={product.payment_methods.join(', ')}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition"
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </form>
    </div>
  );
}
