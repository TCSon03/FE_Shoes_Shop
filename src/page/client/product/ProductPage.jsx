import React from "react";
import BannerShopPage from "../../../components/banner/BannerShopPage";
import useFetchProduct from "./../../../hooks/useFetchProduct";
import sneaker from "../../../assets/images/shop/sneakers.png";

const ProductPage = () => {
  const { products } = useFetchProduct();

  return (
    <div className="container mx-auto">
      <BannerShopPage />
      {/* Main shop page */}
      <div className="flex gap-6 mb-20">
        {/* Navbar shop page */}
        <div className="w-96 flex-shrink-0">
          <div className="border rounded-md px-4 py-5 mb-6">
            <h3 className="text-lg text-[#5CAF90] font-medium mb-6">Search</h3>
            <hr className="mb-7" />
            <div>
              <input
                type="text"
                className="form-input w-full border-[#eee] border-2 rounded-lg text-sm text-[#ccc] focus:outline-none"
                placeholder="Search ..."
              />
            </div>
          </div>
          <div className="border rounded-md px-4 py-5 mb-6">
            <h3 className="text-lg text-[#5CAF90] font-medium mb-6">
              Category
            </h3>
            <hr className="mb-7" />
            <div className="flex flex-col gap-10">
              <div>
                <div className="px-2">
                  <h4 className="text-[15px] font-semibold text-[#777] mb-6">
                    Women's Shoes
                  </h4>
                </div>
                <div className="flex flex-col gap-7">
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">Heels</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px]"
                    />
                    <p className="text-sm text-[#777]">Women's Sneakers</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px]"
                    />
                    <p className="text-sm text-[#777]">Women's Sandals</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px]"
                    />
                    <p className="text-sm text-[#777]">Women's Slides</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="px-2">
                  <h4 className="text-[15px] font-semibold text-[#777] mb-6">
                    Men's Shoes
                  </h4>
                </div>
                <div className="flex flex-col gap-7">
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">Men's Sneakers</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px]"
                    />
                    <p className="text-sm text-[#777]">Men's Sandals</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px]"
                    />
                    <p className="text-sm text-[#777]">Men's Loafers</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px]"
                    />
                    <p className="text-sm text-[#777]">Men's Slides</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-md px-4 py-5 mb-6">
            <h3 className="text-lg text-[#5CAF90] font-medium mb-6">Brand</h3>
            <hr className="mb-7" />
            <div className="flex flex-col gap-10">
              <div>
                <div className="flex flex-col gap-7">
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">Nike</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">Adidas</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">Puma</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">Converse</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-md px-4 py-5">
            <h3 className="text-lg text-[#5CAF90] font-medium mb-6">Price</h3>
            <hr className="mb-7" />
            <div className="flex flex-col gap-10">
              <div>
                <div className="flex flex-col gap-7">
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">Under $50</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">$50 To $100</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">$100 To $200</p>
                  </div>
                  <div className="flex gap-3 items-center">
                    <input
                      type="checkbox"
                      className="form-checkbox w-[18px] h-[18px] border-2 border-[#eee] rounded-[5px] focus:outline-none"
                    />
                    <p className="text-sm text-[#777]">Above $200</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product main shop page */}
        <div className="flex-1">
          <div className="grid grid-cols-5 gap-6">
            <div className="w-full bg-gradient-to-b from-black from-0% via-white via-50% to-white to-100% [--tw-gradient-from:rgba(0,0,0,0.24)] rounded-md p-4">
              <div className=" flex flex-col gap-[10px] items-center bg-white py-6 rounded-md">
                <div className="w-14 h-14">
                  <img src={sneaker} alt="" className="w-full h-full" />
                </div>
                <h6 className="text-[15px] text-[#5CAF90] font-bold">Clothes</h6>
                <p className="text-[13px] text-[#777] font-light">320 Items</p>
              </div>
            </div>
            <div className="w-full bg-gradient-to-b from-[#5CAF90] from-0% via-white via-50% to-white to-100% rounded-md p-4">
              <div className=" flex flex-col gap-[10px] items-center bg-white py-6 rounded-md">
                <div className="w-14 h-14">
                  <img src={sneaker} alt="" className="w-full h-full" />
                </div>
                <h6 className="text-[15px] text-[#5CAF90] font-bold">Watches</h6>
                <p className="text-[13px] text-[#777] font-light">65 Items</p>
              </div>
            </div><div className="w-full bg-gradient-to-b from-orange-700 from-0% via-white via-50% to-white to-100% rounded-md p-4">
              <div className=" flex flex-col gap-[10px] items-center bg-white py-6 rounded-md">
                <div className="w-14 h-14">
                  <img src={sneaker} alt="" className="w-full h-full" />
                </div>
                <h6 className="text-[15px] text-[#5CAF90] font-bold">Dresses</h6>
                <p className="text-[13px] text-[#777] font-light">548 Items</p>
              </div>
            </div>
            <div className="w-full bg-gradient-to-b from-purple-700 from-0% via-white via-50% to-white to-100% rounded-md p-4">
              <div className=" flex flex-col gap-[10px] items-center bg-white py-6 rounded-md">
                <div className="w-14 h-14">
                  <img src={sneaker} alt="" className="w-full h-full" />
                </div>
                <h6 className="text-[15px] text-[#5CAF90] font-bold">Glasses</h6>
                <p className="text-[13px] text-[#777] font-light">48 Items</p>
              </div>
            </div>
            <div className="w-full bg-gradient-to-b from-pink-700 from-0% via-white via-50% to-white to-100% rounded-md p-4">
              <div className=" flex flex-col gap-[10px] items-center bg-white py-6 rounded-md">
                <div className="w-14 h-14">
                  <img src={sneaker} alt="" className="w-full h-full" />
                </div>
                <h6 className="text-[15px] text-[#5CAF90] font-bold">Hat & caps</h6>
                <p className="text-[13px] text-[#777] font-light">59 Items</p>
              </div>
            </div>
          </div>

          <div className="mb-[33px]">
            <h3 className="text-[25px] font-bold text-[#5CAF90]">
              New <span className="text-[#516EBF]">Arrivals</span>
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {products.map((item, index) => (
              <div className="border rounded-md overflow-hidden" key={index}>
                <div className="p-2 w-full h-60 bg-gray-100 border-b">
                  <img
                    src={item.image_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="mb-9">
                    <p className="text-[13px] text-[#999] mb-[10px]">
                      Category
                    </p>
                    <h5 className="text-sm text-[#5CAF90]">{item.title}</h5>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-[10px]">
                      <i className="ri-star-fill text-[#F27D0C]" />
                      <i className="ri-star-fill text-[#F27D0C]" />
                      <i className="ri-star-fill text-[#F27D0C]" />
                      <i className="ri-star-fill text-[#F27D0C]" />
                      <i className="ri-star-fill" />
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-[#5CAF90] font-bold">
                        ${item.price}
                      </p>
                      <del className="text-sm text-[#777777]">$59.00</del>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
