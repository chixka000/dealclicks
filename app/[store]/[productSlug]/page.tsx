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

const getProductsList = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
    next: { revalidate: 10 } // Refetch Every 10 secs 
  });
  return res.json();
};

const ProductsPage = async ({
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
  const productsList = await getProductsList();
  return (
    <div className="bg-white p-4">
      <header className="text-2xl font-bold my-5 text-center">
        {storeName ? `${storeName} - ` : ""}
        {productCategory}
      </header>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productsList.map((product: any) => {
          return <p>{product.title}</p>;
        })}
      </div>
    </div>
  );
};

export default ProductsPage;
