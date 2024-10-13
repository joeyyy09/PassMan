import { Link } from "react-router-dom";
import NavBar from "../components/NavbarLP";

const LandingPage = () => {
  return (
    <div className="App bg-black min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-400 via-cyan-900 to-transparent opacity-50" style={{ top: '50%' }}></div>
        <div className="text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium text-white leading-tight mb-2">
            The Simple Way
          </h1>
          <h3 className="text-xl sm:text-2xl md:text-3xl text-white mb-6">
            to store your Passwords
          </h3>
          <p className="text-white text-sm sm:text-base max-w-lg mx-auto mb-8">
            Keep all of your login information safe and secure
            with our state-of-the-art password manager.
          </p>
          <Link
            to="/signup"
            className="inline-block px-6 py-3 text-sm sm:text-base text-gray-800 bg-white rounded-full shadow hover:bg-gray-100 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;