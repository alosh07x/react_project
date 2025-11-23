import React from 'react';
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
                    <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
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
              <span>${total.toFixed(2)}</span>
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

export default CartSidebar;