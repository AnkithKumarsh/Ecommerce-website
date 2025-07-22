import React, { useState } from 'react';
import { Star, ShoppingCart, Heart, Eye, Share2, Zap, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onAddToCart: (product: Product) => void;
  onBuyNow?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onAddToCart, onBuyNow }) => {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quickQuantity, setQuickQuantity] = useState(1);
  
  // Get liked status from localStorage or user preferences
  const getLikedStatus = () => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');
    return likedItems.includes(product.id);
  };
  
  const [isLiked, setIsLiked] = useState(getLikedStatus());

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);
    onAddToCart(product);
    setTimeout(() => setIsAddingToCart(false), 1000);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuyNow) {
      onBuyNow(product);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      // If user is not logged in, show a message or redirect to login
      alert('Please log in to add items to your wishlist');
      return;
    }
    
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');
    const newLikedItems = isLiked 
      ? likedItems.filter((id: string) => id !== product.id)
      : [...likedItems, product.id];
    localStorage.setItem('likedItems', JSON.stringify(newLikedItems));
    setIsLiked(!isLiked);
    
    // Dispatch event to update wishlist count
    window.dispatchEvent(new Event('wishlistUpdated'));
    
    // Show feedback message
    const message = !isLiked ? 'Added to wishlist ❤️' : 'Removed from wishlist';
    // Create a temporary toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement share functionality
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div 
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group overflow-hidden border border-slate-100 hover:border-orange-200 transform hover:scale-[1.02]"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.originalPrice && (
            <div className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {discountPercentage}% OFF
            </div>
          )}
          {product.featured && (
            <div className="bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              Featured
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          <button
            onClick={handleLike}
            className={`p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 ${
              isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={onClick}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-slate-600 hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
          <button
            onClick={handleShare}
            className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-slate-600 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
          </button>
        </div>

        {/* Quick Action Buttons */}
        <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {/* Quick Quantity Selector */}
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-2 mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600">Qty:</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickQuantity(Math.max(1, quickQuantity - 1));
                }}
                className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors duration-200"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="text-sm font-medium w-6 text-center">{quickQuantity}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickQuantity(quickQuantity + 1);
                }}
                className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors duration-200"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`text-white py-2 px-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-1 shadow-lg text-xs sm:text-sm ${
                isAddingToCart 
                  ? 'bg-green-500 scale-95' 
                  : 'bg-orange-500 hover:bg-orange-600 hover:scale-105'
              }`}
            >
              {isAddingToCart ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="hidden sm:inline">Added!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">Add</span>
                </>
              )}
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-green-500 text-white py-2 px-3 rounded-xl font-medium hover:bg-green-600 transition-all duration-300 flex items-center justify-center space-x-1 shadow-lg text-xs sm:text-sm"
            >
              <Zap className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Buy</span>
            </button>
          </div>
        </div>

        {/* Image Navigation Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="p-3 sm:p-5">
        <div className="mb-2">
          <p className="text-xs sm:text-sm text-orange-500 font-medium">{product.brand}</p>
          <h3 className="font-semibold text-slate-800 mb-1 line-clamp-2 group-hover:text-orange-500 transition-colors duration-300 text-sm sm:text-base">
            {product.name}
          </h3>
        </div>
        
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'
                }`} 
              />
            ))}
            <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-slate-600">{product.rating}</span>
          </div>
          <span className="mx-1 sm:mx-2 text-slate-300">•</span>
          <span className="text-xs sm:text-sm text-slate-600">{product.reviews} reviews</span>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <span className="text-lg sm:text-xl font-bold text-slate-800">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm text-slate-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <div className="flex space-x-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-sm"
                style={{ 
                  backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' : 
                                 color.toLowerCase() === 'black' ? '#000000' :
                                 color.toLowerCase() === 'gray' ? '#6b7280' :
                                 color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                 color.toLowerCase() === 'brown' ? '#92400e' :
                                 color.toLowerCase()
                }}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-slate-500 ml-1 flex items-center">+{product.colors.length - 3}</span>
            )}
          </div>
        </div>

        {/* Size Options Preview */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            {product.sizes.slice(0, 4).map((size, index) => (
              <span key={index} className="text-xs bg-slate-100 text-slate-600 px-1.5 sm:px-2 py-1 rounded">
                {size}
              </span>
            ))}
            {product.sizes.length > 4 && (
              <span className="text-xs text-slate-500">+{product.sizes.length - 4}</span>
            )}
          </div>
          
          <div className={`text-xs font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
            {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;