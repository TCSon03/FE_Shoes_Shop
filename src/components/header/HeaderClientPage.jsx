import React from "react";
import { Link } from "react-router-dom";

const HeaderClientPage = () => {
  return (
    <>
      <div className="bg-slate-800">
        <div className="container mx-auto flex justify-between py-2 ">
          <p className="font-medium text-sm text-gray-300">
            Get free delivery on orders over $1000000
          </p>
          <div className="flex items-center gap-5">
            <Link
              className=" font-medium text-sm text-gray-300 hover:text-white"
              to="/register"
            >
              Create an account
            </Link>
            <span className="h-full border-l-[1px] border-gray-300"></span>
            <Link
              className=" font-medium text-sm text-gray-300 hover:text-white"
              to="/login"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <header className="container mx-auto flex justify-between items-center py-4 border-b-[1px] border-gray-300 mb-10">
        <ul className="flex items-center gap-8 flex-1 justify-start font-medium">
          <li>
            <Link
              className="relative group text-gray-700 hover:text-blue-600 transition-colors duration-300"
              to="/"
            >
              Home
              <span className="absolute bottom-[-26px] left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full group-hover:bg-blue-600"></span>
            </Link>
          </li>
          <li>
            <Link
              className="relative group text-gray-700 hover:text-blue-600 transition-colors duration-300"
              to="/product"
            >
              Product
              <span className="absolute bottom-[-26px] left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full group-hover:bg-blue-600"></span>
            </Link>
          </li>
          <li>
            <Link
              className="relative group text-gray-700 hover:text-blue-600 transition-colors duration-300"
              to="/blog"
            >
              Blog
              <span className="absolute bottom-[-26px] left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full group-hover:bg-blue-600"></span>
            </Link>
          </li>
          <li>
            <Link
              className="relative group text-gray-700 hover:text-blue-600 transition-colors duration-300"
              to="/contact"
            >
              Contact
              <span className="absolute bottom-[-26px] left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full group-hover:bg-blue-600"></span>
            </Link>
          </li>
        </ul>
        <Link to="/" className="flex items-center gap-1">
          <p className="bg-orange-400 rounded-full px-3 py-2 font-semibold text-white">
            ST
          </p>
          <div className="flex items-center">
            <p className="font-semibold text-2xl">Everest</p>
            <p className="font-bold text-orange-400 text-3xl">.</p>
          </div>
        </Link>
        <div className="flex items-center gap-5 flex-1 justify-end">
          <button className="bg-gray-200 px-2 py-1 rounded-full group hover:bg-blue-400 transition-colors duration-300">
            <i className="ri-search-2-line font-medium group-hover:text-blue-100 transition-all duration-300"></i>
          </button>
          <button className="bg-gray-200 px-2 py-1 rounded-full group hover:bg-blue-400 transition-colors duration-300">
            <i className="ri-user-line font-medium group-hover:text-blue-100 transition-all duration-300"></i>
          </button>
          <Link
            to="/cart"
            className="bg-gray-200 px-2 py-1 rounded-full group hover:bg-blue-400 transition-colors duration-300"
          >
            <i className="ri-shopping-cart-2-line font-medium group-hover:text-blue-100 transition-all duration-300"></i>
          </Link>
        </div>
      </header>
    </>
  );
};

export default HeaderClientPage;
