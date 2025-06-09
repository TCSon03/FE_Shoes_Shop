import React from "react";
import banner1 from "../../assets/images/shop/banner.png"


const BannerShopPage = () => {
  return (
    <>
      {/* Banner Shop page */}
      <div className="bg-slate-100 p-4 rounded-md flex px-28 mb-20">
        <div className="flex-1 flex flex-col gap-8 justify-center">
          <p className="text-[#516EBF] text-xl font-medium">
            Starting at $ <span className="font-bold">29.99</span>
          </p>
          <h2 className="text-[#5CAF90] text-[55px] font-bold">
            Explore shoes <br />
            sale for men's
          </h2>
          <p>
            <button className=" px-[15px] py-[10px] bg-[#5CAF90] rounded-md text-white flex items-center text-sm hover:bg-[#20c98b] transition-colors duration-300">
              Shop Now <i className="ri-arrow-right-double-line"></i>
            </button>
          </p>
        </div>
        <img
          className="flex-1 w-full h-[600px] object-cover"
          src={banner1}
          alt=""
        />
      </div>
    </>
  );
};

export default BannerShopPage;
