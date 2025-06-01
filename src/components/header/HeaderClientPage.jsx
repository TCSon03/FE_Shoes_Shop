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
      <header className="container mx-auto flex justify-between items-center py-6 border-b-[1px] border-gray-300">
        <ul className="flex items-center gap-8 flex-1 justify-start font-medium">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          
        </ul>
        <Link to="/" className="flex items-center">
          <p className="bg-orange-400 rounded-full ">ST</p>
          <p>Everest</p>
          <p>.</p>
        </Link>
        <div className="flex items-center gap-5 flex-1 justify-end">
          <button>
            <i className="ri-search-2-line"></i>
          </button>
          <button>
            <i className="ri-user-line"></i>
          </button>
          <button>
            <i className="ri-shopping-cart-2-line"></i>
          </button>
        </div>
      </header>
    </>
  );
};

export default HeaderClientPage;
