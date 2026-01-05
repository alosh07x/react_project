import React, { useEffect, useState } from "react";
import axios from "axios";

function Contact() {
  const [subject, setsubject] = useState("");
  const [messages, setMessages] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!isSuccess && !isError) return;
    const timer = setTimeout(() => clearAlerts(), 2500);
    return () => clearTimeout(timer);
  }, [isSuccess, isError]);

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

    let token = null;

    try {
        const storageData = JSON.parse(userString);
        token = storageData.token || null;
    } catch (e) {
        localStorage.removeItem("currentUser");
        showError("Login data corrupted. Please Login again.");
        return;
    }

    if (!token) {
        localStorage.removeItem("currentUser"); // Clean up bad state
        showError("Session invalid. Please logout and login again.");
        return;
    }

    if (!subject || !messages) {
      showError("Please fill in subject and message.");
      return;
    }

    try {
      setIsLoading(true);
      
      // Ensure URL is formatted correctly
      const endpoint = API_URL.endsWith('/') ? `${API_URL}contact` : `${API_URL}/contact`;

      const response = await axios.post(
        endpoint,
        {
            subject: subject, 
            message: messages
        },
        {
            headers: { Authorization: token }
        }
      );

      if (response.status === 200 || response.status === 201) {
        showSuccess("Message sent successfully");
        setsubject("");
        setMessages("");
      }
    } catch (err) {
      console.error("Contact Error:", err);
      
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          // If the server says the token is bad, delete it so the user knows to relogin
          localStorage.removeItem("currentUser");
          showError("Session expired. Please Login again.");
      } else {
          showError("Error sending message. Check console for details.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-gray-800">
            Contact <span className="text-blue-500">Us</span>
          </h2>
        </div>

        {isLoading && <div className="mb-4 text-blue-600">Loading...</div>}
        {isSuccess && <div className="mb-4 text-green-600 font-bold text-center">{successMessage}</div>}
        {isError && <div className="mb-4 text-red-600 font-bold text-center">{errorMessage}</div>}

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 bg-white p-6 rounded shadow">
            <form className="space-y-4">
              <div>
                <label htmlFor="subject" className="block mb-1 font-semibold">Subject:</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setsubject(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="message" className="block mb-1 font-semibold">Message:</label>
                <textarea
                  rows="6"
                  value={messages}
                  onChange={(e) => setMessages(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                className="bg-blue-500 w-full text-white px-6 py-2 rounded hover:bg-blue-600 transition"
                onClick={addcontacter}
              >
                Send
              </button>
            </form>
          </div>
          
           <div className="flex-1 space-y-6">
            <div className="bg-white p-6 rounded shadow">
              <p className="flex items-center gap-2 text-gray-700">
                <i className="icofont-map text-blue-500"></i>
                <strong>Address:</strong>
              </p>
              <p>Koura, Lebanon</p>
            </div>
            <div className="bg-white p-6 rounded shadow">
              <p className="flex items-center gap-2 text-gray-700">
                <i className="icofont-phone text-blue-500"></i>
                <strong>Mobile:</strong> +961 71 647 376
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;