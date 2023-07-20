import React, { useCallback, useEffect, useMemo, useState } from 'react';
import InputSearch from './components/InputSearch';
import ProductsService from './services/ProductsService';
import ProductCard from './components/ProductCard';

import './App.css';
import FilterColumn from './components/FilterColumn';

interface Product {
  id: string;
  name: string;
  shortDescription: string;
  images: [
    {
      alt: string;
      asset: {
        url: string;
      };
    }
  ];
  category: {
    _id: string;
    name: string;
  };
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const hasSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const hasSelectedCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.category._id);

      return hasSearchTerm && hasSelectedCategory;
    });
  }, [searchTerm, selectedCategories, products]);

  function handleChangeSearchTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleCategoryChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = event.target;
    setSelectedCategories((prevSelected) =>
      checked ? [...prevSelected, value] : prevSelected.filter((item) => item !== value)
    );
  }

  const loadProducts = useCallback(async () => {
    const products = await ProductsService.getProducts();
    const productsList: Product[] = products.data.nodes;

    setProducts(productsList);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const productsNumber = filteredProducts.length;

  return (
    <main>
      <h1>
        O QUE VOCÊ <strong>ESTÁ PROCURANDO?</strong>
      </h1>

      <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />

      <div className='products-component'>
        <FilterColumn products={products} selectedCategories={selectedCategories} handleCategoryChange={handleCategoryChange}/>

        <div className="products">
          <div className="products-number">{`${productsNumber} resultados`}</div>
          <div className="products-container">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                imageUrl={product.images[0].asset.url}
                imageAlt={product.images[0].alt}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
