# AKStyleHub - Premium Fashion & Clothing Online Store

AKStyleHub is a modern e-commerce platform built with React and Tailwind CSS, offering a seamless and engaging shopping experience for premium fashion and clothing. Discover the latest trends, browse curated collections, and enjoy secure checkout with AKStyleHub.

## Features and Functionality

*   **Dynamic Product Catalog:** Browse a wide range of clothing, accessories, and fashion items, categorized for easy navigation.
*   **Advanced Filtering and Sorting:** Refine product listings by category, price range, brand, and rating to find exactly what you're looking for.
*   **Interactive Product Cards:** Quick view options, add to cart, buy now, and wishlist functionality directly from product cards.
*   **Detailed Product Pages:** Comprehensive product descriptions, high-quality images, size and color selection, and customer reviews.
*   **Shopping Cart:** Manage your selected items, update quantities, and proceed to secure checkout.
*   **User Authentication:** Secure sign-in and registration with persistent user sessions.
*   **Wishlist:** Save favorite items to your wishlist for future purchase.
*   **Order History:** Track past orders and view detailed order information.
*   **Profile Settings:** Manage your personal information, contact details, and shipping addresses.
*   **Notifications:** Stay updated with order status, promotions, and important announcements.
*   **Quick Buy:** Streamlined checkout process for immediate purchase.
*   **SEO Optimization:** Dynamic SEO meta tags for improved search engine visibility.
*   **Responsive Design:** Optimized for seamless browsing on desktops, tablets, and mobile devices.
*   **Razorpay Integration:** Secure and reliable payment processing via Razorpay.

## Technology Stack

