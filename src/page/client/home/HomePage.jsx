import React from "react";
import BannerPage from "../../../components/banner/BannerPage";
import { Link } from "react-router-dom";
import category1 from "../../../assets/images/category/category1.png";
import category2 from "../../../assets/images/category/category2.png";
import category3 from "../../../assets/images/category/category3.png";
import category4 from "../../../assets/images/category/category4.png";
import community1 from "../../../assets/images/community/community1.webp";
import community2 from "../../../assets/images/community/community2.webp";
import community3 from "../../../assets/images/community/community3.webp";
import community4 from "../../../assets/images/community/community4.webp";
import sub_banner from "../../../assets/images/sub_banner.png";

const HomePage = () => {
  return (
    <>
      {/* banner */}
      <BannerPage />

      {/* category */}
      <div className="container mx-auto mb-16">
        <div className="mb-5">
          <h3 className="text-3xl font-semibold">Trending Styles</h3>
        </div>
        <div className="flex justify-between items-center gap-5">
          <div className="bg-gray-50 flex-1 min-w-0 rounded-lg group hover:bg-slate-200 transition-all duration-700 ">
            {" "}
            <Link to="/">
              <div className="p-5 w-full h-80 flex items-center justify-center overflow-hidden mb-2">
                {" "}
                <img
                  src={category1}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-x-[-1]"
                />
              </div>
              <p className="text-center mt-2 font-semibold text-3xl py-3">
                Chuck 70
              </p>
            </Link>
          </div>
          <div className="bg-gray-50 flex-1 min-w-0 rounded-lg group hover:bg-slate-200 transition-all duration-700 ">
            {" "}
            <Link to="/">
              <div className="p-5 w-full h-80 flex items-center justify-center overflow-hidden mb-2">
                {" "}
                <img
                  src={category2}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-x-[-1]"
                />
              </div>
              <p className="text-center mt-2 font-semibold text-3xl py-3">
                Classic Chuck
              </p>
            </Link>
          </div>
          <div className="bg-gray-50 flex-1 min-w-0 rounded-lg group hover:bg-slate-200 transition-all duration-700 ">
            {" "}
            <Link to="/">
              <div className="p-5 w-full h-80 flex items-center justify-center overflow-hidden mb-2">
                {" "}
                <img
                  src={category3}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-x-[-1]"
                />
              </div>
              <p className="text-center mt-2 font-semibold text-3xl py-3">
                Elevation
              </p>
            </Link>
          </div>
          <div className="bg-gray-50 flex-1 min-w-0 rounded-lg group hover:bg-slate-200 transition-all duration-700 ">
            {" "}
            <Link to="/">
              <div className="p-5 w-full h-80 flex items-center justify-center overflow-hidden mb-2">
                {" "}
                <img
                  src={category4}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-x-[-1]"
                />
              </div>
              <p className="text-center mt-2 font-semibold text-3xl py-3">Comfort</p>
            </Link>
          </div>
        </div>
      </div>

      {/* hero banner */}
      <div className="container mx-auto bg-gray-100 flex items-center gap-10 p-10 rounded group mb-16">
        <div className="flex-1 flex flex-col text-center gap-8">
          <h2 className="text-7xl font-bold ">
            STELLAR <br /> TERRITORY
          </h2>
          <p className="text-3xl font-medium">
            Welcome to Star Player 76 territory
          </p>
          <Link to="/">
            {" "}
            <button className="bg-gray-950 text-white text-3xl font-medium px-16 py-3 rounded-lg hover:bg-blue-200 hover:text-red-300 transition-color duration-300">
              Mua Ngay
            </button>
          </Link>
        </div>
        <div className="flex-1 flex justify-center h-[600px]">
          <img
            src={sub_banner}
            alt=""
            className="group-hover:scale-110 transition-all duration-700"
          />
        </div>
      </div>

      
    </>
  );
};

export default HomePage;
