import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-400 py-6 px-6 flex items-center justify-between w-screen">

      
      <div className="flex items-center">
        <h1 className="text-white text-2xl md:text-3xl font-bold">
          Golden Cup
        </h1>
      </div>

      
      <div className="flex space-x-4">
        <Link
          to="/"
          className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
        >
          Home
        </Link>

        <Link
          to="/products"
          className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
        >
          Products
        </Link>

        

        <Link
          to="/about"
          className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
        >
          About
        </Link>

        <Link
          to="/contact"
          className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
        >
          Contact
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
