/*import React from 'react';
import { useCart } from './CartContext';



const Card = ({ product, onOpenModal }) => {
  const { isInCart } = useCart();
  const added = isInCart(product.id);

  return (
    <div 
      onClick={() => onOpenModal(product)}
      className={`
        relative cursor-pointer rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1
        bg-white
        ${added ? 'ring-4 ring-green-400 border-green-500' : 'border border-gray-200'}
      `}
    >
      {/* Visual Indicator Badge *//*}
      {added && (
        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm z-10">
          In Cart
        </div>
      )}

      <div className="h-48 overflow-hidden">
        <img 
          src={`${process.env.REACT_APP_API_URL}/images/${product.image.split('/').pop()}`}
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-500 mt-1 text-sm">${Number(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;*/

import React from 'react';
import { useCart } from './CartContext'; // Adjust path if needed

const Card = ({ product, onOpenModal }) => {
  // We use getItemQuantity instead of isInCart so we can show the number
  const { getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  const isAdded = quantity > 0;

  // Image path logic
  const API_URL = process.env.REACT_APP_API_URL;
  const cleanImageName = product.image ? product.image.split('/').pop() : '';

  return (
    <div 
      onClick={() => onOpenModal(product)}
      className={`
        relative cursor-pointer rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1
        bg-white
        ${isAdded ? 'ring-2 ring-blue-500 border-blue-500' : 'border border-gray-200'}
      `}
    >
      {/* Visual Indicator Badge: Now shows the specific Quantity */}
      {isAdded && (
        <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
          {quantity} in Cart
        </div>
      )}

      <div className="h-48 overflow-hidden">
        <img 
          src={`${API_URL}/images/${cleanImageName}`} 
          alt={product.name} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = "https://via.placeholder.com/300"; }}
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
        <p className="text-gray-500 mt-1 text-sm">${Number(product.price).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Card;