import React from "react";
import img1 from "./image/mohamad.jpg";
function About() {
  return (
    <section id="about" className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
       
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
            About <span className="text-blue-500">Us</span>
          </h2>
          <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto">
            Years ago, a prominent name emerged on the industrial scene and
            instantly gained a trustworthy reputation all over Lebanon:{" "}
            <b>Golden Cup</b>.
          </p>
        </div>

        
        <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
          
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed">
              Since then, <b>Golden Cup</b> has been providing the Lebanese market
              with a wide range of premium quality products and services that cater
              to various establishments, organizations, and households. Products
              include cleaning tools, detergents, sanitary products, food packaging,
              disposables, catering supplies, trolleys, accessories, hotel amenities,
              restaurant packaging, personalized corporate uniforms, and office supplies.
            </p>

            <p className="text-gray-700 leading-relaxed">
              In addition to optimizing safety, storage, and transportation procedures,
              all Golden Cup products are of prime quality and eco-friendly. The team
              constantly adheres to high standards of ethics, operational discipline,
              and quality management, ensuring excellent customer satisfaction.
            </p>
          </div>

          
          <div className="flex justify-center">
            <img
              src={img1}
              alt="Golden Cup Team"
              className="rounded-lg shadow-lg w-full max-w-md"
            />
          </div>
        </div>

        
        <div className="w-full bg-blue-100 p-6 rounded-lg shadow-inner mt-12">
          <p className="text-blue-800 font-semibold text-center">
            With a wide distribution scope, <b>ShinePlus</b> is a premium brand of
            Golden Cup. ShinePlus products include a variety of detergents,
            cleaning tools, equipment, sanitary, food packaging products, and
            nylon bags.
          </p>
        </div>

        
        <div className="text-center mt-16">
          <p className="text-gray-800 text-lg md:text-xl mb-4">
            Want to learn more about our products and services?
          </p>
          <a
            href="/contact"
            className="bg-blue-400 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-500 transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;