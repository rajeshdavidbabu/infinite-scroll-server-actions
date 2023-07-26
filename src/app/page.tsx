"use client";

import { useEffect, useState } from "react";
import { LoadMore } from "@/components/load-more";

interface Beer {
  id: number;
  name: string;
  tagline: string;
  image_url: string;
  // Add other properties you want to display
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Beer[]>([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async (page: number) => {
    const perPage = 50;
    const apiUrl = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  const loadMoreProducts = async () => {
    // Once the page 8 is reached repeat the process all over again.
    await delay(2000);
    const nextPage = (page % 7) + 1;
    const newProducts = await fetchProducts(nextPage);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    fetchProducts(page).then((data) => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Infinite Drinks</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4">
            <div className="mb-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="object-contain w-full h-48 rounded"
              />
            </div>
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p>{product.tagline}</p>
          </div>
        ))}
      </div>
      <LoadMore onLoadMore={loadMoreProducts} />
    </div>
  );
};

export default ProductsPage;
