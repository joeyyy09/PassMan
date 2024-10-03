import React from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Navbar from "../components/navbar";
import { FaLock } from "react-icons/fa";

const URL = "https://passman-backend-seven.vercel.app";

export default function PrivateKey(props) {
  const { setPrivateKey, privateKey } = props;
  const accessToken = sessionStorage.getItem("access");
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = "Bearer " + accessToken;
  const navigate = useNavigate();
  const axiosJWT = axios.create();

  const checkPrivate = async () => {
    setPrivateKey(privateKey.replace(/\\n/g, "\n"));
    if (privateKey !== "") {
      navigate("/home");
    }
  };

  const handleChange = (e) => {
    setPrivateKey(e.target.value);
  };

  const newTokenGenerator = async () => {
    try {
      const response = await axios.post(`${URL}/auth/refresh-token`);
      const { accessToken } = response.data;
      if (!accessToken) {
        console.log("User unauthorised");
      } else {
        console.log(accessToken);
        sessionStorage.setItem("access", accessToken);
      }
    } catch (err) {
      console.log(err);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(sessionStorage.getItem("access"));
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await newTokenGenerator();
        config.headers["authorization"] = "Bearer " + sessionStorage.getItem("access");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-32 pb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Your Private Key</h1>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center mb-6">
            <FaLock className="text-4xl text-gray-500 mr-4" />
            <p className="text-lg text-gray-300">
              Please enter your private key to access your passwords.
            </p>
          </div>
          <div className="mb-6">
            <label
              htmlFor="privateKey"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Private Key
            </label>
            <input
              id="privateKey"
              name="privateKey"
              value={privateKey}
              onChange={handleChange}
              type="password"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your private key"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={checkPrivate}
              className="bg-white hover:bg-gray-300 text-black px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              Continue
            </button>
            <Link to="/signup" className="text-blue-400 hover:underline text-sm">
              Don't have an account? Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}