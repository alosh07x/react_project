import React, { useState } from "react";

function Contact() {
  const person = {
    email: "",
    subject: "",
    message: ""
  };

  const [prsn, setprsn] = useState(person);
  const [state, setstate] = useState([]);

  const handleChange = (e) => {
    setprsn({ ...prsn, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setstate([...state, prsn]);
    setprsn(person);
    
  };

  return (
    <section id="contact" className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            <span>Contact Us</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <p className="flex items-center gap-2 text-gray-700">
                <i className="icofont-map text-blue-500"></i>
                <strong>Address:</strong>
              </p>
              <p>Koura, Lebanon</p>
              <p>Btouratij</p>
              <p>Kousba Road</p>
            </div>

            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <p className="flex items-center gap-2 text-gray-700">
                <i className="icofont-phone text-blue-500"></i>
                <strong>Mobile:</strong>
                <a href="tel:0096171647376" className="text-blue-500 hover:underline">
                  +961 71 647 376
                </a>
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
              <p className="flex items-center gap-2 text-gray-700">
                <i className="icofont-email text-blue-500"></i>
                <strong>Email:</strong>
              </p>
              <p>
                <a href="mailto:52330709@students.liu.edu.lb" className="text-blue-500 hover:underline">
                  52330709@students.liu.edu.lb
                </a>
              </p>
            </div>
          </div>

          
          <div className="flex-1 bg-white p-6 rounded shadow hover:shadow-lg transition">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1 font-semibold">
                  Your Email:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={prsn.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block mb-1 font-semibold">
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={prsn.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block mb-1 font-semibold">
                  Message:
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={prsn.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;