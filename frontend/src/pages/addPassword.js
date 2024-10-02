import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AddPassword = () => {
  const URL = "http://localhost:3300";
  const [passDetails, setPassDetails] = useState({
    websiteURL: "",
    Title: "",
    username: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("access");
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = "Bearer " + accessToken;

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const axiosJWT = axios.create();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleAddPassword = async (e) => {
    e.preventDefault();
    if (passDetails.confirm_password === passDetails.password) {
      try {
        const response = await axiosJWT.post(`${URL}/pass/addPass`, passDetails);
        console.log(response.data);
        if (response.data.msg === "password stored") {
          navigate("/allPasswords");
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Passwords do not match");
    }
  };

  const newTokenGenerator = async () => {
    try {
      const response = await axios.post(`${URL}/auth/refresh-token`);
      const { accessToken } = response.data;
      if (accessToken) {
        sessionStorage.setItem("access", accessToken);
      } else {
        console.log("User unauthorized");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const axiosRequestInterceptor = axiosJWT.interceptors.request.use(
      async (config) => {
        const currentDate = new Date();
        const decodedToken = jwt_decode(sessionStorage.getItem("access"));
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          await newTokenGenerator();
        }
        config.headers["authorization"] = "Bearer " + sessionStorage.getItem("access");
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosJWT.interceptors.request.eject(axiosRequestInterceptor);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 pt-28 pb-8">
        <form onSubmit={handleAddPassword} className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-8">Add New Password</h1>
          <div className="mb-6">
            <label htmlFor="websiteURL" className="block mb-2 text-sm font-medium text-gray-300">
              Website URL
            </label>
            <input
              type="text"
              id="websiteURL"
              name="websiteURL"
              value={passDetails.websiteURL}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ex: passman.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="Title" className="block mb-2 text-sm font-medium text-gray-300">
              Title
            </label>
            <input
              type="text"
              id="Title"
              name="Title"
              value={passDetails.Title}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ex: PassMan"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={passDetails.username}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Ex: Pass@Man"
              required
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type={isVisible2 ? "text" : "password"}
              id="password"
              name="password"
              value={passDetails.password}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="•••••••••"
              required
            />
            <FontAwesomeIcon
              icon={isVisible2 ? faEyeSlash : faEye}
              onClick={() => setIsVisible2(!isVisible2)}
              className="absolute top-10 right-4 cursor-pointer text-gray-400"
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-300">
              Confirm Password
            </label>
            <input
              type={isVisible ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={passDetails.confirm_password}
              onChange={handleChange}
              className="bg-gray-800 border border-gray-600 text-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="•••••••••"
              required
            />
            <FontAwesomeIcon
              icon={isVisible ? faEyeSlash : faEye}
              onClick={() => setIsVisible(!isVisible)}
              className="absolute top-10 right-4 cursor-pointer text-gray-400"
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center text-sm font-medium text-gray-300">
              <input
                type="checkbox"
                className="mr-2 w-4 h-4 text-blue-500 border-gray-600 focus:ring-blue-500 focus:ring-2"
                required
              />
              I agree to the terms and conditions
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="text-black bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 transition"
            >
              Add Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPassword;