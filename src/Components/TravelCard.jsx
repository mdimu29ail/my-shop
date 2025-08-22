// pages/product-showcase.jsx
'use client';
import Image from 'next/image';
import Link from 'next/link';

// Reusable component with the same design as your example
const ModernProductCard = ({
  backgroundImage,
  productImage,
  title,
  subtitle,
  link = '#',
}) => {
  return (
    <div className="group relative w-full max-w-sm h-[450px] overflow-hidden rounded-2xl shadow-lg transition-all duration-300 hover:-translate-y-2.5 hover:shadow-xl">
      {/* 1. Main Background Image */}
      <Image
        src={backgroundImage}
        alt={title}
        fill
        sizes="(max-width: 640px) 100vw, 384px"
        className="object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* 2. Gradient Overlay for Text Readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

      {/* 3. Product Image Overlay (Top Right) */}
      {productImage && (
        <div className="absolute -top-4 right-0 w-48 h-48 z-20 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-translate-x-4 group-hover:translate-y-4">
          <Image
            src={productImage}
            alt="Product"
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* 4. Text Content (Bottom Left) */}
      <div className="absolute bottom-0 left-0 z-20 w-full p-6 text-white">
        <h2 className="text-3xl font-bold leading-tight mb-2">{title}</h2>
        <p className="mb-5 text-sm text-white/90">{subtitle}</p>
        <Link
          href={link}
          className="inline-block rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-blue-700"
        >
          Discover More
        </Link>
      </div>
    </div>
  );
};

// Example usage on a page
export default function ProductShowcasePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8EFBA] p-4">
      <ModernProductCard
        backgroundImage="/hero2.jpg"
        productImage="/Smartwatch Pro.jpg"
        title="Velvet Orchid"
        subtitle="A new fragrance that evokes glamour and mysterious beauty."
        link="/products/velvet-orchid"
      />
    </div>
  );
}
