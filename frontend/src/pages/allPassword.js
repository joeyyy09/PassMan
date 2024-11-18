import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { FaLock } from "react-icons/fa";
import Navbar from "../components/navbar";
import CardComponent from "../components/cards";

const URL = "https://passman-backend-seven.vercel.app";

const AllPasswords = ({ privateKey }) => {
  const [passwords, setPasswords] = useState([]);
  const accessToken = sessionStorage.getItem("access");
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = "Bearer " + accessToken;
  const axiosJWT = axios.create();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosJWT.get(`${URL}/pass/getallpass`);
        setPasswords(response.data);
      } catch (err) {
        console.error(err);
        if (err.response?.data?.msg === "jwt expired") {
          alert("User logged out");
          sessionStorage.removeItem("access");
          window.location.reload(false);
        }
      }
    }
    fetchData();
  }, []);

  const newTokenGenerator = async () => {
    try {
      const response = await axios.post(`${URL}/auth/refresh-token`);
      const { accessToken } = response.data;
      if (!accessToken) {
        console.log("User unauthorized");
      } else {
        sessionStorage.setItem("access", accessToken);
      }
    } catch (err) {
      console.error(err);
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
      <div className="container mx-auto px-4 pt-28 pb-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Your Passwords</h1>
        </div>
        {passwords.length === 0 ? (
          <div className="text-center py-60">
            <FaLock className="text-4xl mx-auto mb-4 text-gray-500" />
            <p className="text-lg text-gray-400">No passwords saved yet. Add your first password to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {passwords.map((pass, i) => (
              <CardComponent
                key={i}
                passwordDetailes={pass}
                privateKey={privateKey}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPasswords;