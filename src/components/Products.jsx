import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './Products/Card';
import ProductModal from './Products/ProductPop';
import CartSidebar from './Products/CartSidebar';
import { useCart } from './Products/CartContext';


const categories = [
  "Tissues", 
  "Detergents and Cleaning Items", 
  "Kraft", 
  "Kitchen Items"
];

const Products = () => {
  
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { toggleSidebar, cartItems } = useCart();

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(process.env.REACT_APP_API_URL || "http://localhost:8081");
        setProducts(res.data);
      } catch (err) {
        console.log("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 relative">
      
      {}
      <button 
        onClick={toggleSidebar}
        className="fixed bottom-8 right-8 z-30 bg-blue-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3 border-2 border-white"
      >
        <span className="text-2xl">🛒</span>
        <span className="font-bold text-lg">{cartItems.length} Items</span>
      </button>

      <CartSidebar />

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      <div className="container mx-auto px-4 py-12">
        <h1 className="title text-5xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">
          Our <span className='text-blue-500'>Products</span>
        </h1>
        <p className='text-1xl text-center text-gray-800 tracking-tight m-12 bg-blue-200 p-6'>
           From everyday tools to specialty items
            ,<span className='text-1xl font-semibold'> GoldenCup</span> is your trusted source for high-quality supplies tailored for restaurants and coffee shops.
            Explore our curated selection designed to elevate your service, efficiency, and customer experience.
        </p>

        {}
        {categories.map((cat) => (
          <div key={cat} className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-2 h-8 bg-blue-600 mr-3 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-700">{cat}</h2>
              <div className="h-px bg-gray-200 flex-grow ml-4"></div>
            </div>
            
            {}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {}
              {products
                .filter((product) => product.category === cat)
                .map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onOpenModal={setSelectedProduct} 
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;