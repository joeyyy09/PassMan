import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock } from "lucide-react";
import { toast } from "react-toastify";

export default function Signin({ setAccessToken }) {
  const URL = "https://passman-backend-seven.vercel.app";
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!user.email || !user.password) {
      toast.warn("Please fill in all fields.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      console.log("Attempting to sign in with:", user);
      const loadingToastId = toast.info("Signing in...", {
        position: "top-right",
        closeButton: false,
        draggable: false,
        autoClose: 3000,
      });

      const response = await axios.post(`${URL}/auth/signin`, user);
      console.log("Sign-in response:", response);
      toast.dismiss(loadingToastId);

      if (response.data.accessToken) {
        sessionStorage.setItem("access", response.data.accessToken);
        setAccessToken(response.data.accessToken);
        toast.success("Successfully signed in!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/privateKey");
      } else if (response.data.msg && response.data.msg.errors) {
        // Handle validation errors
        response.data.msg.errors.forEach((error) => {
          console.log("Displaying error toast:", error.msg);
          toast.error(error.msg, {
            position: "top-right",
            autoClose: 3000,
          });
        });
      } else {
        console.log("Unexpected response:", response.data);
        toast.error("An unexpected error occurred.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (err) {
      console.error("Error during sign-in:", err);

      toast.dismiss();
      
      if (err.response) {
        console.log("Server responded with an error status:", err.response.status);
        console.log("Error data:", err.response.data);
        
        const { data } = err.response;
        
        if (data && data.msg && typeof data.msg === 'string') {
          // Handle general error message
          console.log("Displaying error toast:", data.msg);
          toast.error(data.msg, {
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
          <h2 className="mt-6 text-4xl font-extrabold">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-400">Sign in to your account</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignin}>
          <div className="space-y-4">
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
                className="w-full pl-10 pr-3 py-2 text-white bg-gray-800 border-b-2 border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-300"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 px-4 text-black bg-white rounded-md transition "
            >
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-400">
          Not a member?{" "}
          <Link
            to="/signup"
            className="font-medium text-cyan-400 hover:text-blue-400 transition duration-300"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
}