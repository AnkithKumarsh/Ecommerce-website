import React from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, onCheckout }) => {
  const { items, total, updateQuantity, removeItem } = useCart();
  const [removingItems, setRemovingItems] = React.useState<Set<string>>(new Set());

  const handleRemoveItem = (itemId: string) => {
    setRemovingItems(prev => new Set(prev).add(itemId));
    setTimeout(() => {
      removeItem(itemId);
      setRemovingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <ShoppingBag className="h-6 w-6 mr-2" />
            Shopping Cart ({items.length})
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto max-h-96">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <div className="relative">
                <ShoppingBag className="h-20 w-20 text-slate-300 mx-auto mb-6 animate-pulse" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-500 text-xl">✨</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-slate-700 mb-2">Your cart is empty</h3>
              <p className="text-slate-500 mb-6">Discover amazing products and add them to your cart</p>
              <button 
                onClick={onClose}
                className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="p-6 space-y-6">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className={`flex space-x-4 border-b border-slate-200 pb-6 transition-all duration-300 ${
                    removingItems.has(item.id) ? 'opacity-50 scale-95 transform' : ''
                  }`}
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800 hover:text-orange-500 transition-colors duration-200 cursor-pointer">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-slate-600">{item.product.brand}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        Size: {item.size}
                      </span>
                      <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
                        {item.color}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all duration-200 hover:scale-110"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium bg-slate-50 py-1 rounded">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center hover:border-orange-500 hover:text-orange-500 transition-all duration-200 hover:scale-110"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-lg text-slate-800">
                          ₹{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all duration-200 hover:scale-110"
                          title="Remove item"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-6">
            {/* Savings Display */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-green-700 font-medium">🎉 You're saving:</span>
                <span className="text-green-700 font-bold">₹{Math.round(total * 0.15).toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="text-lg font-semibold text-slate-800">Total:</span>
                <p className="text-xs text-slate-500">Including all taxes</p>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-800">₹{total.toLocaleString()}</span>
                <p className="text-xs text-green-600">Free shipping included</p>
              </div>
            </div>
            
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-4 px-6 rounded-xl font-medium hover:from-orange-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            
            <p className="text-xs text-slate-500 text-center mt-3">
              🔒 Secure checkout with 256-bit SSL encryption
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;