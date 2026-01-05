import React, { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [isLogin, Login] = useState(true); // toggle between login/signup

  // Login state
  const [loginEmail, LoginEmail] = useState("");
  const [loginPassword, LoginPassword] = useState("");

  // Signup state
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");

  // Alerts
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const clearLoginForm = () => {
    LoginEmail("");
    LoginPassword("");
  };

  const clearSignupForm = () => {
    setSignupUsername("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupConfirmPassword("");
  };

  const API_URL = process.env.REACT_APP_API_URL;

  // Login handler
  const loginUser = async () => {
    if (!loginEmail || !loginPassword) {
      showError("Please fill in all login fields.");
      return;
    }

    try {
      setIsLoading(true);
      
      const res = await axios.post(API_URL + "/login", {
        email: loginEmail,
        password: loginPassword,
      });

      if (res.data.message === "Login successful"){
        
        // --- CRITICAL FIX HERE ---
        // We now save the ENTIRE response (res.data)
        // This includes both the 'user' object AND the 'token' string.
        localStorage.setItem("currentUser", JSON.stringify(res.data)); 
        // -------------------------

        showSuccess("Login successful!");
         
         setTimeout(() => {
             window.location.href = "/"; 
         }, 1000);
         
         clearLoginForm();
      } else {
         showError(res.data.message);
      }

    } catch (err) {
      showError(err.response?.data?.message || "Login failed.");
    } finally {
      setIsLoading(false);
    }
  };

  // Signup handler
  const registerUser = async () => {
    if (signupPassword !== signupConfirmPassword) {
        showError("Passwords do not match!");
        return;
    }

    try {
      setIsLoading(true);
    
      const res = await axios.post(API_URL + "/register", {
        username: signupUsername,
        email: signupEmail,
        password: signupPassword,
      });
      showSuccess(res.data.message || "Registration successful!");
      clearSignupForm();
      Login(true); // switch to login after successful signup
    } catch (err) {
      showError(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 py-20 ">
      <div className="bg-white p-10 rounded-[10px] w-[90%] max-w-[600px] shadow-md hover:shadow-lg transition-shadow text-center">

        {/* Login Form */}
        {isLogin && (
          <>
            <h1 className="text-[32px] mb-[20px] font-semibold">Login To Golden Cup</h1>
            {isLoading && <div className="mb-4 text-blue-600">Loading...</div>}
            {isSuccess && <div className="mb-4 text-green-600">{successMessage}</div>}
            {isError && <div className="mb-4 text-red-600">{errorMessage}</div>}
           <div className=" text-left">
          <label className="block mb-2">Email</label>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => LoginEmail(e.target.value)}
              className="w-full h-[40px] mb-4 px-3 border rounded-[10px]"
            /> </div>

            <div className="mb-[10px] text-left">
          <label className="block mb-2">Password</label>
            <input
              type="password"
              value={loginPassword}
              onChange={(e) => LoginPassword(e.target.value)}
              className="w-full h-[40px] mb-4 px-3 border rounded-[10px]"
            /></div>
            <button
              onClick={loginUser}
              className="w-full h-[45px] bg-blue-700 text-white rounded-[10px] hover:bg-blue-600 transition mb-4"
            >
              Login
            </button>
            <p className="text-gray-500 mt-0">
              Don't have an account?{" "}
              <span
                onClick={() => Login(false)}
                className="text-blue-500 cursor-pointer underline"
              >
                Sign Up
              </span>
            </p>
          </>
        )}

        {/* Signup Form */}
        {!isLogin && (
          <>
            <h1 className="text-[32px] mb-[20px] font-semibold">Create Account</h1>
            {isLoading && <div className="mb-4 text-blue-600">Loading...</div>}
            {isSuccess && <div className="mb-4 text-green-600">{successMessage}</div>}
            {isError && <div className="mb-4 text-red-600">{errorMessage}</div>}
           <div className=" text-left">
           <label className="block mb-2">Username</label></div>
            <input
              type="text"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              className="w-full h-[40px] mb-4 px-3 border rounded-[10px]"
            />
            <div className=" text-left">
           <label className="block mb-2">Email</label></div>
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              className="w-full h-[40px] mb-4 px-3 border rounded-[10px]"
            />
            <div className=" text-left">
           <label className="block mb-2">Password</label></div>
            <input
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              className="w-full h-[40px] mb-4 px-3 border rounded-[10px]"
            />
            <div className=" text-left">
           <label className="block mb-2">Confirm Password</label></div>
            <input
              type="password"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              className="w-full h-[40px] mb-4 px-3 border rounded-[10px]"
            />
            <button
              onClick={registerUser}
              className="w-full h-[45px] bg-blue-700 text-white rounded-[10px] hover:bg-blue-600 transition mb-4"
            >
              Register
            </button>
            <p className="text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => Login(true)}
                className="text-blue-500 cursor-pointer underline"
              >
                Login
              </span>
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default Login;