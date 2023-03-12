import React from "react";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import TestimonialSection from "../components/testimonials";

const Home = () => {
  return (
    <div>
      <Navbar className="" />

      <div className="bg-white h-screen flex flex-row">
        <div className="w-1/2">
          <h1 className="text-gray-800 mt-24    pt-56 pl-16 pb-4 text-6xl">
            PassMan
          </h1>
          <h3 className="text-gray-700 text-2xl pl-16">
            Keep all of your login information safe and secure with our
            state-of-the-art password manager.
          </h3>
        </div>

        {/* <div className="bg-white w-1/2">
          <h1 className="text-gray-800 w-1/2 mt-20 pt-56 pl-16">Hi</h1>
          <img
            className="h-48 w-48 mt-20 pt-56 pl-16"
            src="https://static.vecteezy.com/system/resources/previews/002/223/429/non_2x/banner-design-of-mobile-security-system-with-password-and-smart-protection-technology-illustration-concept-be-used-for-landing-page-template-ui-ux-web-mobile-app-poster-banner-website-free-vector.jpg"
            alt=""
            width={500}
            height={500}
          />
        </div> */}
      </div>
      <div
        className="bg-white text-gray-600 p-4
      "
      >
        <h1 className="text-center mb-8 text-blue-500 text-4xl font-bold">
          Why should you use our Password Manager ?
        </h1>
        <ul>
          <li className="list-disc ml-8 ">
            <span className="font-extrabold text-black">Improved security</span>
            : Password managers store passwords in an encrypted form, making it
            much more difficult for hackers to steal them.
          </li>
          <li className="list-disc ml-8">
            <span className="font-extrabold text-black">Convenience</span>:
            Password managers can automatically generate and store strong,
            unique passwords, eliminating the need to remember multiple
            passwords.
          </li>
          <li className="list-disc ml-8">
            <span className="font-extrabold text-black">Peace of mind</span>: By
            using a password manager, users can ensure that their sensitive
            information is protected and easily accessible, reducing stress and
            anxiety about password security.
          </li>
          <li className="list-disc ml-8">
            <span className="font-extrabold text-black">Time-saving</span>:
            Password managers can automatically log users into websites and
            applications, saving time and hassle compared to manually entering
            passwords every time.
          </li>
        </ul>
      </div>
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Home;
