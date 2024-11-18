import React, { useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function CardComponent(props) {
  const {
    email,
    password,
    siteTitle,
    userName,
    websiteURL,
    _id: id,
  } = props.passwordDetailes;
  const { privateKey } = props;
  const URL = "https://passman-backend-seven.vercel.app";
  const accessToken = sessionStorage.getItem("access");
  const [Password, setPassword] = useState("*********");
  const Navigate = useNavigate();
  
  axios.defaults.headers.common["authorization"] = "Bearer " + accessToken;
  const reqData = { privateKey };
  
  const axiosJWT = axios.create();

  const handleViewPass = (passId) => {
    axiosJWT
      .post(`${URL}/pass/showPass/${passId}`, reqData)
      .then((Response) => {
        const ResPass = Response.data.password;
        setPassword(ResPass);
        setTimeout(() => {
          setPassword("*********");
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid private key");
      });
  };

  const handleEditPass = (passId) => {
    Navigate(`/editPassword?id=${passId}`);
  };

  const newTokenGenerator = async () => {
    await axios
      .post(`${URL}/auth/refresh-token`)
      .then((response) => {
        const { accessToken } = response.data;
        if (!accessToken) {
          console.log("User unauthorised");
        } else {
          sessionStorage.setItem("access", accessToken);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let currentDate = new Date();
      const decodedToken = jwt_decode(sessionStorage.getItem("access"));
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await newTokenGenerator();
        config.headers["authorization"] =
          "Bearer " + sessionStorage.getItem("access");
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div className="bg-black text-white rounded-lg shadow-md lg:max-w-sm border border-gray-800" id={id}>
      <div className="p-6 w-full">
        <div className="flex items-center mb-4">
          <svg
            className="fill-current text-gray-400 w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
          </svg>
          <h4 className="text-xl font-semibold tracking-tight text-blue-400">
            {siteTitle}
          </h4>
        </div>
        <p className="mb-2 text-gray-300 text-sm">
          Site URL: <span className="text-white">{websiteURL}</span>
        </p>
        <p className="mb-2 text-gray-300 text-sm">
          Username: <span className="text-white">{userName}</span>
        </p>
        <p className="mb-4 text-gray-300 text-sm">
          Password: <span className="text-white">{Password}</span>
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleEditPass(id)}
            className="px-4 py-2 text-sm text-black bg-blue-400 rounded shadow hover:bg-blue-500 transition duration-300"
          >
            Edit Password
          </button>
          <button
            onClick={() => handleViewPass(id)}
            className="px-4 py-2 text-sm text-black bg-blue-400 rounded shadow hover:bg-blue-500 transition duration-300"
          >
            View Password
          </button>
        </div>
      </div>
    </div>
  );
}