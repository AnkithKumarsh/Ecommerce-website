import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Shield, Truck, RotateCcw } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Premium Fashion Collection",
      subtitle: "Discover the latest trends in premium fashion",
      description: "Elevate your style with our curated collection of premium clothing and accessories",
      image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Shop Collection"
    },
    {
      title: "Summer Essentials",
      subtitle: "Beat the heat with style",
      description: "Fresh summer looks that keep you cool and fashionable all season long",
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Explore Summer"
    },
    {
      title: "Exclusive Designer Wear",
      subtitle: "Limited edition pieces",
      description: "Unique designer pieces that make a statement wherever you go",
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1200",
      cta: "Shop Exclusive"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative">
      {/* Hero Slider */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl mx-4 md:mx-8 mt-4">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 transform translate-x-0' 
                : index < currentSlide 
                  ? 'opacity-0 transform -translate-x-full'
                  : 'opacity-0 transform translate-x-full'
            }`}
          >
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 md:px-8 w-full">
                  <div className="max-w-2xl animate-fade-in">
                    <p className="text-orange-400 font-medium text-sm md:text-base mb-2 animate-slide-up">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight animate-slide-up animation-delay-200">
                      {slide.title}
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl mb-8 max-w-lg animate-slide-up animation-delay-400">
                      {slide.description}
                    </p>
                    <button
                      onClick={onShopNow}
                      className="group bg-gradient-to-r from-orange-500 to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-orange-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-slide-up animation-delay-600"
                    >
                      {slide.cta}
                      <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Features Bar */}
      <div className="bg-gradient-to-r from-orange-50 to-pink-50 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $99</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                <RotateCcw className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Secure Payment</h3>
                <p className="text-sm text-gray-600">SSL encrypted</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-3 rounded-full group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Premium Quality</h3>
                <p className="text-sm text-gray-600">Curated collection</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 mt-8">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center space-x-4 text-center">
            <Star className="w-5 h-5 animate-pulse" />
            <p className="font-medium">
              <span className="font-bold">Limited Time:</span> Get 20% off on your first order with code WELCOME20
            </p>
            <Star className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;