*   **React:** A JavaScript library for building user interfaces.
*   **TypeScript:** A typed superset of JavaScript that compiles to plain JavaScript.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Vite:** A fast build tool for modern web development.
*   **Lucide React:** Beautifully simple, pixel-perfect icons.
*   **Razorpay:** Payment gateway integration for secure transactions.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js:** Version 16 or higher. You can download it from [nodejs.org](https://nodejs.org/).
*   **npm:** Node Package Manager, usually comes with Node.js installation.

## Installation Instructions

1.  Clone the repository:

    ```bash
    git clone https://github.com/AnkithKumarsh/clothshopping.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd clothshopping
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

## Usage Guide

1.  Start the development server:

    ```bash
    npm run dev
    ```

2.  Open your browser and navigate to `http://localhost:5173` (or the URL provided by Vite).

### Key Components

*   **`index.html`**: The main HTML file containing SEO meta tags and the root element for the React app.
    *   Includes SEO Meta Tags and Structured Data for improved search engine visibility.
    *   References `/src/main.tsx` as the entry point for the React application.

*   **`src/App.tsx`**: The main application component that orchestrates all other components.
    *   Manages application state, including selected category, search query, and modal visibility.
    *   Utilizes `CartProvider` and `AuthProvider` to provide context for cart management and user authentication.
    *   Includes routing logic for different sections of the application.
    *   Calls the getSEOData() to set dynamic SEO tags.

*   **`src/components/Header.tsx`**: The header component that provides navigation, search, and user actions.
    *   Includes a search bar with live filtering.
    *   Provides category selection buttons for filtering products.
    *   Includes links to the cart, wishlist, and user authentication modals.

*   **`src/components/Hero.tsx`**: The hero section with a slider showcasing featured products and promotions.
    *   Displays rotating banners with product highlights and call-to-action buttons.

*   **`src/components/CategoryGrid.tsx`**: Displays product categories in a grid layout.
    *   Allows users to quickly navigate to specific product categories.

*   **`src/components/ProductGrid.tsx`**: Displays products in a grid or list layout with filtering and sorting options.
    *   Provides filtering options by price range and brand.
    *   Allows users to sort products by price, rating, and date.

*   **`src/components/ProductCard.tsx`**:  Reusable component for displaying individual product information.

*   **`src/components/ProductModal.tsx`**: A modal for displaying detailed product information.

*   **`src/components/Cart.tsx`**:  Displays the shopping cart and allows users to update quantities and proceed to checkout.

*   **`src/components/AuthModal.tsx`**: Implements user authentication (sign-in and sign-up) using a modal.
    *   Provides a form for users to enter their email and password.
    *   Uses the `useAuth` hook to access authentication functions.
    *   Saves user data to localStorage upon successful login.
    *   Displays buttons for Order History, Profile Settings, Wishlist and Notifications.

*   **`src/components/Checkout.tsx`**: Implements the checkout process, including shipping information and payment processing.
    *   Includes a form for users to enter their shipping address and payment details.
    *   Integrates with Razorpay for secure payment processing.
    *   Calculates the total amount including GST.

*   **`src/components/BuyNowModal.tsx`**: Provides a quick buy modal with address form and Razorpay integration.

*   **`src/components/Wishlist.tsx`**: Manages liked/saved items and displays them in a modal.

*   **`src/components/OrderHistory.tsx`**: Displays user's order history.

*   **`src/components/ProfileSettings.tsx`**: Allows users to modify thier profile.

*   **`src/components/Notifications.tsx`**: Display a list of notifications.

*   **`src/components/Footer.tsx`**: The footer component with links to various sections of the site.
    *   Includes links to customer care, company information, and social media profiles.

*   **`src/context/AuthContext.tsx`**: Defines the authentication context and provides functions for login, logout, and user management.

*   **`src/context/CartContext.tsx`**: Defines the cart context and provides functions for adding, removing, and updating items in the cart.

*   **`src/types/index.ts`**: Defines the data types used in the application, including Product, CartItem, User, and Order.

### Authentication

The `AuthModal` component allows users to sign in and sign up.  The `useAuth` context provides the `login` and `register` functions.

*   **Login:**

    ```typescript
    const login = async (email: string, password: string) => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
        avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=150'
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Show welcome message
      setTimeout(() => {
        alert(`Welcome back, ${mockUser.name.split(' ')[0]}! 🎉`);
      }, 100);

      setIsLoading(false);
    };
    ```

*   **Logout:**

    ```typescript
    const logout = () => {
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('likedItems');
      window.dispatchEvent(new Event('wishlistUpdated'));
    };
    ```

*   **Registration:**

    ```typescript
    const register = async (name: string, email: string, password: string) => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        avatar: 'https://images.pexels.com/photos/1102341/pexels-photo-1102341.jpeg?auto=compress&cs=tinysrgb&w=150'
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Show welcome message for new user
      setTimeout(() => {
        alert(`Welcome to AKStyleHub, ${mockUser.name.split(' ')[0]}! 🎉 Start exploring our premium fashion collection.`);
      }, 100);

      setIsLoading(false);
    };
    ```

### Cart Management

The `CartContext` provides functionality for managing the shopping cart.

*   **Adding Items:**

    ```typescript
    const addItem = (product: Product, size: string, color: string, quantity = 1) => {
      dispatch({ type: 'ADD_ITEM', payload: { product, size, color, quantity } });

      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
      toast.textContent = `${product.name} added to cart! 🛒`;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    };
    ```

*   **Removing Items:**

    ```typescript
    const removeItem = (id: string) => {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    };
    ```

*   **Updating Quantity:**

    ```typescript
    const updateQuantity = (id: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };
    ```

*   **Clearing the Cart:**

    ```typescript
     const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
      };
    ```

### Wishlist Management

Wishlist functionality is handled locally using `localStorage`. The key actions are adding and removing items from the 'likedItems' array in local storage, and these actions trigger a 'wishlistUpdated' event to update the count in the header.

*   **Adding Items to Wishlist**

    ```typescript
    const handleLike = (e: React.MouseEvent) => {
        e.stopPropagation();
        
        if (!user) {
          // If user is not logged in, show a message or redirect to login
          alert('Please log in to add items to your wishlist');
          return;
        }
        
        const likedItems = JSON.parse(localStorage.getItem('likedItems') || '[]');
        const newLikedItems = isLiked 
          ? likedItems.filter((id: string) => id !== product.id)
          : [...likedItems, product.id];
        localStorage.setItem('likedItems', JSON.stringify(newLikedItems));
        setIsLiked(!isLiked);
        
        // Dispatch event to update wishlist count
        window.dispatchEvent(new Event('wishlistUpdated'));
        
        // Show feedback message
        const message = !isLiked ? 'Added to wishlist ❤️' : 'Removed from wishlist';
        // Create a temporary toast notification
        const toast = document.createElement('div');
        toast.className = 'fixed top-4 right-4 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => {
          toast.style.opacity = '0';
          setTimeout(() => document.body.removeChild(toast), 300);
        }, 2000);
      };
    ```

### Razorpay Integration

The `Checkout` and `BuyNowModal` components integrate with Razorpay for secure payment processing.

*   **Loading the Razorpay Script:**

    ```typescript
    const loadRazorpayScript = () => {
      return new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
      });
    };
    ```

*   **Handling Razorpay Payment:**

    ```typescript
    const handleRazorpayPayment = async () => {
        const res = await loadRazorpayScript();

        if (!res) {
          alert('Razorpay SDK failed to load. Are you online?');
          return;
        }

        // Calculate total with tax
        const totalWithTax = total * 1.18; // 18% GST
        const amountInPaise = Math.round(totalWithTax * 100); // Convert to paise

        const options = {
          key: 'rzp_test_9999999999', // Replace with your Razorpay key
          amount: amountInPaise,
          currency: 'INR',
          name: 'AKStyleHub',
          description: 'Fashion Purchase',
          image: '/logo.png', // Add your logo
          order_id: '', // This should come from your backend
          handler: function (response: any) {
            // Payment successful
            console.log('Payment successful:', response);
            
            // Save order to localStorage for order history
            const orders = JSON.parse(localStorage.getItem('userOrders') || '[]');
            const newOrder = {
              id: Date.now().toString(),
              orderNumber: `AK${Date.now().toString().slice(-8)}`,
              date: new Date().toISOString(),
              status: 'confirmed',
              total: totalWithTax,
              items: items.map(item => ({
                id: item.product.id,
                name: item.product.name,
                brand: item.product.brand,
                image: item.product.images[0],
                price: item.product.price,
                quantity: item.quantity,
                size: item.size,
                color: item.color
              })),
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
            
            setOrderComplete(true);
            clearCart();
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
            address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.zipCode}`
          },
          theme: {
            color: '#f97316' // Orange color matching your theme
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
    ```

    **Note:** Replace `'rzp_test_9999999999'` with your actual Razorpay key.

## API Documentation

This project primarily uses frontend technologies, and does not implement a backend API. Data is managed locally using `localStorage` and mock data is used for demonstration purposes. However, the components are designed to be easily integrated with a backend API in the future.

### Future API Endpoints (Example)

If a backend API were to be implemented, the following endpoints could be used:

*   `GET /api/products`: Get all products.
*   `GET /api/products/:id`: Get a specific product by ID.
*   `POST /api/orders`: Create a new order.
*   `GET /api/orders/:id`: Get a specific order by ID.
*   `POST /api/auth/login`: Log in a user.
*   `POST /api/auth/register`: Register a new user.

## Contributing Guidelines

Contributions are welcome! Please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive messages.
4.  Test your changes thoroughly.
5.  Submit a pull request with a detailed explanation of your changes.

## License Information

No license specified. All rights reserved.
