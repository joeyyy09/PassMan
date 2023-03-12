import axios from "axios";
import React, { useState } from "react";
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
  const URL = "http://localhost:3300";
  const accessToken = sessionStorage.getItem("access");
  const [Password, setPassword] = useState("*********");
  axios.defaults.headers.common["authorization"] = "Bearer " + accessToken;
  const reqData = { privateKey };
  const Navigate = useNavigate();
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
          // console.log(accessToken, "hello");
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
      // console.log(sessionStorage.getItem("access"));
      const decodedToken = jwt_decode(sessionStorage.getItem("access"));
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        const data = await newTokenGenerator();
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
    <>
      <div className="rounded-lg shadow-md lg:max-w-sm" id={id}>
        <div className="p-8 w-full">
          <div className="flex ">
            <svg
              class="fill-current text-gray-500 w-3 h-3 mr-2 mt-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
            </svg>
            <h4 className=" ml-2 text-xl font-semibold tracking-tight text-blue-600">
              {siteTitle}
            </h4>
          </div>
          <p class="mt-8 mb-4 text-gray-700 text-base">
            Site URL: {websiteURL}
          </p>
          <p class=" text-gray-700 text-base">Username: {userName}</p>
          <p class="mb-4 text-gray-700 text-base">Password: {Password}</p>
          <div className="flex justify-end">
            <button
              onClick={() => {
                handleEditPass(id);
              }}
              className="px-4 py-2 mr-2 text-sm text-blue-100 bg-blue-500 rounded shadow"
            >
              Edit Password
            </button>

            <button
              onClick={() => {
                handleViewPass(id);
              }}
              className="px-4 py-2 text-sm text-blue-100 bg-blue-500 rounded shadow"
            >
              View Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
