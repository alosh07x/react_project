import React, { useEffect, useState } from "react";
import axios from "axios";

function Contact() {
  // Form states
  const [subject, setsubject] = useState("");
  const [messages, setMessages] = useState("");

  // Alert states
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => clearAlerts(), 2500);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  const clearAlerts = () => {
    setIsSuccess(false);
    setIsError(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const showSuccess = (message) => {
    clearAlerts();
    setSuccessMessage(message);
    setIsSuccess(true);
  };

  const showError = (message) => {
    clearAlerts();
    setErrorMessage(message);
    setIsError(true);
  };

  
  const addcontacter = async () => {
   
    const userString = localStorage.getItem("currentUser");
    
    
    if (!userString) {
        showError("You must be logged in to send a message.");
        return; 
    }

    
    const currentUser = JSON.parse(userString);

    if (!subject || !messages) {
      showError("Please fill in subject and message.");
      return;
    }


    const contactToAdd = { 
        email: currentUser.email,
        subject: subject, 
        message: messages
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        process.env.REACT_APP_API_URL || "http://localhost:8081",
        contactToAdd
      );
      if (response.status === 201) {
        showSuccess("Message sent successfully");
        clear();
      }
    } catch (err) {
     
      showError(err.response?.data?.message || "Error sending message.");
    } finally {
      setIsLoading(false);
    }
  };

  const clear = () => {
    setsubject("");
    setMessages("");
  };

  return (
    <section id="contact" className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-800">
            Contact <span className="text-blue-500">Us</span>
          </h2>
        </div>

        {/* Alerts */}
        {isLoading && <div className="mb-4 text-blue-600">Loading...</div>}
        {isSuccess && <div className="mb-4 text-green-600">{successMessage}</div>}
        {isError && <div className="mb-4 text-red-600">{errorMessage}</div>}

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Form */}
          <div className="flex-1 bg-white p-6 rounded shadow">
            <form className="space-y-4">
              
              {}
              <div>
                <label htmlFor="subject" className="block mb-1 font-semibold">
                  Subject:
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}
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
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="button"
                className="bg-blue-500 w-full text-white px-6 py-2 rounded"
                onClick={addcontacter}
              >
                Send
              </button>
            </form>
          </div>

          {/* Contact Info (Right Side) */}
          <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded shadow">
              <p className="flex items-center gap-2 text-gray-700">
                <i className="icofont-map text-blue-500"></i>
                <strong>Address:</strong>
              </p>
              <p>Koura, Lebanon</p>
              <p>Btouratij</p>
              <p>Kousba Road</p>
            </div>

            <div className="bg-white p-6 rounded shadow">
              <p className="flex items-center gap-2 text-gray-700">
                <i className="icofont-phone text-blue-500"></i>
                <strong>Mobile:</strong>
                <a href="tel:0096171647376" className="text-blue-500 hover:underline">
                  +961 71 647 376
                </a>
              </p>
            </div>

            <div className="bg-white p-6 rounded shadow">
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

        </div>
      </div>
    </section>
  );
}

export default Contact;