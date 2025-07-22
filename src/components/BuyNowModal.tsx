import React, { useState } from 'react';
import { X, CreditCard, MapPin, User, Zap } from 'lucide-react';
import { Product } from '../types';
import { useAuth } from '../context/AuthContext';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface BuyNowModalProps {
  product: Product | null;
  size: string;
  color: string;
  quantity: number;
  isOpen: boolean;
  onClose: () => void;
}

const BuyNowModal: React.FC<BuyNowModalProps> = ({ 
  product, 
  size, 
  color, 
  quantity, 
  isOpen, 
  onClose 
}) => {
  const { user } = useAuth();
  const [orderComplete, setOrderComplete] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  if (!isOpen || !product) return null;

  const total = product.price * quantity;
  const totalWithTax = total * 1.18; // 18% GST

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?');
      return;
    }

    const amountInPaise = Math.round(totalWithTax * 100);

    const options = {
      key: 'rzp_test_9999999999',
      amount: amountInPaise,
      currency: 'INR',
      name: 'AKStyleHub',
      description: `${product.name} - ${size} - ${color}`,
      image: '/logo.png',
      handler: function (response: any) {
        console.log('Payment successful:', response);
        setOrderComplete(true);
        
        // Save order to localStorage for order history
        const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        const newOrder = {
          id: Date.now().toString(),
          orderNumber: `AK${Date.now().toString().slice(-8)}`,
          date: new Date().toISOString(),
          status: 'confirmed',
          total: totalWithTax,
          items: [{
            id: product.id,
            name: product.name,
            brand: product.brand,
            image: product.images[0],
            price: product.price,
            quantity: quantity,
            size: size,
            color: color
          }],
          shippingAddress: {
            name: `${formData.firstName} ${formData.lastName}`,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode
          }
        };
        orders.unshift(newOrder);
        localStorage.setItem('userOrders', JSON.stringify(orders));
        
        setTimeout(() => {
          onClose();
          setOrderComplete(false);
        }, 3000);
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      notes: {
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`,
        product: product.name,
        size: size,
        color: color,
        quantity: quantity.toString()
      },
      theme: {
        color: '#f97316'
      },
      modal: {
        ondismiss: function() {
          setIsProcessing(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || 
        !formData.address || !formData.city || !formData.state || 
        !formData.zipCode || !formData.phone) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    await handleRazorpayPayment();
  };

  if (orderComplete) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Order Successful!</h2>
          <p className="text-slate-600 mb-4">Thank you for your purchase. You'll receive a confirmation email shortly.</p>
          <div className="text-sm text-slate-500">
            Order #AK{Date.now().toString().slice(-8)}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center">
            <Zap className="h-6 w-6 mr-2 text-green-500" />
            Quick Buy
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6">
          {/* Order Summary */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <div className="flex space-x-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800">{product.name}</h4>
                  <p className="text-sm text-slate-600">{product.brand}</p>
                  <p className="text-sm text-slate-600">Size: {size} • Color: {color}</p>
                  <p className="text-sm text-slate-600">Qty: {quantity}</p>
                </div>
                <span className="font-medium text-slate-800">₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>₹{(total * 0.18).toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total</span>
                <span>₹{totalWithTax.toFixed(0)}</span>
              </div>
            </div>
          </div>

          {/* Quick Checkout Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email address *"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name *"
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name *"
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number *"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Address
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street address *"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City *"
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State *"
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  placeholder="PIN code *"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>
            </div>

            {/* Payment Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src="https://razorpay.com/assets/razorpay-logo.svg" 
                    alt="Razorpay" 
                    className="h-6"
                  />
                  <span className="text-sm text-slate-600">Secure payment powered by Razorpay</span>
                </div>
                <p className="text-sm text-slate-600">
                  Supports UPI, Cards, Net Banking, Wallets and more
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Zap className="h-5 w-5" />
              <span>{isProcessing ? 'Processing...' : `Pay ₹${totalWithTax.toFixed(0)} & Buy Now`}</span>
            </button>

            <div className="text-xs text-slate-500 text-center">
              By placing this order, you agree to our Terms of Service and Privacy Policy.
              Your payment information is secure and encrypted.
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;