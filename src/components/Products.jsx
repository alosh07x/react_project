import React, { useState } from 'react';
import ProductCard from './Products/Card';
import ProductModal from './Products/ProductPop';
import CartSidebar from './Products/CartSidebar';
import { useCart } from './Products/CartContext';


const importAll = (r) => {
  let images = {};
  r.keys().map((item, index) => {
   
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const Images = importAll(require.context('./img', false, /\.(jpe?g|png)$/));


const categories = [
  "Tissues", 
  "Detergents and Cleaning Items", 
  "Kraft", 
  "Kitchen Items"
];

const productsData = [
  // Category: Tissues
  { 
    id: 1, 
    category: "Tissues", 
    name: "Soft Facial Tissues", 
    price: 1.00, 
    description: "2-ply ultra soft tissues, pack of 5 boxes.", 
    image: Images['tissue.jpeg']
  },
  { 
    id: 2, 
    category: "Tissues", 
    name: "Brown Interfold", 
    price: 1.25, 
    description: "Travel size pocket packs. 10 packs per bundle.", 
    image: Images['brown.jpg']
  },
  { 
    id: 3, 
    category: "Tissues", 
    name: "Toilet Paper Roll", 
    price: 8.50, 
    description: "0.5kg pack. 8 packs per bundle.", 
    image: Images['tpaper.jpg']
  },
  { 
    id: 4, 
    category: "Tissues", 
    name: "Center Pull Towel", 
    price: 9.50, 
    description: "10 packs per bundle of total 5kg.", 
    image: Images['centerpull.jpg']
  },
  { 
    id: 5, 
    category: "Tissues", 
    name: "Wet Napkins", 
    price: 12.50, 
    description: "Moist towelettes for hand cleaning. 1000 pieces per pack.", 
    image: Images['wetnapkin.png'] 
  },
  { 
    id: 6, 
    category: "Tissues", 
    name: "Minibar", 
    price: 7.00, 
    description: "Tableside napkins for restaurants. 250 pieces per pack.", 
    image: Images['minibar.jpg'] 
  },

   { 
    id: 7, 
    category: "Tissues", 
    name: "Teal Napkins", 
    price: 9.00, 
    description: "Tableside Teal napkins for restaurants. 250 pieces per pack.", 
    image: Images['teal.jpg'] 
  },

   { 
    id: 8, 
    category: "Tissues", 
    name: "White Interfold", 
    price: 1.50, 
    description: "2-ply ultra soft tissues, pack of 5 boxes.", 
    image: Images['tissue.jpeg'] 
  },
  
  
  // Category: Detergents and Cleaning Items
  { 
    id: 9, 
    category: "Detergents and Cleaning Items", 
    name: "Lemon Dish Soap", 
    price: 3.99, 
    description: "Grease fighting formula with fresh lemon scent. 750ml.", 
    image: Images['detergents1.jpeg']
  },
  { 
    id: 10, 
    category: "Detergents and Cleaning Items", 
    name: "Scrapers and Brushes Set", 
    price: 12.50, 
    description: "High efficiency laundry powder 3kg. Removes tough stains.", 
    image: Images['prod6.jpg'] 
  },

  { 
    id: 21, 
    category: "Detergents and Cleaning Items", 
    name: "Big Collection Cleaning Set", 
    price: 25.00, 
    description: "Complete set of cleaning tools including mop, broom, dustpan, and scrub brush.", 
    image: Images['prod12.jpg']
  },

  // Category: Kraft
  { 
    id: 11, 
    category: "Kraft", 
    name: "Kraft Bowls", 
    price: 5.00, 
    description: "Pack of 50 eco-friendly kraft paper bowls, 16oz.", 
    image: Images['kraftbowl.jpg']
  },
  { 
    id: 12, 
    category: "Kraft", 
    name: "Burger Boxes", 
    price: 4.50, 
    description: "Pack of 50 sturdy kraft paper burger boxes.", 
    image: Images['burger.jpeg'] 
  },

  { 
    id: 13, 
    category: "Kraft", 
    name: "Kraft Meal boxes", 
    price: 7.50, 
    description: "Pack of 50 eco-friendly kraft paper meal boxes with compartments.", 
    image: Images['meal.jpg'] 
  },

  { 
    id: 14, 
    category: "Kraft", 
    name: "Kraft Bags", 
    price: 2.50, 
    description: "Pack of 10 sturdy kraft paper bags with handles.", 
    image: Images['kraftbag.jpg']
  },

  { 
    id: 22, 
    category: "Kraft", 
    name: "Friese Holders", 
    price: 1.00, 
    description: "Pack of 50 kraft paper fries holders for easy serving.", 
    image: Images['fries.jpg']
  },
  // Category: Kitchen Items
  { 
    id: 15, 
    category: "Kitchen Items", 
    name: "Microwavable Food Packaging",
    description: "Durable and heat-resistant food containers for microwave use.", 
    price: 18.00,
    image:  Images['prod3.jpg'],
  },

  { 
    id: 16, 
    category: "Kitchen Items", 
    name: "Forks, Spoons and Knives Set", 
    price: 4.50, 
    description: "Stainless steel sharp chef knife. Professional grade.", 
    image: Images['fork.jpg'] 
  },

  { 
    id: 17, 
    category: "Kitchen Items", 
    name: "Plastic Food Containers", 
    price: 8.00, 
    description: "Different sizes of airtight plastic food storage containers.", 
    image: Images['prod4.jpg'] 
  },

  { 
    id: 18, 
    category: "Kitchen Items", 
    name: "Gloves and Health-Safety Set", 
    price: 13.50, 
    description: "Disposable gloves, masks, and hairnets for food safety.", 
    image: Images['prod5.jpg'] 
  },

  { 
    id: 19, 
    category: "Kitchen Items", 
    name: "Trash Cans", 
    price: 32.00, 
    description: "Durable kitchen trash cans with lids. Various sizes available.", 
    image: Images['prod11.jpg'] 
  },

  { 
    id: 20, 
    category: "Kitchen Items", 
    name: "Trolleys", 
    price: 50.00, 
    description: "Heavy-duty utility trolleys for easy transport of supplies and equipment.", 
    image: Images['prod9.jpeg'] 
  },

];
// --- DATA SECTION END ---

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Get cart functionality from our Context
  const { toggleSidebar, cartItems } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 relative">
      
      {/* Floating Cart Button (Bottom Right) */}
      <button 
        onClick={toggleSidebar}
        className="fixed bottom-8 right-8 z-30 bg-blue-600 text-white px-6 py-4 rounded-full shadow-lg hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-3 border-2 border-white"
      >
        <span className="text-2xl">🛒</span>
        <span className="font-bold text-lg">{cartItems.length} Items</span>
      </button>

      {/* The Slide-out Cart Sidebar */}
      <CartSidebar />

      {/* The Modal (Pop up) - Only shows if selectedProduct is not null */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="title text-5xl font-extrabold text-center mb-8 text-gray-800 tracking-tight">
          Our <span className='text-blue-500'>Products</span>
        </h1>
        <p className='text-1xl text-center text-gray-800 tracking-tight m-12 bg-blue-200 p-6'>From everyday tools to specialty items
            ,<span className='text-1xl font-semibold'> GoldenCup</span> is your trusted source for high-quality supplies tailored for restaurants and coffee shops.
           Explore our curated selection designed to elevate your service, efficiency, and customer experience.</p>

        {/* Loop through Categories */}
        {categories.map((cat) => (
          <div key={cat} className="mb-16">
            {/* Category Title with styling */}
            <div className="flex items-center mb-8">
              <div className="w-2 h-8 bg-blue-600 mr-3 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-700">
                {cat}
              </h2>
              <div className="h-px bg-gray-200 flex-grow ml-4"></div>
            </div>
            
            {/* Grid for Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {productsData
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