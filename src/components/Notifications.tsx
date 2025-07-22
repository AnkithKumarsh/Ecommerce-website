import React, { useState, useEffect } from 'react';
import { X, Bell, Package, Heart, Tag, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface Notification {
  id: string;
  type: 'order' | 'promotion' | 'wishlist' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  iconType: string;
}

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const getIconComponent = (iconType: string): React.ReactNode => {
  switch (iconType) {
    case 'tag':
      return <Tag className="h-5 w-5 text-green-500" />;
    case 'tag-red':
      return <Tag className="h-5 w-5 text-red-500" />;
    case 'package':
      return <Package className="h-5 w-5 text-blue-500" />;
    case 'heart':
      return <Heart className="h-5 w-5 text-pink-500" />;
    case 'settings':
      return <Settings className="h-5 w-5 text-slate-500" />;
    default:
      return <Bell className="h-5 w-5 text-slate-500" />;
  }
};

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  
  const getInitialNotifications = (): Notification[] => {
    const saved = localStorage.getItem('userNotifications');
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Default notifications for new users
    return [
      {
        id: '1',
        type: 'promotion',
        title: 'Welcome to AKStyleHub! 🎉',
        message: 'Get 20% off on your first purchase. Use code: WELCOME20',
        time: 'Just now',
        read: false,
        iconType: 'tag'
      },
      {
        id: '2',
        type: 'promotion',
        title: 'Flash Sale Alert',
        message: 'Up to 70% off on selected items. Limited time offer!',
        time: '1 day ago',
        read: false,
        iconType: 'tag-red'
      }
    ];
  };
  
  const [notifications, setNotifications] = useState<Notification[]>(getInitialNotifications());
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userNotifications', JSON.stringify(notifications));
  }, [notifications]);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  if (!user) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg max-w-md w-full p-8 text-center">
          <Bell className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Sign In Required</h2>
          <p className="text-slate-600 mb-6">Please sign in to view your notifications</p>
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
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <Bell className="h-6 w-6 mr-2" />
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 bg-red-500 text-white text-sm px-2 py-1 rounded-full">
                {unreadCount}
              </span>
            )}
          </h2>
          <div className="flex items-center space-x-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-orange-500 hover:text-orange-600 transition-colors duration-200"
              >
                Mark all as read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-full transition-colors duration-200"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg">No notifications</p>
              <p className="text-slate-400 text-sm mt-2">You're all caught up!</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-200">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-slate-50 transition-colors duration-200 ${
                    !notification.read ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {getIconComponent(notification.iconType)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className={`font-medium ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                            {notification.title}
                          </h3>
                          <p className="text-slate-600 text-sm mt-1">
                            {notification.message}
                          </p>
                          <p className="text-slate-400 text-xs mt-2">
                            {notification.time}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-blue-500 hover:text-blue-600 transition-colors duration-200"
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-xs text-red-500 hover:text-red-600 transition-colors duration-200"
                          >
                            Delete
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

        <div className="border-t p-4">
          <button className="w-full flex items-center justify-center space-x-2 text-slate-600 hover:text-orange-500 transition-colors duration-200">
            <Settings className="h-4 w-4" />
            <span>Notification Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;