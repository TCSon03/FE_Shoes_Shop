import React from "react";
import { Link } from "react-router-dom";

const FooterClientPage = () => {
  return (
    <>
      <footer className="bg-gray-900">
        <div className="container mx-auto py-6">
          <div className="md:flex md:-mx-3 md:items-center md:justify-between">
            <h1 className="text-xl font-semibold tracking-tight text-white md:mx-3 xl:text-2xl">
              Subscribe our newsletter to get update.
            </h1>
            <div className="mt-6 md:mx-3 shrink-0 md:mt-0 md:w-auto">
              <a
                href="#"
                className="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-white duration-300 bg-gray-800 rounded-lg gap-x-3 hover:bg-gray-700 focus:ring focus:ring-gray-300 focus:ring-opacity-80"
              >
                <span>Sign Up Now</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>
          <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <p className="font-semibold text-white">Quick Link</p>
              <div className="flex flex-col items-start mt-5 space-y-2">
                <Link
                  to="/"
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  Home
                </Link>
                <Link
                  to='/product'
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  Product
                </Link>
                <Link
                  to='/blog'
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  Blog
                </Link>
              </div>
            </div>
            <div>
              <p className="font-semibold text-white">Industries</p>
              <div className="flex flex-col items-start mt-5 space-y-2">
                <a
                  href="#"
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  Retail &amp; E-Commerce
                </a>
                <a
                  href="#"
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  Information Technology
                </a>
                <a
                  href="#"
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  Finance &amp; Insurance
                </a>
              </div>
            </div>
            <div>
              <p className="font-semibold text-white">Services</p>
              <div className="flex flex-col items-start mt-5 space-y-2">
                <a
                  href="#"
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  Translation
                </a>
                <a
                  href="#"
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  Proofreading &amp; Editing
                </a>
                <a
                  href="#"
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  Content Creation
                </a>
              </div>
            </div>
            <div>
              <p className="font-semibold text-white">Contact Us</p>
              <div className="flex flex-col items-start mt-5 space-y-2">
                <a
                  href="#"
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  +880 768 473 4978
                </a>
                <a
                  href="#"
                  className="text-gray-200 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500"
                >
                  info@sonsamset.com
                </a>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
          <div className="flex flex-col items-center justify-between sm:flex-row">
            <Link to="/" className="flex items-center gap-1">
              <p className="bg-orange-400 rounded-full px-3 py-2 font-semibold text-white">
                ST
              </p>
              <div className="flex items-center">
                <p className="font-semibold text-2xl text-white">Everest</p>
                <p className="font-bold text-orange-400 text-3xl">.</p>
              </div>
            </Link>
            <p className="mt-4 text-sm text-white sm:mt-0">
              © Copyright 2025. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterClientPage;
