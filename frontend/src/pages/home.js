import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import TestimonialSection from "../components/testimonials";

const Home = () => {
  return (
    <div className="bg-black text-white flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-center lg:justify-between px-4 lg:px-6 py-12 lg:py-24 min-h-[calc(100vh-64px)] container mx-auto">
        {/* Mobile Image (hidden on larger screens) */}
        <div className="lg:hidden mb-8">
          <img
            src="/hero-vector.png"
            alt="Secure Password Management"
            className="max-w-[300px] sm:max-w-[350px] h-auto mx-auto"
          />
        </div>
        
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-6">
            PassMan
          </h1>
          <p className="text-gray-300 text-lg sm:text-xl lg:text-2xl mb-8">
            Keep all of your login information safe and secure with our
            state-of-the-art password manager.
          </p>
        </div>
        
        {/* Desktop Image (hidden on mobile) */}
        <div className="hidden lg:flex lg:w-2/5 justify-center">
          <img
            src="/hero-vector.png"
            alt="Secure Password Management"
            className="max-w-md lg:max-w-full h-auto"
          />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-12 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12">
            Why Choose PassMan?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Improved Security",
                description: "We encrypt your passwords, making them virtually impossible for hackers to steal."
              },
              {
                title: "Convenience",
                description: "Manage all your passwords in one place, so you never have to remember multiple passwords again."
              },
              {
                title: "Peace of Mind",
                description: "Know that your sensitive information is stored securely and easily accessible when needed."
              },
              {
                title: "Time-Saving",
                description: "Automatically log into websites and apps without entering passwords every time."
              }
            ].map((item, index) => (
              <div key={index} className="p-6 bg-gray-700 rounded-lg shadow-lg transform hover:scale-105 transition duration-300">
                <h3 className="text-xl font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Home;