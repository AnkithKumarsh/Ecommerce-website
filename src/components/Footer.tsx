import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, CreditCard, Truck, Shield, Award } from 'lucide-react';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'New Arrivals', href: '#' },
        { name: 'Best Sellers', href: '#' },
        { name: 'Sale Items', href: '#' },
        { name: 'Gift Cards', href: '#' },
        { name: 'Size Guide', href: '#' }
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Contact Us', href: '#' },
        { name: 'Shipping Info', href: '#' },
        { name: 'Returns & Exchanges', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Track Your Order', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Investor Relations', href: '#' }
      ]
    }
  ];

  const paymentMethods = [
    'Visa', 'Mastercard', 'UPI', 'Paytm', 'GPay', 'PhonePe'
  ];

  const features = [
    { icon: Truck, text: 'Free Shipping', subtext: 'On orders over ₹999' },
    { icon: Shield, text: 'Secure Payment', subtext: '100% Protected' },
    { icon: Award, text: 'Quality Guarantee', subtext: 'Premium products' },
    { icon: Phone, text: '24/7 Support', subtext: 'Always here to help' }
  ];

  return (
    <footer className="bg-slate-900 text-white">
      {/* Features Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 sm:space-x-4 group">
                <div className="bg-orange-500 p-2 sm:p-3 rounded-full group-hover:bg-orange-400 transition-colors duration-300">
                  <feature.icon className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm sm:text-base">{feature.text}</h3>
                  <p className="text-xs sm:text-sm text-slate-400">{feature.subtext}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">Stay in Style</h3>
              <p className="text-slate-400 text-sm sm:text-base">
                Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-white placeholder-slate-400"
              />
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content - Horizontal Layout */}
      <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        {/* Brand and Description - Full Width */}
        <div className="mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-6 sm:space-y-0">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-lg mr-3">
                <span className="text-xl font-bold">AK</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  AKStyleHub
                </h3>
                <p className="text-sm text-slate-400">Fashion & Style</p>
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="bg-slate-800 p-3 rounded-full hover:bg-orange-500 transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Description - Horizontal */}
          <div className="mt-6">
            <p className="text-slate-400 leading-relaxed text-sm sm:text-base max-w-4xl">
              Your destination for premium fashion and timeless style. We curate the finest clothing and accessories 
              to help you express your unique personality and elevate your everyday look.
            </p>
          </div>
        </div>

        {/* Contact Info - Horizontal */}
        <div className="mb-8 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-orange-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm sm:text-base">hello@akstylehub.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-orange-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm sm:text-base">1800-123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-orange-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm sm:text-base">123 Fashion Street, Mumbai, India</span>
            </div>
          </div>
        </div>
        
        {/* Footer Links - Horizontal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 sm:mb-6 text-white text-base sm:text-lg">{section.title}</h4>
              <ul className="space-y-2 sm:space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href} 
                      className="text-slate-400 hover:text-orange-400 transition-colors duration-300 text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
              <p className="text-slate-400 text-sm">
               &copy; 2024 AKStyleHub. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center sm:justify-start space-x-4 text-sm">
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-slate-400 hover:text-orange-400 transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <span className="text-slate-400 text-sm">We Accept:</span>
              <div className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
                <div className="flex flex-wrap justify-center space-x-1">
                  {paymentMethods.map((method, index) => (
                    <span key={index} className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;