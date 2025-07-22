import React, { useState, useEffect } from 'react';
import { X, Package, Truck, CheckCircle, Clock, Eye, Download } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    id: string;
    name: string;
    brand: string;
    image: string;
    price: number;
    quantity: number;
    size: string;
    color: string;
  }>;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  trackingNumber?: string;
}

interface OrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (isOpen && user) {
      // Get orders from localStorage
      const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      
      // If no saved orders, show mock data
      const mockOrders: Order[] = savedOrders.length > 0 ? savedOrders : [
        {
          id: '1',
          orderNumber: 'AK2024001',
          date: '2024-01-15',
          status: 'delivered',
          total: 15999,
          items: [
            {
              id: '1',
              name: 'Premium Cotton T-Shirt',
              brand: 'EcoWear',
              image: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=200',
              price: 2499,
              quantity: 2,
              size: 'M',
              color: 'Black'
            },
            {
              id: '2',
              name: 'Elegant Silk Blouse',
              brand: 'Luxe Collection',
              image: 'https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=200',
              price: 6599,
              quantity: 1,
              size: 'S',
              color: 'Ivory'
            }
          ],
          shippingAddress: {
            name: user.name,
            address: '123 Fashion Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001'
          },
          trackingNumber: 'TRK123456789'
        },
        {
          id: '2',
          orderNumber: 'AK2024002',
          date: '2024-01-20',
          status: 'shipped',
          total: 12499,
          items: [
            {
              id: '3',
              name: 'Leather Crossbody Bag',
              brand: 'Artisan Leather',
              image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=200',
              price: 12499,
              quantity: 1,
              size: 'One Size',
              color: 'Tan'
            }
          ],
          shippingAddress: {
            name: user.name,
            address: '123 Fashion Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001'
          },
          trackingNumber: 'TRK987654321'
        },
        {
          id: '3',
          orderNumber: 'AK2024003',
          date: '2024-01-25',
          status: 'confirmed',
          total: 7499,
          items: [
            {
              id: '4',
              name: 'Classic Denim Jeans',
              brand: 'Vintage Denim Co.',
              image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=200',
              price: 7499,
              quantity: 1,
              size: '32',
              color: 'Dark Wash'
            }
          ],
          shippingAddress: {
            name: user.name,
            address: '123 Fashion Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400001'
          }
        }
      ];
      setOrders(mockOrders);
    }
  }, [isOpen, user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-orange-500" />;
      case 'delivered':
        return <Package className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Sign In Required</h2>
          <p className="text-slate-600 mb-6">Please sign in to view your order history</p>
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

  if (selectedOrder) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-bold text-slate-800">
              Order Details - {selectedOrder.orderNumber}
            </h2>
            <button
              onClick={() => setSelectedOrder(null)}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(selectedOrder.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                  {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-600">Order Date</p>
                <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Tracking Info */}
            {selectedOrder.trackingNumber && (
              <div className="bg-slate-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2">Tracking Information</h3>
                <p className="text-sm text-slate-600">Tracking Number: <span className="font-mono">{selectedOrder.trackingNumber}</span></p>
              </div>
            )}

            {/* Items */}
            <div>
              <h3 className="font-semibold mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex space-x-4 border border-slate-200 rounded-lg p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-slate-600">{item.brand}</p>
                      <p className="text-sm text-slate-600">Size: {item.size} • Color: {item.color}</p>
                      <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="font-semibold mb-2">Shipping Address</h3>
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="font-medium">{selectedOrder.shippingAddress.name}</p>
                <p>{selectedOrder.shippingAddress.address}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Total Amount</span>
                <span className="text-2xl font-bold text-slate-800">₹{selectedOrder.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Invoice</span>
              </button>
              {selectedOrder.status === 'delivered' && (
                <button className="flex-1 border border-slate-300 text-slate-600 py-2 px-4 rounded-lg hover:border-slate-400 transition-colors duration-200">
                  Return/Exchange
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <Package className="h-6 w-6 mr-2" />
            Order History
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No orders found</p>
              <p className="text-slate-400 text-sm mt-2">Start shopping to see your orders here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">Order #{order.orderNumber}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                      <p className="text-slate-600 mb-2">
                        Placed on {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="text-slate-600">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''} • ₹{order.total.toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(order.status)}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Order Items Preview */}
                  <div className="mt-4 flex space-x-2 overflow-x-auto">
                    {order.items.slice(0, 3).map((item) => (
                      <img
                        key={item.id}
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                      />
                    ))}
                    {order.items.length > 3 && (
                      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-xs text-slate-600 flex-shrink-0">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;