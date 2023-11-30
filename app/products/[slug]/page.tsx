// pages/products.tsx
import React from 'react';

// Assuming you have a Product type or interface defined
// interface Product {
//   id: number;
//   name: string;
//   description: string;
//   price: number;
//   inStock: boolean;
// }

// Dummy data - replace this with real data fetching logic
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'This is a great product',
    price: 29.99,
    inStock: true,
    imageUrl: 'https://via.placeholder.com/150' // Placeholder image URL
  },
  // ... more products
];
const ProductsPage = () => {
  return (
    <div className="container mx-auto px-4">
      <header className="text-2xl font-bold my-5">Our Products</header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="object-cover h-48 w-full rounded-lg" // Adjust size and styling as needed
            />
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-green-600">${product.price}</p>
            <p className={product.inStock ? 'text-green-500' : 'text-red-500'}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;