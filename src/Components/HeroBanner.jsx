'use client';
import React from 'react';
import Link from 'next/link';

const banners = [
  {
    title: 'Smartwatch Pro X200',
    subtitle: 'New Collection',
    image: '/hero1.jpg',
    link: '/public/hero2.jpg',
  },
  {
    title: 'Gaming Laptop GX15', // changed to laptop
    subtitle: 'Best Deal',
    image: '/hero2.jpg',
    link: '/shop/it222',
  },
];

export default function HeroBanner() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mx-auto bg-[#F8EFBA] px-4 py-8">
      {banners.map((banner, index) => (
        <div
          key={index}
          className="relative flex-1  shadow-2xl rounded-lg overflow-hidden shadow-amber-500 hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-60 object-cover"
          />
          <div className="absolute top-4 left-4 text-black">
            <p className="text-sm">{banner.subtitle}</p>
            <h2 className="text-2xl font-bold text-orange-500">
              {banner.title}
            </h2>
            <Link
              href={banner.link}
              className="mt-2 inline-block bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Shop Now
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
