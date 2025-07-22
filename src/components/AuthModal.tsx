import React, { useState } from 'react';
import { X, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const { login, register, isLoading, user, logout } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      onClose();
    } catch (error) {
      setErrors({ general: 'Authentication failed. Please try again.' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogout = () => {
    logout();
    // Clear user-specific data
    localStorage.removeItem('likedItems');
    // Dispatch event to update wishlist count
    window.dispatchEvent(new Event('wishlistUpdated'));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {user ? 'Account' : isLogin ? 'Sign In' : 'Sign Up'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {user ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-slate-800">{user.name}</h3>
                <p className="text-slate-600">{user.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => {
                  onClose();
                  // Open order history modal
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('openOrderHistory'));
                  }, 100);
                }}
                className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
              >
                Order History
              </button>
              <button 
                onClick={() => {
                  onClose();
                  // Open profile settings modal
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('openProfileSettings'));
                  }, 100);
                }}
                className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
              >
                Profile Settings
              </button>
              <button 
                onClick={() => {
                  onClose();
                  // Open wishlist
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('openWishlist'));
                  }, 100);
                }}
                className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
              >
                Saved Items
              </button>
              <button 
                onClick={() => {
                  onClose();
                  // Open notifications
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('openNotifications'));
                  }, 100);
                }}
                className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
              >
                Notifications
              </button>
              <button 
                onClick={() => {
                  onClose();
                  // Open address book
                  setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('openAddressBook'));
                  }, 100);
                }}
                className="w-full text-left px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors duration-200"
              >
                Address Book
              </button>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                  required
                />
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errors.general && (
              <div className="text-red-500 text-sm">{errors.general}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-orange-500 hover:text-orange-600 transition-colors duration-200"
              >
                {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;