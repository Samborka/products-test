import { useState } from 'react';
import './styles.css'

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

export default function FilterColumn({products, selectedCategories, handleCategoryChange} : {products: Product[], selectedCategories: string[], handleCategoryChange: React.ChangeEventHandler<HTMLInputElement>}) {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const countProductsInCategory = (categoryId: string) => {
    return products.filter(product => product.category._id === categoryId).length;
  };

  function toggleFilter() {
    setIsFilterExpanded(!isFilterExpanded);
  }

  return(
    <aside className="filters">
      <header onClick={toggleFilter} className='filter-header'>
        Filtrar por Categoria:
        <img src="src/assets/down-arrow.svg" alt="" className={`down-arrow ${isFilterExpanded ? '' : 'contracted'}`}/>
      </header>
      <div className={`filters-container ${isFilterExpanded ? '' : 'contracted'}`}>
        {products
          .map((product) => product.category)
          .filter(
            (category, index, array) =>
              array.findIndex((categoryItem) => categoryItem._id === category._id) === index
          )
          .map((category) => (
            <div key={category._id} className="filters-item">
              <input
                className='checkbox-input'
                type="checkbox"
                value={category._id}
                checked={selectedCategories.includes(category._id)}
                onChange={handleCategoryChange}
              />
              <label htmlFor={category.name}>{category.name} ({countProductsInCategory(category._id)})</label>
            </div>
          ))}
        </div>
    </aside>
  )
}