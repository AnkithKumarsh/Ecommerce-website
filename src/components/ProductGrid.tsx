import React, { useState } from 'react';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onProductClick, onAddToCart, onBuyNow }) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState(0);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'newest', label: 'Newest First' }
  ];

  const brands = [...new Set(products.map(p => p.brand))];

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return b.featured ? 1 : -1;
    }
  });

  const filteredProducts = sortedProducts.filter(product => {
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const matchesRating = selectedRating === 0 || product.rating >= selectedRating;
    return matchesPrice && matchesBrand && matchesRating;
  });

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 border border-slate-300 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors duration-200 w-full sm:w-auto justify-center sm:justify-start"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'grid' ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-orange-500 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <SortAsc className="h-4 w-4 text-slate-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 w-full sm:w-auto text-sm"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          <span className="text-slate-600 text-sm">
            {filteredProducts.length} of {products.length} products
          </span>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="50000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full accent-orange-500"
                />
                <div className="flex justify-between text-sm text-slate-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Brands */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Brands</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {brands.map(brand => (
                  <label key={brand} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBrands([...selectedBrands, brand]);
                        } else {
                          setSelectedBrands(selectedBrands.filter(b => b !== brand));
                        }
                      }}
                      className="rounded border-slate-300 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-slate-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Minimum Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map(rating => (
                  <label key={rating} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm text-slate-600">{rating}+ Stars</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setPriceRange([0, 50000]);
                  setSelectedBrands([]);
                  setSelectedRating(0);
                }}
                className="w-full bg-slate-100 text-slate-600 py-2 px-4 rounded-lg hover:bg-slate-200 transition-colors duration-200"
              >
                Clear All Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className={`grid gap-4 sm:gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}>
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick(product)}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 sm:py-24">
          <div className="relative mb-8">
            <div className="text-6xl sm:text-8xl mb-4 animate-bounce">🔍</div>
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center animate-pulse">
              <span className="text-orange-500 text-xl">💫</span>
            </div>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3">No products found</h3>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            We couldn't find any products matching your criteria. Try adjusting your filters or search terms to discover amazing items.
          </p>
          <button
            onClick={() => {
              setPriceRange([0, 50000]);
              setSelectedBrands([]);
              setSelectedRating(0);
            }}
            className="btn-primary"
          >
            🔄 Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;