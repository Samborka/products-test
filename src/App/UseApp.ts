import { useCallback, useEffect, useMemo, useState } from "react";
import ProductsService from "../services/ProductsService";

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

export default function UseApp(){

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

  return{
    searchTerm,
    handleChangeSearchTerm,
    products,
    selectedCategories,
    handleCategoryChange,
    productsNumber,
    filteredProducts
  }
}