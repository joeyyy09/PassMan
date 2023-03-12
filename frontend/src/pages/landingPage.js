import { Link } from "react-router-dom";
import NavBar from "../components/NavbarLP";

const LandingPage = () => {
  return (
    <div className="App">
      <NavBar />

      <main className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-cyan-400 via-black to-black min-h-screen flex flex-col justify-center items-center">
        <div className="">
          <div className="text-white ">
            <h1 className="text-6xl font-medium">The Simple Way</h1>
            <h3 className="text-3xl mt-2">to store your Passwords</h3>
            <p className="mt-8">
              Keep all of your login information safe and secure <br /> with our
              state-of-the-art password manager.
            </p>
            <div className="mt-8 hover:scale-150 transition duration-500">
              <Link
                to="/signup"
                className="px-4 py-2 text-sm text-gray-800 bg-white rounded-3xl shadow hover:bg-gray-100 "
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
