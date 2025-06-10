import React, { useState } from "react";
import category6 from "../../../assets/images/category/category6.png";
import category7 from "../../../assets/images/category/category7.png";
import category8 from "../../../assets/images/category/category8.png";
import category9 from "../../../assets/images/category/category9.png";
import category10 from "../../../assets/images/category/category10.png";
import category5 from "../../../assets/images/shop/sneakers.png";

const ProductPage = () => {
  const [category, setCategory] = useState(true);
  const [brand, setBrand] = useState(true);
  const [price, setPrice] = useState(true);
  const [size, setSize] = useState(true);
  const [color, setColor] = useState(true);

  const tonggleCategory = () => {
    setCategory((prev) => !prev);
  };
  const tonggleBrand = () => {
    setBrand((prev) => !prev);
  };
  const tongglePrice = () => {
    setPrice((prev) => !prev);
  };
  const tonggleSize = () => {
    setSize((prev) => !prev);
  };
  const tonggleColor = () => {
    setColor((prev) => !prev);
  };
  return (
    <div className="container mx-auto">
      {/* Blackblums */}
      <div className="border rounded-md px-8 py-4 flex items-center justify-between mb-10">
        <p className="text-[15px] font-semibold text-[#4B5966]">Shop Page </p>
        <div className="flex items-center gap-[6px]">
          <p className="text-sm text-[#4B5966]">Home</p>
          <p className="text-sm text-[#5CAF90]">
            {" "}
            <i class="ri-arrow-right-s-line"></i>{" "}
          </p>
          <p className="text-sm text-[#5CAF90]">Shop Page</p>
        </div>
      </div>

      {/* Category Shop product */}
      <div className="grid grid-cols-6 gap-5 mb-16">
        <div className="p-[15px] bg-gradient-to-b from-slate-200 via-white to-white rounded-md">
          <div className="w-full bg-white flex flex-col items-center py-6 rounded-lg shadow-xl">
            <div className="w-10 h-10 overflow-hidden mb-[10px]">
              <img
                src={category5}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[15px] text-[#4B5966] font-bold">Sneakers</p>
            <p className="text-[13px] text-[#777] font-light">320 Items</p>
          </div>
        </div>
        <div className="p-[15px] bg-gradient-to-b from-green-200 via-white to-white rounded-md">
          <div className="w-full bg-white flex flex-col items-center py-6 rounded-lg shadow-xl">
            <div className="w-10 h-10 overflow-hidden mb-[10px]">
              <img
                src={category7}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[15px] text-[#4B5966] font-bold">Boots</p>
            <p className="text-[13px] text-[#777] font-light">65 Items</p>
          </div>
        </div>
        <div className="p-[15px] bg-gradient-to-b from-pink-100 via-white to-white rounded-md">
          <div className="w-full bg-white flex flex-col items-center py-6 rounded-lg shadow-xl">
            <div className="w-10 h-10 overflow-hidden mb-[10px]">
              <img
                src={category8}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[15px] text-[#4B5966] font-bold">Running</p>
            <p className="text-[13px] text-[#777] font-light">87 Items</p>
          </div>
        </div>
        <div className="p-[15px] bg-gradient-to-b from-gray-200 via-white to-white rounded-md">
          <div className="w-full bg-white flex flex-col items-center py-6 rounded-lg shadow-xl">
            <div className="w-10 h-10 overflow-hidden mb-[10px]">
              <img
                src={category6}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[15px] text-[#4B5966] font-bold">Basketball</p>
            <p className="text-[13px] text-[#777] font-light">198 Items</p>
          </div>
        </div>
        <div className="p-[15px] bg-gradient-to-b from-orange-200 via-white to-white rounded-md">
          <div className="w-full bg-white flex flex-col items-center py-6 rounded-lg shadow-xl">
            <div className="w-10 h-10 overflow-hidden mb-[10px]">
              <img
                src={category9}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[15px] text-[#4B5966] font-bold">Sandals</p>
            <p className="text-[13px] text-[#777] font-light">63 Items</p>
          </div>
        </div>
        <div className="p-[15px] bg-gradient-to-b from-purple-200 via-white to-white rounded-md">
          <div className="w-full bg-white flex flex-col items-center py-6 rounded-lg shadow-xl">
            <div className="w-10 h-10 overflow-hidden mb-[10px]">
              <img
                src={category10}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-[15px] text-[#4B5966] font-bold">Customs</p>
            <p className="text-[13px] text-[#777] font-light">32 Items</p>
          </div>
        </div>
      </div>

      {/* main shop page */}
      <div className="flex gap-[25px]">
        <div>
          <div className="w-[376px] border rounded-lg px-4 py-[14px] bg-[#F8F8FB] mb-5">
            <div className="">
              <div
                onClick={tonggleCategory}
                className="flex items-center justify-between mb-6 cursor-pointer"
              >
                <h4 className="text-[17px] text-[#4B5966] font-semibold">
                  Category
                </h4>
                <i className="ri-arrow-down-s-line text-xl"></i>
              </div>
              <hr />
              {category && (
                <div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Sneakers</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Boots</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Running</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Basketball</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Sandals</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Customs</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-[376px] border rounded-lg px-4 py-[14px] bg-[#F8F8FB] mb-5">
            <div className="">
              <div
                onClick={tonggleBrand}
                className="flex items-center justify-between mb-6 cursor-pointer"
              >
                <h4 className="text-[17px] text-[#4B5966] font-semibold">
                  Brand
                </h4>
                <i className="ri-arrow-down-s-line text-xl"></i>
              </div>
              <hr />
              {brand && (
                <div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Nike</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Adidas</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Puma</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Converse</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Vans</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="w-[376px] border rounded-lg px-4 py-[14px] bg-[#F8F8FB] mb-5">
            <div className="">
              <div
                onClick={tongglePrice}
                className="flex items-center justify-between mb-6 cursor-pointer"
              >
                <h4 className="text-[17px] text-[#4B5966] font-semibold">
                  Price
                </h4>
                <i className="ri-arrow-down-s-line text-xl"></i>
              </div>
              <hr />
              {price && (
                <div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Under 50$</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">50$ to 200$</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">200$ to 400$</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">400$ to 1000$</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">Over 1000$</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-[376px] border rounded-lg px-4 py-[14px] bg-[#F8F8FB] mb-5">
            <div className="">
              <div
                onClick={tonggleSize}
                className="flex items-center justify-between mb-6 cursor-pointer"
              >
                <h4 className="text-[17px] text-[#4B5966] font-semibold">
                  Size
                </h4>
                <i className="ri-arrow-down-s-line text-xl"></i>
              </div>
              <hr />
              {size && (
                <div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">35</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">36</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">37</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">38</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">39</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">40</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">41</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">42</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">43</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">44</p>
                  </div>
                  <div className="py-[15px] flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="border-gray-300 rounded"
                    />
                    <p className="text-sm text-[#777]">45</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-[376px] border rounded-lg px-4 py-[14px] bg-[#F8F8FB] mb-5">
            <div className="">
              <div
                onClick={tonggleColor}
                className="flex items-center justify-between mb-6 cursor-pointer"
              >
                <h4 className="text-[17px] text-[#4B5966] font-semibold">
                  Color
                </h4>
                <i className="ri-arrow-down-s-line text-xl"></i>
              </div>
              <hr />
              {color && (
                <div>
                  <div className="py-[15px] flex flex-wrap gap-4">
                    <button className="w-6 h-6 rounded-full bg-red-400 shadow-lg"></button>
                    <button className="w-6 h-6 rounded-full bg-white shadow-lg"></button>
                    <button className="w-6 h-6 rounded-full bg-black shadow-lg"></button>
                    <button className="w-6 h-6 rounded-full bg-green-400 shadow-lg"></button>
                    <button className="w-6 h-6 rounded-full bg-yellow-400 shadow-lg"></button>
                    <button className="w-6 h-6 rounded-full bg-pink-400 shadow-lg"></button>
                    <button className="w-6 h-6 rounded-full bg-purple-400 shadow-lg"></button>
                    <button className="w-6 h-6 rounded-full bg-slate-400 shadow-lg"></button>
                    <button className="w-6 h-6 rounded-full bg-blue-400 shadow-lg"></button>
                    <button className="w-6 h-6 rounded-full bg-orange-400 shadow-lg"></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="border p-2 rounded-md flex items-center justify-between mb-8">
            <div className="flex items-center gap-1">
              <button className="px-3 py-2 rounded-md hover:bg-[#5CAF90] hover:text-white transition-all duration-300">
                <i class="ri-function-line"></i>
              </button>
              <button className="px-3 py-2 rounded-md hover:bg-[#5CAF90] hover:text-white transition-all duration-300">
                <i class="ri-list-unordered"></i>
              </button>
            </div>
            <div>
              <select
                name=""
                id=""
                className="border-none focus:outline-none text-sm text-[#777]"
              >
                <option value="">Sắp xếp theo ...</option>
                <option value="">Giá: Tăng dần</option>
                <option value="">Giá: Giảm dần</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-7">
            <div className="border rounded-md">
              <div className="border-b p-5 w-full h-64 overflow-hidden">
                <img
                  src={category6}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-[13px] text-[#999] mb-3">category</p>
                <h5 className="text-[14px] text-[#4B5966] mb-4">
                  Mixed Nuts Berries Pack
                </h5>
                <div className="text-xl text-[#F27D0C] mb-3">
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                </div>
                <div className="flex gap-2">
                  <p className="text-sm text-[#4B5966] font-bold">$56.00</p>
                  <del className="text-sm text-[#777]">$45.00</del>
                </div>
              </div>
            </div>
            <div className="border rounded-md">
              <div className="border-b p-5 w-full h-64 overflow-hidden">
                <img
                  src={category6}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-[13px] text-[#999] mb-3">category</p>
                <h5 className="text-[14px] text-[#4B5966] mb-4">
                  Mixed Nuts Berries Pack
                </h5>
                <div className="text-xl text-[#F27D0C] mb-3">
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                </div>
                <div className="flex gap-2">
                  <p className="text-sm text-[#4B5966] font-bold">$56.00</p>
                  <del className="text-sm text-[#777]">$45.00</del>
                </div>
              </div>
            </div>
            <div className="border rounded-md">
              <div className="border-b p-5 w-full h-64 overflow-hidden">
                <img
                  src={category6}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5">
                <p className="text-[13px] text-[#999] mb-3">category</p>
                <h5 className="text-[14px] text-[#4B5966] mb-4">
                  Mixed Nuts Berries Pack
                </h5>
                <div className="text-xl text-[#F27D0C] mb-3">
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                  <i class="ri-star-s-fill"></i>
                </div>
                <div className="flex gap-2">
                  <p className="text-sm text-[#4B5966] font-bold">$56.00</p>
                  <del className="text-sm text-[#777]">$45.00</del>
                </div>
              </div>
            </div>
          </div>
          <hr className="mb-2" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#777]">Showing 1-12 of 17 item(s)</p>
            <div className="flex items-center gap-1">
              <button className="px-4 py-2 bg-[#5CAF90] rounded-md text-base text-white font-light">
                Prev
              </button>
              <p className="px-4 py-2 bg-[#5CAF90] rounded-md text-base text-white font-light">
                1
              </p>
              <button className="flex gap-2 px-4 py-2 bg-[#5CAF90] rounded-md text-base text-white font-light">
                <p>Next</p>
                <i class="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
