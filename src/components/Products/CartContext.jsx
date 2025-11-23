import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // add item to cart
  const addToCart = (product) => {
    // check if item already exists
    if (!cartItems.find(item => item.id === product.id)) {
      setCartItems([...cartItems, product]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  // Check if item is in cart (for styling)
  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  // toggle Sidebar
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      removeFromCart, 
      isInCart, 
      isSidebarOpen, 
      toggleSidebar 
    }}>
      {children}
    </CartContext.Provider>
  );
};