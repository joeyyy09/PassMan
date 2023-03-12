import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signin(props) {
  const URL = "http://localhost:3300";
  const [user, setUser] = useState({ email: "", password: "" });
  const [tokens, setTokens] = useState({});
  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { setAccessToken } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    await axios
      .post(`${URL}/auth/signin`, user)
      .then((response) => {
        if (response.data.accessToken) {
          setTokens(response.data);
          setIsTokenPresent(true);
          sessionStorage.setItem("access", response.data.accessToken);
          setAccessToken(response.data.accessToken);
          navigate("/privateKey");
        } else {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsTokenPresent(false);
      });
  };

  return (
    <>
      {/* <main className="bg-white flex flex-col items-center justify-center min-h-screen w-full text-center px-20 ">
        <div className="rounded-2xl flex w-2/3 max-w-4xl">
          <div className=" bg-slate-400 w-3/5 p-5 rounded-tl-2xl rounded-bl-2xl ">
            <div className="py-10">
              <h1 className="text-3xl font-bold mb-2 ">Login</h1>
            </div>
            <div className="mb-6">
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                id="large-input1"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="mb-6">
              <input
                name="password"
                value={user.password}
                onChange={handleChange}
                type="password"
                id="large-input2"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <button onClick={handleSignin}>
              <Link
                // to="/"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign In
              </Link>
            </button>

            <p className="text-lg mb-4 mt-6"> Not an User? SignUp instead!</p>
            <Link
              to="/signup"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Sign Up
            </Link>
          </div>
          <div className=" bg-red-200 w-3/5 p-5 rounded-tr-2xl rounded-br-2xl py-36 px-12">
            <h1 className="text-3xl font-bold mb-2 text-black">Hey There!</h1>
            <div className="border-2 w-24 border-green-500 inline-block mb-2 "></div>
            <p className="text-lg mb-8 text-black ">
              Say goodbye to forgotten passwords and hello to secure, easy login
              with our password manager.
            </p>
          </div>
        </div>
      </main> */}
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl text-blue-500 ">Welcome Back!</h1>
          <form className="mt-6" onSubmit={handleSignin}>
            <div className="mb-2">
              <label for="email" className=" text-sm text-gray-800">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                id="large-input1"
                className=" w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label for="password" className=" text-sm text-gray-800">
                Password
              </label>
              <input
                name="password"
                value={user.password}
                onChange={handleChange}
                type="password"
                id="large-input2"
                className="block w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                type="submit"
                // onClick={handleSignin}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600"
              >
                Login
              </button>
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-500 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
