// components/ProductGrid.jsx
import Image from 'next/image';
import Link from 'next/link';

// You can fetch this data from an API or define it as a static list.
const productData = [
  {
    id: 1,
    name: 'VR Headset',
    price: 299.0,
    rating: 4.5,
    reviews: '150+',
    imageUrl: 'https://i.ibb.co/DH5KMfQx/VR-Headset.jpg',
  },
  {
    id: 2,
    name: 'Wireless Earbuds',
    price: 79.0,
    rating: 4.5,
    reviews: '350+',
    imageUrl: 'https://i.ibb.co/0jyyj3kM/Wireless-Earbuds.jpg',
  },
  {
    id: 3,
    name: 'Drone Camera',
    price: 450.0,
    rating: 5,
    reviews: '200+',
    imageUrl: 'https://i.ibb.co/Q19ZTLB/Drone-Camera.jpg',
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    price: 45.0,
    rating: 4,
    reviews: '500+',
    imageUrl: 'https://i.ibb.co/xSJYwFtV/Bluetooth-Speaker.jpg',
  },
  {
    id: 5,
    name: 'Smart Thermostat',
    price: 129.0,
    rating: 4.5,
    reviews: '210+',
    imageUrl: 'https://i.ibb.co/1fxjfHbD/Smart-Thermostat.jpg',
  },
  {
    id: 6,
    name: 'Action Camera',
    price: 199.0,
    rating: 5,
    reviews: '180+',
    imageUrl: 'https://i.ibb.co/bjtDsrPJ/Action-Camera.jpg',
  },
  {
    id: 7,
    name: 'Portable Projector',
    price: 150.0,
    rating: 4,
    reviews: '90+',
    imageUrl: 'https://i.ibb.co/yckP7N66/Portable-Projector.jpg',
  },
  {
    id: 8,
    name: 'Wireless Keyboard',
    price: 55.0,
    rating: 4.5,
    reviews: '250+',
    imageUrl: 'https://i.ibb.co/wN0TgRdv/Wireless-Keyboard.jpg',
  },
];

const ProductGrid = () => {
  return (
    <section className="bg-[#F8EFBA] text-black w-full  mx-auto p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <header className="flex flex-wrap justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">
          Smart Home & Gadgets
        </h2>
        <nav className="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">
          <Link href="#" className="font-medium text-blue-600">
            All
          </Link>
          <Link
            href="#"
            className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Smart Home
          </Link>
          <Link
            href="#"
            className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Audio
          </Link>
          <Link
            href="#"
            className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Cameras
          </Link>
          <Link
            href="#"
            className="font-medium text-gray-600 hover:text-blue-600 transition-colors"
          >
            Others
          </Link>
        </nav>
      </header>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {productData.map(product => (
          <div
            key={product.id}
            className="group bg-gray-50 p-4 rounded-lg border border-gray-200 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative h-52 w-full mb-4">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                style={{ objectFit: 'contain' }}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {product.name}
            </h3>
            <p className="text-xl font-bold text-green-600 my-2">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex justify-center items-center gap-1.5 text-gray-500 text-sm">
              <div className="text-yellow-400">
                {/* Simple star rating logic */}
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i
                  className={
                    product.rating >= 4.5
                      ? 'fas fa-star-half-alt'
                      : product.rating >= 4
                      ? 'fas fa-star'
                      : 'far fa-star'
                  }
                ></i>
                <i
                  className={
                    product.rating >= 5 ? 'fas fa-star' : 'far fa-star'
                  }
                ></i>
              </div>
              <span>({product.reviews})</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
