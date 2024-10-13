import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Modal({ handleSignup, privateKey }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCont = () => {
    setShowModal(false);
    navigate("/home");
  };

  const onclickSignup = async () => {
    try {
      await handleSignup();
      setShowModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        className="w-full py-3 px-4 text-black bg-white rounded-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-black"
        type="button"
        onClick={onclickSignup}
      >
        Sign up
      </button>
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity backdrop-blur-sm" aria-hidden="true"></div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <div className="inline-block align-bottom bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full animate-modal-appear">
                <div className="bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-2xl leading-6 font-semibold text-white mb-4" id="modal-title">
                        Your Private Key
                      </h3>
                      <div className="mt-2">
                        <p className="text-gray-300 text-lg mb-4">
                          Your Private Key is:
                        </p>
                        <p id="privatekeyPopup" className="text-cyan-400 font-mono break-all my-2 p-3 bg-gray-700 rounded-md">
                          {privateKey}
                        </p>
                        <p className="text-gray-300 mt-4">
                          Store this private key to access your stored passwords.
                          This private key can't be recovered later on, so we suggest
                          you store it somewhere safe.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-400 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                    onClick={handleCont}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}