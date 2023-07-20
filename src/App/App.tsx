import InputSearch from '../components/InputSearch';
import ProductCard from '../components/ProductCard';

import FilterColumn from '../components/FilterColumn';
import './App.css';
import UseApp from './UseApp';


function App() {
  const {
    searchTerm,
    filteredProducts,
    handleCategoryChange,
    handleChangeSearchTerm,
    products,
    productsNumber,
    selectedCategories
  } = UseApp();

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
