import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="p-4 bg-black shadow md:flex md:items-center md:justify-between md:p-6">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          <span className="text-sm text-white sm:text-center mb-4 md:mb-0">
            © 2023 PassMan™. All Rights Reserved.
          </span>

          

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="Facebook"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.595 0 0 .594 0 1.326v21.348C0 23.406.595 24 1.325 24h11.497v-9.294H9.688v-3.622h3.134V8.413c0-3.1 1.893-4.788 4.657-4.788 1.325 0 2.464.099 2.796.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.762v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .595 23.406 0 22.675 0z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="Twitter"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.608 1.794-1.574 2.163-2.723-.949.555-2.001.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.917 2.2-4.917 4.917 0 .39.045.765.13 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.733-.666 1.581-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.229-.616v.062c0 2.385 1.693 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.314 0-.621-.03-.921-.086.623 1.944 2.432 3.362 4.576 3.403-1.676 1.313-3.791 2.097-6.088 2.097-.395 0-.786-.023-1.17-.067 2.176 1.396 4.764 2.209 7.548 2.209 9.056 0 14.004-7.498 14.004-13.986 0-.21 0-.423-.016-.633.961-.695 1.8-1.562 2.46-2.549z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-400"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.75 0-5 2.25-5 5v14c0 2.75 2.25 5 5 5h14c2.75 0 5-2.25 5-5v-14c0-2.75-2.25-5-5-5zm-11.5 20h-3v-11h3v11zm-1.5-12.4c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75c.966 0 1.75.784 1.75 1.75s-.784 1.75-1.75 1.75zm13.5 12.4h-3v-5.5c0-1.104-.896-2-2-2h-1c-1.104 0-2 .896-2 2v5.5h-3v-11h3v1.5h.021c.271-.428.674-.868 1.479-.868 1.188 0 2.5 1.072 2.5 3.5v6.868z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
