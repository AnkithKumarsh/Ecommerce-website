import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, Heart, Bell, MapPin, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onCartClick: () => void;
  onAuthClick: () => void;
  onWishlistClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, onCategoryChange, onCartClick, onAuthClick, onWishlistClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { user } = useAuth();
  
  // Get wishlist count
  const getWishlistCount = () => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');
    return likedItems.length;
  };
  
  const [wishlistCount, setWishlistCount] = useState(getWishlistCount());
  
  // Update wishlist count when storage changes
  React.useEffect(() => {
    const handleStorageChange = () => {
      setWishlistCount(getWishlistCount());
    };
    
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom events when wishlist is updated
    window.addEventListener('wishlistUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('wishlistUpdated', handleStorageChange);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const categories = [
    { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'men', name: 'Men', icon: '👔' },
    { id: 'women', name: 'Women', icon: '👗' },
    { id: 'accessories', name: 'Accessories', icon: '👜' }
  ];

  const quickLinks = [
    { name: 'New Arrivals', badge: 'New' },
    { name: 'Sale', badge: 'Hot' },
    { name: 'Best Sellers', badge: null }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-slate-900 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm space-y-1 sm:space-y-0">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span className="hidden sm:inline">Free shipping on orders over ₹999</span>
              <span className="sm:hidden">Free shipping ₹999+</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="hidden md:inline">📞 1800-123-4567</span>
            <span className="hidden sm:inline">📧 support@stylehub.com</span>
            <span className="sm:hidden">📞 1800-123-4567</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-2 rounded-lg mr-2 sm:mr-3">
                <span className="text-lg sm:text-xl font-bold">AK</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  AKStyleHub
                </h1>
                <p className="text-xs text-slate-500">Fashion & Style</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                  AKStyleHub
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-1">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  className="flex items-center space-x-2 text-slate-600 hover:text-orange-500 px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-orange-50 rounded-lg group"
                >
                  <span className="group-hover:scale-110 transition-transform duration-200">
                    {category.icon}
                  </span>
                  <span>{category.name}</span>
                </button>
              ))}
            </nav>

            {/* Enhanced Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md lg:max-w-xl mx-4 lg:mx-8">
              <div className={`relative w-full transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Search products, brands..."
                  className="w-full pl-10 sm:pl-12 pr-4 py-2 sm:py-3 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-slate-50 focus:bg-white text-sm sm:text-base"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </form>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <button 
                onClick={onWishlistClick}
                className="relative p-2 lg:p-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-200"
              >
                <Heart className="h-4 w-4 lg:h-5 lg:w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 lg:h-4 lg:w-4 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              
              <button 
                onClick={() => {
                  if (user) {
                    window.dispatchEvent(new CustomEvent('openNotifications'));
                  } else {
                    alert('Please sign in to view notifications');
                  }
                }}
                className="relative p-2 lg:p-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-200"
              >
                <Bell className="h-4 w-4 lg:h-5 lg:w-5" />
                {user && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-3 w-3 lg:h-4 lg:w-4 flex items-center justify-center">
                    3
                  </span>
                )}
              </button>

              <button
                onClick={onAuthClick}
                className="relative flex items-center space-x-2 text-slate-600 hover:text-orange-500 px-2 lg:px-4 py-2 hover:bg-orange-50 rounded-xl transition-all duration-200 group"
                onMouseEnter={() => user && setIsUserMenuOpen(true)}
                onMouseLeave={() => setIsUserMenuOpen(false)}
              >
                <div className="relative">
                  <User className="h-4 w-4 lg:h-5 lg:w-5" />
                  {user && (
                    <div className="absolute -bottom-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="text-left hidden lg:block">
                  <div className="text-sm font-medium">
                    {user ? user.name.split(' ')[0] : 'Sign In'}
                  </div>
                  {user && <div className="text-xs text-slate-500">Welcome back!</div>}
                </div>
                {user && <ChevronDown className="h-3 w-3 transition-transform duration-200 group-hover:rotate-180" />}
                
                {/* User Dropdown Menu */}
                {user && isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 transform opacity-100 scale-100 transition-all duration-200">
                    <div className="px-4 py-3 border-b border-slate-100">
                      <div className="flex items-center space-x-3">
                        <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                        <div>
                          <p className="font-medium text-slate-800">{user.name}</p>
                          <p className="text-sm text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button 
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          window.dispatchEvent(new CustomEvent('openOrderHistory'));
                        }}
                        className="w-full text-left px-4 py-2 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>📦</span>
                        <span>My Orders</span>
                      </button>
                      <button 
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onWishlistClick();
                        }}
                        className="w-full text-left px-4 py-2 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>❤️</span>
                        <span>Wishlist</span>
                        {wishlistCount > 0 && (
                          <span className="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                            {wishlistCount}
                          </span>
                        )}
                      </button>
                      <button 
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          window.dispatchEvent(new CustomEvent('openProfileSettings'));
                        }}
                        className="w-full text-left px-4 py-2 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors duration-200 flex items-center space-x-2"
                      >
                        <span>⚙️</span>
                        <span>Settings</span>
                      </button>
                    </div>
                  </div>
                )}
              </button>

              <button
                onClick={onCartClick}
                className="relative flex items-center space-x-2 bg-orange-500 text-white px-3 lg:px-4 py-2 rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="h-4 w-4 lg:h-5 lg:w-5" />
                <span className="font-medium hidden lg:inline">Cart</span>
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 lg:h-6 lg:w-6 flex items-center justify-center font-bold animate-pulse">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center space-x-2">
              <button
                onClick={onCartClick}
                className="relative p-2 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-xl transition-all duration-200"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {itemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl text-slate-600 hover:text-orange-500 hover:bg-orange-50 transition-all duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Quick Links Bar - Desktop Only */}
          <div className="hidden lg:flex items-center justify-center py-3 border-t border-slate-100">
            <div className="flex items-center justify-center space-x-16">
              {quickLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (link.name === 'New Arrivals') {
                      onCategoryChange('all');
                      onSearch('new');
                    } else if (link.name === 'Sale') {
                      onCategoryChange('all');
                      onSearch('sale');
                    } else if (link.name === 'Best Sellers') {
                      onCategoryChange('all');
                      onSearch('best');
                    }
                  }}
                  className="relative text-sm text-slate-600 hover:text-orange-500 transition-colors duration-200 px-6 py-2 hover:bg-orange-50 rounded-lg group"
                >
                  <span className="relative">{link.name}</span>
                  {link.badge && (
                    <span className={`absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full text-white font-medium ${
                      link.badge === 'New' ? 'bg-green-500' : 'bg-red-500'
                    } transform translate-x-2 -translate-y-1`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-slate-200 py-4 bg-white">
              <form onSubmit={handleSearchSubmit} className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </form>
              
              <nav className="space-y-2 mb-6">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => {
                      onCategoryChange(category.id);
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full text-left px-4 py-3 text-slate-600 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200"
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                  </button>
                ))}
              </nav>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 text-slate-600 hover:text-orange-500 border border-slate-300 py-3 rounded-lg transition-all duration-200"
                >
                  <User className="h-5 w-5" />
                  <span className="font-medium">
                    {user ? user.name.split(' ')[0] : 'Sign In'}
                  </span>
                </button>
                <button 
                  onClick={() => {
                    onWishlistClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 text-slate-600 hover:text-orange-500 border border-slate-300 py-3 rounded-lg transition-all duration-200"
                >
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">Wishlist</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;