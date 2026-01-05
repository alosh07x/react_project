/*import React from 'react';
import { useCart } from './CartContext';

const CartSidebar = () => {
  const { cartItems, isSidebarOpen, toggleSidebar, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      
      {isSidebarOpen && (
        <div 
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity"
        />
      )}

      
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
          </div>

          
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">Cart is empty.</div>
            ) : (
              cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 mb-4 p-2 bg-gray-200 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-xs text-gray-500">${Number(item.price).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 text-sm font-bold"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>

          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total:</span>
              <span>${Number(total).toFixed(2)}</span>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar; */

import React, { useState } from 'react';
import { useCart } from './CartContext'; // Adjust path if needed
import CheckoutModal from './CheckoutModal'; // Import the new modal

const CartSidebar = () => {
  const { 
    cartItems, 
    isSidebarOpen, 
    toggleSidebar, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity 
  } = useCart();

  // State for the checkout modal
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  const API_URL = process.env.REACT_APP_API_URL;

  // Handle Checkout Click
  const handleCheckoutClick = () => {
    // 1. Check if cart is empty
    if (cartItems.length === 0) return;

    // 2. Check if user is logged in
    const userString = localStorage.getItem("currentUser");
    if (!userString) {
      alert("Please log in to proceed to checkout.");
      // Optional: You could redirect to login page here
      return;
    }

    // 3. If logged in, close sidebar and open checkout modal
    toggleSidebar();
    setIsCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckoutOpen(false);
  };

  return (
    <>
      {/* --- CHECKOUT MODAL --- */}
      {isCheckoutOpen && (
        <CheckoutModal 
          cartItems={cartItems} 
          total={total} 
          onClose={handleCloseCheckout}
          // Note: If you want to clear the cart after order, we need to add a clearCart function to Context later.
          // For now, it will just show success.
        />
      )}

      {/* --- SIDEBAR OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity"
        />
      )}

      {/* --- SIDEBAR CONTENT --- */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-5 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
            <button onClick={toggleSidebar} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-400 mt-10">Cart is empty.</div>
            ) : (
              cartItems.map((item) => {
                const cleanImageName = item.image ? item.image.split('/').pop() : '';
                
                return (
                  <div key={item.id} className="flex flex-col mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-3">
                      <img 
                         src={`${API_URL}/images/${cleanImageName}`} 
                         alt={item.name} 
                         className="w-16 h-16 rounded object-cover" 
                         onError={(e) => { e.target.src = "https://via.placeholder.com/64"; }}
                      />
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-xs text-gray-500">${Number(item.price).toFixed(2)}</p>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex justify-between items-center bg-white p-2 rounded shadow-sm">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => decreaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 font-bold"
                        >
                          -
                        </button>
                        <span className="font-semibold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => increaseQuantity(item.id)}
                          className="w-6 h-6 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 font-bold"
                        >
                          +
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 text-xs font-bold uppercase"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer / Checkout Button */}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckoutClick}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-bold"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;