import React, { useState, useMemo } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { useCart } from './context/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';
import Checkout from './components/Checkout';
import BuyNowModal from './components/BuyNowModal';
import Wishlist from './components/Wishlist';
import OrderHistory from './components/OrderHistory';
import ProfileSettings from './components/ProfileSettings';
import Notifications from './components/Notifications';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import { products } from './data/products';
import { Product } from './types';

const AppContent: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isOrderHistoryOpen, setIsOrderHistoryOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(true);
  
  // Buy Now Modal State
  const [isBuyNowOpen, setIsBuyNowOpen] = useState(false);
  const [buyNowProduct, setBuyNowProduct] = useState<{
    product: Product;
    size: string;
    color: string;
    quantity: number;
  } | null>(null);

  const { addItem } = useCart();

  // Listen for custom events from AuthModal
  React.useEffect(() => {
    const handleOpenOrderHistory = () => setIsOrderHistoryOpen(true);
    const handleOpenProfileSettings = () => setIsProfileSettingsOpen(true);
    const handleOpenWishlist = () => setIsWishlistOpen(true);
    const handleOpenNotifications = () => setIsNotificationsOpen(true);

    window.addEventListener('openOrderHistory', handleOpenOrderHistory);
    window.addEventListener('openProfileSettings', handleOpenProfileSettings);
    window.addEventListener('openWishlist', handleOpenWishlist);
    window.addEventListener('openNotifications', handleOpenNotifications);

    return () => {
      window.removeEventListener('openOrderHistory', handleOpenOrderHistory);
      window.removeEventListener('openProfileSettings', handleOpenProfileSettings);
      window.removeEventListener('openWishlist', handleOpenWishlist);
      window.removeEventListener('openNotifications', handleOpenNotifications);
    };
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (showFeaturedOnly && selectedCategory === 'all' && !searchQuery) {
      filtered = filtered.filter(product => product.featured);
    }

    return filtered;
  }, [selectedCategory, searchQuery, showFeaturedOnly]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowFeaturedOnly(false);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchQuery('');
    setShowFeaturedOnly(false);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddToCart = (product: Product, size?: string, color?: string, quantity?: number) => {
    addItem(
      product,
      size || product.sizes[0],
      color || product.colors[0],
      quantity || 1
    );
  };

  const handleBuyNow = (product: Product, size?: string, color?: string, quantity?: number) => {
    setBuyNowProduct({
      product,
      size: size || product.sizes[0],
      color: color || product.colors[0],
      quantity: quantity || 1
    });
    setIsBuyNowOpen(true);
  };

  const handleBuyNowFromModal = (product: Product, size: string, color: string, quantity: number) => {
    setBuyNowProduct({ product, size, color, quantity });
    setSelectedProduct(null);
    setIsBuyNowOpen(true);
  };

  const handleShopNow = () => {
    setShowFeaturedOnly(false);
    setSelectedCategory('all');
    setSearchQuery('');
  };

  // Dynamic SEO based on current page state
  const getSEOData = () => {
    if (selectedProduct) {
      return {
        title: `${selectedProduct.name} - ${selectedProduct.brand} | AKStyleHub`,
        description: `${selectedProduct.description} Shop ${selectedProduct.name} by ${selectedProduct.brand} at AKStyleHub. Price: ₹${selectedProduct.price.toLocaleString()}`,
        keywords: `${selectedProduct.name}, ${selectedProduct.brand}, ${selectedProduct.category}, fashion, clothing`,
        image: selectedProduct.images[0]
      };
    }
    
    if (selectedCategory !== 'all') {
      const categoryName = selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
      return {
        title: `${categoryName} Collection - Premium Fashion | AKStyleHub`,
        description: `Explore our premium ${categoryName.toLowerCase()} collection. Latest trends, quality guaranteed. Free shipping on orders over ₹999.`,
        keywords: `${categoryName.toLowerCase()}, fashion, clothing, premium, AKStyleHub`
      };
    }
    
    if (searchQuery) {
      return {
        title: `Search Results for "${searchQuery}" | AKStyleHub`,
        description: `Find the best fashion items for "${searchQuery}" at AKStyleHub. Premium quality clothing and accessories.`,
        keywords: `${searchQuery}, fashion, clothing, search, AKStyleHub`
      };
    }
    
    return {};
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead {...getSEOData()} />
      
      <Header
        onSearch={handleSearch}
        onCategoryChange={handleCategoryChange}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />

      <main>
        {showFeaturedOnly && selectedCategory === 'all' && !searchQuery && (
          <>
            <Hero onShopNow={handleShopNow} />
            <CategoryGrid onCategorySelect={handleCategoryChange} />
          </>
        )}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {!showFeaturedOnly && (
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 space-y-4 lg:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
                  {selectedCategory === 'all' ? 'All Products' : 
                   selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                  {searchQuery && ` • "${searchQuery}"`}
                </h1>
                <p className="text-slate-600">
                  {filteredProducts.length} products found
                </p>
              </div>
              
              {/* Breadcrumb */}
              <nav className="flex items-center space-x-2 text-sm text-slate-600">
                <button 
                  onClick={() => {
                    setShowFeaturedOnly(true);
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="hover:text-orange-500 transition-colors duration-200"
                >
                  Home
                </button>
                <span>/</span>
                <span className="text-slate-800 font-medium">
                  {selectedCategory === 'all' ? 'All Products' : 
                   selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </span>
              </nav>
            </div>
          )}

          <ProductGrid
            products={filteredProducts}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
          />
        </div>
      </main>

      <Footer />

      {/* Modals */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNowFromModal}
        />
      )}

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <BuyNowModal
        product={buyNowProduct?.product || null}
        size={buyNowProduct?.size || ''}
        color={buyNowProduct?.color || ''}
        quantity={buyNowProduct?.quantity || 1}
        isOpen={isBuyNowOpen}
        onClose={() => {
          setIsBuyNowOpen(false);
          setBuyNowProduct(null);
        }}
      />

      <Wishlist
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <OrderHistory
        isOpen={isOrderHistoryOpen}
        onClose={() => setIsOrderHistoryOpen(false)}
      />

      <ProfileSettings
        isOpen={isProfileSettingsOpen}
        onClose={() => setIsProfileSettingsOpen(false)}
      />

      <Notifications
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
};

export default App;