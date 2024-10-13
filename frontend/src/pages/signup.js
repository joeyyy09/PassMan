import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, User } from "lucide-react";
import Modal from "../components/Popup";
import { toast } from "react-toastify";

export default function SignUp({ setAccessToken, setPrivateKey, privateKey }) {
  const URL = "https://passman-backend-seven.vercel.app";
  const [user, setUser] = useState({ email: "", name: "", password: "" });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!user.email || !user.name || !user.password) {
      toast.warn("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (user.password.length < 6) {
      toast.error("Password must be at least 6 characters long.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      console.log("Attempting to sign up with:", user);
      const loadingToastId = toast.info("Signing up...", {
        position: "top-right",
        closeButton: false,
        draggable: false,
        autoClose: 3000,
      });

      const response = await axios.post(`${URL}/auth/signup`, user);
      console.log("Sign-up response:", response);
      toast.dismiss(loadingToastId);

      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        sessionStorage.setItem("access", response.data.accessToken);
        const xyw = response.data.privateKey;
        console.log({ xyw });
        setPrivateKey(xyw);
        toast.success("Successfully signed up!", {
          position: "top-right",
          autoClose: 3000,
        });
        // You can now show the Modal with the private key
      } else if (response.data.message === "user already exists") {
        console.log("User already exists");
        toast.error("User already exists. Please sign in or use a different email.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        console.log("Unexpected response:", response.data);
        toast.error("An unexpected error occurred.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error during sign-up:", err);

      toast.dismiss();
      
      if (err.response) {
        console.log("Server responded with an error status:", err.response.status);
        console.log("Error data:", err.response.data);
        
        const { data } = err.response;
        
        if (data && data.errors && Array.isArray(data.errors)) {
          // Handle validation errors
          data.errors.forEach((error) => {
            console.log("Displaying error toast:", error.msg);
            toast.error(error.msg, {
              position: "top-right",
              autoClose: 3000,
            });
          });
        } else if (data && data.message) {
          // Handle general error message
          console.log("Displaying error toast:", data.message);
          toast.error(data.message, {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          // Fallback error message
          console.log("Displaying fallback error toast");
          toast.error("An error occurred. Please try again.", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      } else if (err.request) {
        // Request was made but no response received
        console.log("No response received:", err.request);
        toast.error("No response from the server. Please check your connection.", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", err.message);
        toast.error("An unexpected error occurred.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold">Create Account</h2>
          <p className="mt-2 text-sm text-gray-400">Sign up to get started</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <div className="space-y-4">
            <div className="relative">
              <User className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full pl-10 pr-3 py-2 text-white bg-gray-800 border-b-2 border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-300"
                placeholder="Username"
                value={user.name}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Mail className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-3 py-2 text-white bg-gray-800 border-b-2 border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-300"
                placeholder="Email address"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <Lock className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full pl-10 pr-3 py-2 text-white bg-gray-800 border-b-2 border-gray-700 focus:outline-none focus:ring-0 transition duration-300"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-black bg-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="font-medium text-cyan-400 transition duration-300"
          >
            Sign in
          </Link>
        </p>
      </div>
      {privateKey && (
          <Modal privateKey={privateKey} handleSignup={handleSignup}>
            <button
              type="submit"
              className="w-full py-3 px-4 text-black bg-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2"
            >
              Sign Up
            </button>
           

            </Modal>
      )}
    </div>
  );
}