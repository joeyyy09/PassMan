import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";

const EditPassword = (props) => {
  const URL = "http://localhost:3300";
  const [passDetailes, setPassDetailes] = useState({});
  const navigate = useNavigate();
  const accessToken = sessionStorage.getItem("access");
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common["authorization"] = "Bearer " + accessToken;
  const [searchParams, setSearchParams] = useSearchParams();
  const passId = searchParams.get("id");
  const { privateKey } = props;
  const reqData = { privateKey };
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const axiosJWT = axios.create();
  useEffect(() => {
    async function fetchData() {
      await axiosJWT
        .post(`${URL}/pass/getpass/${passId}`, reqData)
        .then((response) => {
          passDetailes.websiteURL = response.data.websiteURL;
          passDetailes.Title = response.data.siteTitle;
          passDetailes.password = response.data.password;
          passDetailes.username = response.data.userName;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassDetailes({
      ...passDetailes,
      [name]: value,
    });
  };

  const handleEditPassword = async (e) => {
    e.preventDefault();
    if (passDetailes.confirm_password === passDetailes.password) {
      await axiosJWT
        .put(`${URL}/pass/updatePass/${passId}`, passDetailes)
        .then((response) => {
          console.log(response.data);
          if (response.data.msg === "Password updated") {
            navigate("/allPasswords");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Passwords not same");
    }
  };
  const handleDelete = async () => {
    await axiosJWT
      .delete(`${URL}/pass/delPass/${passId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.msg === "Password deleted") {
          alert("Password deleted");
          navigate("/allPasswords");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
    <div className="h-screen bg-white">
      <Navbar className="" />
      <form onSubmit={handleEditPassword}>
        <div className="bg-white p-8">
          <div class=" mt-20 mb-6">
            <label
              for="email"
              class="block mb-2 ml-1 text-sm font-medium text-gray-900"
            >
              Site address
            </label>
            <input
              type="text"
              id="email"
              name="websiteURL"
              value={passDetailes.websiteURL}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Ex: passman.com"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="Title"
              class="block mb-2 ml-1 text-sm font-medium text-gray-900 "
            >
              Site Title
            </label>
            <input
              type="text"
              id="Title"
              name="Title"
              value={passDetailes.Title}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Ex: PassMan"
              required
            />
          </div>

          <div class="mb-6">
            <label
              for="username"
              class="block mb-2 ml-1 text-sm font-medium text-gray-900 "
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={passDetailes.username}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Ex: Pass@Man"
              required
            />
          </div>
          <div class="mb-6">
            <label
              for="password"
              class="block mb-2 ml-1 text-sm font-medium text-gray-900 "
            >
              New Password
            </label>
            <input
              type={isVisible2 ? "text" : "password"}
              id="password"
              name="password"
              value={passDetailes.password}
              onChange={handleChange}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="•••••••••"
              required
            />
            <p
              onClick={() => {
                isVisible2 ? setIsVisible2(false) : setIsVisible2(true);
              }}
            >
              {isVisible2 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </p>
          </div>

          <div class="mb-6">
            <label
              for="confirm_password"
              class="block mb-2 ml-1 text-sm font-medium text-gray-900 "
            >
              Confirm password
            </label>
            <input
              type={isVisible ? "text" : "password"}
              id="confirm_password"
              name="confirm_password"
              value={passDetailes.confirm_password}
              onChange={handleChange}
              class="block bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="•••••••••"
              required
            />
            <p
              onClick={() => {
                isVisible ? setIsVisible(false) : setIsVisible(true);
              }}
            >
              {isVisible ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </p>
          </div>

          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                required
              />
            </div>

            <label
              for="remember"
              class="ml-2 text-sm font-medium text-gray-900 "
            >
              I agree with the terms and conditions.
            </label>
          </div>

          <div className="flex justify-between">
            <button
              onClick={handleDelete}
              className="text-white flex flex-col sm:text-center justify-end bg-blue-500 hover:bg-red-400 transition-colors duration-300 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Delete
            </button>

            <button
              type="submit"
              className="text-white flex flex-col sm:text-center justify-end bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default EditPassword;
