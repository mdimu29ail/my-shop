'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { useSession } from 'next-auth/react';

export default function AddProduct() {
  const { data: session } = useSession();

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [rating, setRating] = useState('');
  const [reviewsCount, setReviewsCount] = useState('');
  const [currentPrice, setCurrentPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [discountPercent, setDiscountPercent] = useState('');
  const [stockStatus, setStockStatus] = useState('In stock');
  const [quantityLeft, setQuantityLeft] = useState('');
  const [colorsAvailable, setColorsAvailable] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sku, setSku] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!session?.user?.email) {
      Swal.fire('Error', 'You must be logged in!', 'error');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          brand,
          rating: parseFloat(rating),
          reviews_count: parseInt(reviewsCount),
          current_price: parseFloat(currentPrice),
          original_price: parseFloat(originalPrice),
          currency,
          discount_percent: parseInt(discountPercent),
          stock_status: stockStatus,
          quantity_left: parseInt(quantityLeft),
          colors_available: colorsAvailable.split(',').map(c => c.trim()),
          selected_color: selectedColor,
          sku,
          email: session.user.email,
          image,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire('Success', 'Product added!', 'success');

        // Reset form
        setName('');
        setBrand('');
        setRating('');
        setReviewsCount('');
        setCurrentPrice('');
        setOriginalPrice('');
        setDiscountPercent('');
        setStockStatus('In stock');
        setQuantityLeft('');
        setColorsAvailable('');
        setSelectedColor('');
        setSku('');
        setImage('');
      } else {
        Swal.fire('Error', data.message || 'Failed to add product', 'error');
      }
    } catch (err) {
      Swal.fire('Error', err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 rounded-2xl max-w-3xl mx-auto bg-white shadow-2xl shadow-amber-300">
      <h2 className="text-2xl text-orange-500 font-bold mb-6 text-center">
        Add Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={e => setBrand(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="number"
          step="0.1"
          placeholder="Rating"
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="number"
          placeholder="Reviews Count"
          value={reviewsCount}
          onChange={e => setReviewsCount(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Current Price"
          value={currentPrice}
          onChange={e => setCurrentPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Original Price"
          value={originalPrice}
          onChange={e => setOriginalPrice(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="number"
          placeholder="Discount Percent"
          value={discountPercent}
          onChange={e => setDiscountPercent(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Stock Status"
          value={stockStatus}
          onChange={e => setStockStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="number"
          placeholder="Quantity Left"
          value={quantityLeft}
          onChange={e => setQuantityLeft(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Colors Available (comma separated)"
          value={colorsAvailable}
          onChange={e => setColorsAvailable(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="text"
          placeholder="Selected Color"
          value={selectedColor}
          onChange={e => setSelectedColor(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={e => setSku(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
          required
        />
        <input
          type="email"
          placeholder="Support Email"
          value={session?.user?.email || ''}
          readOnly
          className="w-full px-4 py-2 border rounded-lg bg-gray-200 dark:bg-gray-600 cursor-not-allowed"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={e => setImage(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-700"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 w-full"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
}
