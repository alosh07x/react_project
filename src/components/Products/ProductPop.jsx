import React from 'react';
import { useCart } from './CartContext';

const ProductPop = ({ product, onClose }) => {
  const { addToCart, removeFromCart, isInCart } = useCart();

  if (!product) return null;

  const added = isInCart(product.id);

  const handleAction = () => {
    if (added) {
      removeFromCart(product.id);
    } else {
      addToCart(product);
    }
    // Optional: Close modal after action, or keep it open
    // onClose(); 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative scale-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full"
        >
          &times;
        </button>

        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
             <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
             <span className="text-xl font-semibold text-blue-600">${product.price.toFixed(2)}</span>
          </div>
          <span className="inline-block bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded mb-4">
            {product.category}
          </span>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <button
            onClick={handleAction}
            className={`w-full py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md
              ${added 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              }
            `}
          >
            {added ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPop;