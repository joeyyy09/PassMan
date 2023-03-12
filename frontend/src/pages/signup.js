import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../components/Popup";

const SignUp = (props) => {
  const URL = "http://localhost:3300";
  const [user, setUser] = useState({ email: "", name: "", password: "" });
  const navigate = useNavigate();
  const { setAccessToken, setPrivateKey, privateKey } = props;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignup = async () => {
    await axios
      .post(`${URL}/auth/signup`, user)
      .then((response) => {
        if (response.data.accessToken) {
          setAccessToken(response.data.accessToken);
          sessionStorage.setItem("access", response.data.accessToken);
          const xyw = response.data.privateKey;
          console.log({ xyw });
          // alert(response.data.privateKey);
          setPrivateKey(xyw);
          // navigate("/home");
        } else {
          console.log(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {/* <main className="flex flex-col items-center justify-center min-h-screen w-full text-center ">
        <div className="flex ml-48">
          <div className=" bg-white w-2/5 p-5 rounded-tl-2xl rounded-bl-2xl py-36 px-12">
            <h1 className="text-3xl font-bold mb-2 text-black">Hey There!</h1>
            <div className="border-2 w-24 border-green-500 inline-block mb-2 "></div>
            <p className="text-lg mb-8 text-black ">
              Say goodbye to forgotten passwords and hello to secure, easy login
              with our password manager.
            </p>
          </div>
          <div className="rounded-2xl flex w-2/3 max-w-4xl">
            <div className=" bg-slate-400 w-3/5 p-5 rounded-tr-2xl rounded-br-2xl ">
              <div className="py-10">
                <h1 className="text-3xl font-bold mb-2 ">SignUp</h1>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="large-input1"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  id="large-input2"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mb-6">
                <input
                  type="password"
                  id="large-input3"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <button onClick={handleSignup}>
                <Link className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                  SignUp
                </Link>
              </button>

              <p className="text-lg mb-4 mt-6">
                {" "}
                Already an User? Sign In instead!
              </p>
              <Link
                href="/signin"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </main> */}
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
        <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl lg:max-w-xl">
          <h1 className="text-3xl text-blue-500 ">
            Nice to see you here at PassMan!
          </h1>
          <form className="mt-6">
            <div className="mb-2">
              <label for="email" className=" text-sm text-gray-800">
                UserName
              </label>
              <input
                type="text"
                id="large-input2"
                name="name"
                value={user.name}
                onChange={handleChange}
                className=" w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label for="email" className=" text-sm text-gray-800">
                Email
              </label>
              <input
                type="text"
                id="large-input1"
                name="email"
                value={user.email}
                onChange={handleChange}
                className=" w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mb-2">
              <label for="password" className=" text-sm text-gray-800">
                Password
              </label>
              <input
                type="password"
                id="large-input3"
                name="password"
                value={user.password}
                onChange={handleChange}
                className="block w-full px-4 py-2 mt-2 text-blue-500 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              {/* <button
                onClick={handleSignup}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-600"
              >
                <Link to="/" />
                SignUp
              </button> */}
              <Modal privateKey={privateKey} handleSignup={handleSignup} />
            </div>
          </form>

          <p className="mt-8 text-xs font-light text-center text-gray-700">
            {" "}
            Aleady have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-500 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
