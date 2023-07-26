"use client";

import { useEffect, useState } from "react";

interface Beer {
  id: number;
  name: string;
  tagline: string;
  // Add other properties you want to display
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Beer[]>([]);
  const [page, setPage] = useState(1);

  const fetchProducts = async (page: number) => {
    const perPage = 20;
    const apiUrl = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${perPage}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const loadMoreProducts = async () => {
    const nextPage = page + 1;
    const newProducts = await fetchProducts(nextPage);
    setProducts((prevProducts) => [...prevProducts, ...newProducts]);
    setPage(nextPage);
  };

  useEffect(() => {
    fetchProducts(page).then((data) => setProducts(data));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Punk API Products Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded shadow p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p>{product.tagline}</p>
          </div>
        ))}
      </div>
      <button
        onClick={loadMoreProducts}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Load More
      </button>
    </div>
  );
};

export default ProductsPage;
