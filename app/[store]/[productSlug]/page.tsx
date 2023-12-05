"use client";

import React from "react";
import Image from "next/image";
import noImage from "../../../public/images/sample.jpg";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  inStock: boolean;
  imageUrl: string;
}
// Dummy data - replace this with real data fetching logic
const products: Product[] = [
  {
    id: 1,
    name: "Product 1",
    description: "This is a great product",
    price: 29.99,
    inStock: true,
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 1,
    name: "Product 1",
    description: "This is a great product",
    price: 29.99,
    inStock: true,
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 1,
    name: "Product 1",
    description: "This is a great product",
    price: 29.99,
    inStock: true,
    imageUrl: "https://via.placeholder.com/150"
  },
  {
    id: 1,
    name: "Product 1",
    description: "This is a great product",
    price: 29.99,
    inStock: true,
    imageUrl: "https://via.placeholder.com/150"
  }
  // ... more products
];
const ProductsPage = ({
  params
}: {
  params: { store: string; productSlug: string };
}) => {
  const { store, productSlug } = params;
  // Function to convert slug to capitalized format
  const capitalizeSlug = (slug: string) => {
    return slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const storeName = capitalizeSlug(store);
  const productCategory = capitalizeSlug(productSlug);
  return (
    <div className="bg-white p-4">
      <header className="text-2xl font-bold my-5 text-center">
        {storeName ? `${storeName} - ` : ""}
        {productCategory}
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded-lg shadow-md">
            <div className="mb-2">
              <div className="relative w-full h-0 pb-[60%]">
                {/* Adjust the padding-bottom value based on the aspect ratio */}
                <Image
                  src={noImage}
                  alt={product.name}
                  layout="fill" // Use the "fill" layout
                  objectFit="cover" // This will cover the area of the parent container without stretching the image
                  className="rounded-lg"
                />
              </div>
            </div>
            <div className="flex justify-between items-baseline mb-4">
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <span className="text-lg font-semibold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>
            <p className="text-sm text-gray-700 mb-4">{product.description}</p>
            <div className="text-right">
              <span
                className={product.inStock ? "text-green-500" : "text-red-500"}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
