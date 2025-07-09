import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  return (
    <div className="w-80 border-r px-5">
      <Link to="/admin" className="flex items-center gap-3 py-8">
        <i className="ri-bubble-chart-fill border py-1 px-2 bg-blue-500 text-white text-xl rounded-xl"></i>
        <h3 className="text-2xl font-semibold">
          Shoes<span className="text-orange-400">Admin</span>
        </h3>
      </Link>
      <p className="text-xs text-gray-400 mb-4">MENU</p>
      <nav className="">
        <ul className="flex flex-col gap-1">
          {/* <li className="py-2 px-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-xl group">
            <div className="flex items-center gap-2">
              <i className="ri-dashboard-horizontal-line text-2xl text-gray-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300"></i>
              <Link
                to="/admin"
                className="text-sm font-medium text-gray-700 group-hover:text-orange-400 transition-all duration-300"
              >
                Dashboard
              </Link>
            </div>
            <i className="ri-arrow-right-s-line text-2xl text-gray-500 group-hover:text-blue-400 transition-all duration-300"></i>
          </li> */}

          <li className="py-2 px-3 flex flex-col cursor-pointer hover:bg-slate-100 rounded-xl group transition-all duration-300">
            <div
              onClick={() => setOpenDropdown(!openDropdown)}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <i className="ri-dashboard-horizontal-line text-2xl text-gray-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300"></i>
                <span className="text-sm font-medium text-gray-700 group-hover:text-orange-400 transition-all duration-300">
                  Dashboard
                </span>
              </div>
              <i
                className={`ri-arrow-${
                  openDropdown ? "down" : "right"
                }-s-line text-2xl text-gray-500 group-hover:text-blue-400 transition-all duration-300`}
              ></i>
            </div>

            {/* Dropdown submenu */}
            {openDropdown && (
              <ul className="ml-8 mt-2 flex flex-col gap-1">
                <li>
                  <Link
                    to="/admin/overview"
                    className="text-sm text-gray-600 hover:text-blue-500 transition-all"
                  >
                    Tổng quan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin/stats"
                    className="text-sm text-gray-600 hover:text-blue-500 transition-all"
                  >
                    Thống kê
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="py-2 px-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-xl group">
            <div className="flex items-center gap-2">
              <i className="ri-product-hunt-line text-2xl text-gray-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300"></i>
              <Link
                to="/admin/product"
                className="text-sm font-medium text-gray-700 group-hover:text-orange-400 transition-all duration-300"
              >
                Product
              </Link>
            </div>
            <i className="ri-arrow-right-s-line text-2xl text-gray-500 group-hover:text-blue-400 transition-all duration-300"></i>
          </li>
          <li className="py-2 px-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-xl group">
            <div className="flex items-center gap-2">
              <i className="ri-product-hunt-line text-2xl text-gray-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300"></i>
              <Link
                to="/admin/brand"
                className="text-sm font-medium text-gray-700 group-hover:text-orange-400 transition-all duration-300"
              >
                Brand
              </Link>
            </div>
            <i className="ri-arrow-right-s-line text-2xl text-gray-500 group-hover:text-blue-400 transition-all duration-300"></i>
          </li>

          <li className="py-2 px-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-xl group">
            <div className="flex items-center gap-2">
              <i className="ri-folder-open-line text-2xl text-gray-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300"></i>
              <Link
                to="/admin/category"
                className="text-sm font-medium text-gray-700 group-hover:text-orange-400 transition-all duration-300"
              >
                Category
              </Link>
            </div>
            <i className="ri-arrow-right-s-line text-2xl text-gray-500 group-hover:text-blue-400 transition-all duration-300"></i>
          </li>
          <li className="py-2 px-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-xl group">
            <div className="flex items-center gap-2">
              <i className="ri-list-ordered text-2xl text-gray-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300"></i>
              <Link
                to="/admin/order"
                className="text-sm font-medium text-gray-700 group-hover:text-orange-400 transition-all duration-300"
              >
                Order
              </Link>
            </div>
            <i className="ri-arrow-right-s-line text-2xl text-gray-500 group-hover:text-blue-400 transition-all duration-300"></i>
          </li>
          <li className="py-2 px-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-xl group">
            <div className="flex items-center gap-2">
              <i className="ri-map-pin-user-line text-2xl text-gray-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300"></i>
              <Link
                to="/admin/user"
                className="text-sm font-medium text-gray-700 group-hover:text-orange-400 transition-all duration-300"
              >
                User
              </Link>
            </div>
          </li>
          <li className="py-2 px-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-xl group">
            <div className="flex items-center gap-2">
              <i className="ri-settings-5-line text-2xl text-gray-500 group-hover:scale-110 group-hover:text-blue-400 transition-all duration-300"></i>
              <Link
                to="/admin/setting"
                className="text-sm font-medium text-gray-700 group-hover:text-orange-400 transition-all duration-300"
              >
                Setting
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
