import { Route, Routes } from "react-router-dom";
import  "icofont/dist/icofont.min.css";
import Home from './components/Home';
import Products from './components/Products';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import About from './components/About';
import { CartProvider } from './components/Products/CartContext';


function App() {
  return (
    <div>
      <CartProvider>
          <Navbar />
      
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      </CartProvider>
    </div>
  );
}

export default App;

