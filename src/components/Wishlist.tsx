import React, { useState, useEffect } from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { products } from '../data/products';
import { Product } from '../types';

interface WishlistProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const Wishlist: React.FC<WishlistProps> = ({ isOpen, onClose, onAddToCart }) => {
  const { user } = useAuth();
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  useEffect(() => {
    if (isOpen && user) {
      const likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');
      const wishlistProducts = products.filter(product => likedItems.includes(product.id));
      setWishlistItems(wishlistProducts);
    }
  }, [isOpen, user]);

  const removeFromWishlist = (productId: string) => {
    const likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');
    const newLikedItems = likedItems.filter((id: string) => id !== productId);
    localStorage.setItem('likedItems', JSON.stringify(newLikedItems));
    
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id);
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Sign In Required</h2>
          <p className="text-slate-600 mb-6">Please sign in to view your wishlist</p>
          <button
            onClick={onClose}
            className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <Heart className="h-6 w-6 mr-2 text-red-500" />
            My Wishlist ({wishlistItems.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto max-h-96 p-6">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">Your wishlist is empty</p>
              <p className="text-slate-400 text-sm mt-2">Add some items you love to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {wishlistItems.map((product) => (
                <div key={product.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex space-x-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800 mb-1">{product.name}</h3>
                      <p className="text-sm text-orange-500 mb-2">{product.brand}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">₹{product.price.toLocaleString()}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => removeFromWishlist(product.id)}
                            className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                            title="Remove from Wishlist"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {wishlistItems.length > 0 && (
          <div className="border-t p-6">
            <button
              onClick={() => {
                wishlistItems.forEach(product => handleAddToCart(product));
              }}
              className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200"
            >
              Add All to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;