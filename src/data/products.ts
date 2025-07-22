import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    price: 2499,
    originalPrice: 3299,
    category: 'men',
    subcategory: 'tops',
    images: [
      'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5886040/pexels-photo-5886040.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Crafted from 100% organic cotton, this premium t-shirt offers unmatched comfort and durability. Perfect for casual wear with a modern fit.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Gray', 'Navy'],
    inStock: true,
    rating: 4.5,
    reviews: 128,
    featured: true,
    brand: 'EcoWear'
  },
  {
    id: '2',
    name: 'Elegant Silk Blouse',
    price: 6599,
    category: 'women',
    subcategory: 'tops',
    images: [
      'https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5480695/pexels-photo-5480695.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Luxurious silk blouse with a contemporary design. Features a relaxed fit and elegant draping perfect for professional or evening wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Ivory', 'Blush', 'Midnight Blue', 'Emerald'],
    inStock: true,
    rating: 4.8,
    reviews: 89,
    featured: true,
    brand: 'Luxe Collection'
  },
  {
    id: '3',
    name: 'Classic Denim Jeans',
    price: 7499,
    originalPrice: 9999,
    category: 'men',
    subcategory: 'bottoms',
    images: [
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598508/pexels-photo-1598508.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Timeless denim jeans with a classic straight fit. Made from premium denim with subtle distressing for a vintage look.',
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Dark Wash', 'Light Wash', 'Black'],
    inStock: true,
    rating: 4.6,
    reviews: 203,
    featured: false,
    brand: 'Vintage Denim Co.'
  },
  {
    id: '4',
    name: 'Floral Summer Dress',
    price: 7999,
    category: 'women',
    subcategory: 'dresses',
    images: [
      'https://images.pexels.com/photos/5480843/pexels-photo-5480843.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5480842/pexels-photo-5480842.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Beautiful floral print dress perfect for summer occasions. Features a flattering A-line silhouette with adjustable straps.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Coral Floral', 'Navy Floral', 'Sage Floral'],
    inStock: true,
    rating: 4.9,
    reviews: 156,
    featured: true,
    brand: 'Blooming Garden'
  },
  {
    id: '5',
    name: 'Leather Crossbody Bag',
    price: 12499,
    category: 'accessories',
    subcategory: 'bags',
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1152076/pexels-photo-1152076.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Handcrafted leather crossbody bag with multiple compartments. Perfect for everyday use with its compact yet spacious design.',
    sizes: ['One Size'],
    colors: ['Tan', 'Black', 'Brown', 'Burgundy'],
    inStock: true,
    rating: 4.7,
    reviews: 94,
    featured: true,
    brand: 'Artisan Leather'
  },
  {
    id: '6',
    name: 'Wool Blend Coat',
    price: 16699,
    originalPrice: 20799,
    category: 'women',
    subcategory: 'outerwear',
    images: [
      'https://images.pexels.com/photos/5480849/pexels-photo-5480849.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5480848/pexels-photo-5480848.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Elegant wool blend coat with a timeless design. Features a belted waist and classic lapels for a sophisticated look.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Camel', 'Navy', 'Charcoal', 'Burgundy'],
    inStock: true,
    rating: 4.8,
    reviews: 67,
    featured: false,
    brand: 'Urban Elegance'
  },
  {
    id: '7',
    name: 'Athletic Sneakers',
    price: 10799,
    category: 'accessories',
    subcategory: 'shoes',
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529147/pexels-photo-2529147.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'High-performance athletic sneakers with superior cushioning and breathable materials. Perfect for workouts and casual wear.',
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    colors: ['White', 'Black', 'Gray', 'Navy/White'],
    inStock: true,
    rating: 4.6,
    reviews: 234,
    featured: true,
    brand: 'Sport Elite'
  },
  {
    id: '8',
    name: 'Formal Dress Shirt',
    price: 5799,
    category: 'men',
    subcategory: 'tops',
    images: [
      'https://images.pexels.com/photos/5886042/pexels-photo-5886042.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/5886043/pexels-photo-5886043.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    description: 'Crisp formal dress shirt made from premium cotton. Features a classic collar and clean lines perfect for business or formal occasions.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Light Pink', 'Lavender'],
    inStock: true,
    rating: 4.4,
    reviews: 178,
    featured: false,
    brand: 'Executive Style'
  }
];

export const categories = [
  { id: 'men', name: 'Men', image: 'https://images.pexels.com/photos/5886041/pexels-photo-5886041.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'women', name: 'Women', image: 'https://images.pexels.com/photos/5480696/pexels-photo-5480696.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800' }
];