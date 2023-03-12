import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import CardComponent from "../components/cards";
import { Link } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AllPasswords = (props) => {
  const URL = "http://localhost:3300";
  const accessToken = sessionStorage.getItem("access");
  const { privateKey } = props;
  const [Passwords, setPasswords] = useState([]);
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = "Bearer " + accessToken;

  const axiosJWT = axios.create();

  useEffect(() => {
    async function fetchData() {
      await axiosJWT
        .get(`${URL}/pass/getallpass`)
        .then((response) => {
          setPasswords(response.data);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.data.msg === "jwt expired") {
            alert("User logged out");
            sessionStorage.removeItem("access");
            window.location.reload(false);
          }
        });
    }
    fetchData();
  }, []);

  const newTokenGenerator = async () => {
    await axios
      .post(`${URL}/auth/refresh-token`)
      .then((response) => {
        const { accessToken } = response.data;
        if (!accessToken) {
          console.log("User unauthorised");
        } else {
          console.log(accessToken);
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
    <div className="bg-white">
      <div className="flex justify-center">
        <Navbar className="" />
      </div>
      <div className="flex justify-center">
        {/* <button
          type="button"
          class="mt-32  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5 mr-2 -ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
          </svg>
          Add New Password
        </button> */}
      </div>
      <div className="mt-8 p-16 grid grid-rows-3 grid-flow-row gap-16">
        {Passwords.map((pass, i) => {
          return (
            <CardComponent
              key={i}
              passwordDetailes={pass}
              privateKey={privateKey}
            />
          );
        })}
      </div>
      <div>
        <Link
          class="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl duration-300"
          href="/addPassword"
        >
          {" "}
          +
        </Link>
      </div>
    </div>
  );
};

export default AllPasswords;
