import React, { useState } from 'react';

const CheckoutModal = ({ cartItems, total, onClose, onClearCart }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    note: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

   //success message 
    setTimeout(() => {
      alert(`Order placed successfully!\n\nName: ${formData.fullName}\nTotal: $${total.toFixed(2)}\nPayment: Cash on Delivery`);
      setIsSubmitting(false);
      
      //clear cart
      if (onClearCart) onClearCart();
      
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
        
        {/*order*/}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 border-r border-gray-200 overflow-y-auto">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => {
               const cleanImageName = item.image ? item.image.split('/').pop() : '';
               return (
                <div key={item.id} className="flex gap-3 items-start">
                    <div className="w-16 h-16 rounded-md overflow-hidden bg-white border border-gray-200 flex-shrink-0">
                    <img 
                        src={`${API_URL}/images/${cleanImageName}`} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => e.target.src = "https://via.placeholder.com/64"}
                    />
                    </div>
                    <div>
                    <p className="text-sm font-semibold text-gray-700 line-clamp-2">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                </div>
               );
            })}
          </div>
          
          <div className="border-t border-gray-300 pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery</span>
              <span>$0.00 (Free)</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2 border-t border-gray-200">
              <span>Total (COD)</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/*form*/}

        <div className="w-full md:w-2/3 p-6 md:p-8 bg-white overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Checkout Details</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" name="fullName" required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.fullName} onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input 
                  type="tel" name="phone" required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.phone} onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <input 
                type="text" name="address" required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Street name, Building, Floor..."
                value={formData.address} onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City / Region</label>
                    <input 
                        type="text" name="city" required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={formData.city} onChange={handleChange}
                    />
                </div>
                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-1">Note (Optional)</label>
                   <input 
                      type="text" name="note"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="Special instructions..."
                      value={formData.note} onChange={handleChange}
                   />
                </div>
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg text-white font-bold text-lg shadow-md transition-all
                  ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'}
                `}
              >
                {isSubmitting ? 'Processing...' : `Confirm Order ($${total.toFixed(2)})`}
              </button>
              <p className="text-center text-xs text-gray-500 mt-3">
                *Payment will be collected upon delivery (Cash on Delivery).
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;