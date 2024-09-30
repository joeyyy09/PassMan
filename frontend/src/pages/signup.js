import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Mail, Lock, User } from "lucide-react";
import Modal from "../components/Popup";

export default function SignUp({ setAccessToken, setPrivateKey, privateKey }) {
  const URL = "http://localhost:3300";
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

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${URL}/auth/signup`, user);
      if (response.data.accessToken) {
        setAccessToken(response.data.accessToken);
        sessionStorage.setItem("access", response.data.accessToken);
        const xyw = response.data.privateKey;
        console.log({ xyw });
        setPrivateKey(xyw);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-extrabold">Create Account</h2>
          <p className="mt-2 text-sm text-gray-400">Sign up to get started</p>
        </div>
        <form className="mt-8 space-y-6">
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
             <Modal privateKey={privateKey} handleSignup={handleSignup}>
            <button
              type="submit"
              className="w-full py-3 px-4 text-black bg-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2"
            >
              Sign in
            </button>
           

            </Modal>
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
    </div>
  );
}