import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { categories } from '../data/products';

interface CategoryGridProps {
  onCategorySelect: (category: string) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onCategorySelect }) => {
  const categoryStats = [
    { id: 'men', items: '500+ Items', trending: 'Formal Wear' },
    { id: 'women', items: '750+ Items', trending: 'Summer Dresses' },
    { id: 'accessories', items: '200+ Items', trending: 'Handbags' }
  ];

  return (
    <div className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Discover our curated collections designed for every style and occasion
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => {
            const stats = categoryStats.find(stat => stat.id === category.id);
            return (
              <div
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className="group relative h-80 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-500 shadow-xl hover:shadow-2xl card-hover"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 animate-fade-in-up">
                    <div className="flex items-center space-x-2 mb-3">
                      <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 animate-pulse" />
                      <span className="text-orange-400 text-xs sm:text-sm font-medium">
                        Trending: {stats?.trending}
                      </span>
                    </div>
                    
                    <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2 group-hover:text-orange-300 transition-colors duration-300">
                      {category.name}
                    </h3>
                    
                    <p className="text-white/80 text-base sm:text-lg mb-4">
                      {stats?.items}
                    </p>
                    
                    <div className="flex items-center text-white group-hover:text-orange-300 transition-colors duration-300">
                      <span className="font-semibold mr-2 text-sm sm:text-base">Explore Collection</span>
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 transform group-hover:translate-x-2 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-4 border-transparent group-hover:border-orange-400 rounded-2xl sm:rounded-3xl transition-all duration-500 group-hover:shadow-orange-400/50" />
              </div>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            onClick={() => onCategorySelect('all')}
            className="btn-primary text-lg px-8 py-4 animate-pulse-slow"
          >
            ✨ View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;