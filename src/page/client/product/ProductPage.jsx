import React, { useEffect, useState } from "react";
import category6 from "../../../assets/images/category/category6.png";
import category7 from "../../../assets/images/category/category7.png";
import category8 from "../../../assets/images/category/category8.png";
import category9 from "../../../assets/images/category/category9.png";
import category10 from "../../../assets/images/category/category10.png";
import category5 from "../../../assets/images/shop/sneakers.png";
import useGetAllVariant from "../../../hooks/variant/useProductPage";
import { useNavigate } from "react-router-dom";

const ProductPage = () => {
  const navigate = useNavigate();
  const { variants, loading, error, pagination, fetchVariants } =
    useGetAllVariant();

  // State cục bộ cho các bộ lọc và phân trang
  const [viewMode, setViewMode] = useState("grid"); // 'grid' hoặc 'list', thêm vào đây nếu bạn muốn sử dụng
  const [searchQuery, setSearchQuery] = useState(""); // Giá trị tìm kiếm theo tên sản phẩm
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(""); // Giá trị tìm kiếm đã được debounce
  const [minPriceFilter, setMinPriceFilter] = useState("");
  const [maxPriceFilter, setMaxPriceFilter] = useState("");
  const [sortByPriceOrder, setSortByPriceOrder] = useState(""); // 'asc', 'desc', hoặc ''
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // State và hàm toggle cho các bộ lọc mở/đóng
  const [category, setCategory] = useState(true);
  const [brand, setBrand] = useState(true);
  const [price, setPrice] = useState(true);
  const [size, setSize] = useState(true);
  const [color, setColor] = useState(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      // Khi search query thay đổi, reset về trang 1
      setCurrentPage(1);
    }, 1000); // Đợi 500ms sau khi người dùng ngừng gõ

    // Cleanup function: Hủy bỏ timeout nếu searchQuery thay đổi trước khi timeout kết thúc
    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // useEffect để tự động tải dữ liệu khi component mount hoặc khi các tham số thay đổi
  useEffect(() => {
    const params = {
      search: debouncedSearchQuery, // Sử dụng debouncedSearchQuery
      minPrice: minPriceFilter,
      maxPrice: maxPriceFilter,
      sortByPrice: sortByPriceOrder,
      page: currentPage,
      limit: itemsPerPage,
    };
    fetchVariants(params); // Gọi hàm fetchVariants từ hook
  }, [
    debouncedSearchQuery, // Đã thay đổi dependency từ searchQuery sang debouncedSearchQuery
    minPriceFilter,
    maxPriceFilter,
    sortByPriceOrder,
    currentPage,
    fetchVariants,
  ]);

  // Hàm xử lý khi người dùng thay đổi trang
  const handlePageChange = (pageNumber) => {
    // Đảm bảo pageNumber nằm trong phạm vi hợp lệ
    if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Hàm xử lý khi người dùng áp dụng bộ lọc/tìm kiếm
  const handleApplyFilters = () => {
    setCurrentPage(1); // Reset về trang 1 khi áp dụng bộ lọc mới
    // Effect ở trên sẽ tự động kích hoạt lại fetchVariants với các state mới
  };

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

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  // Các câu lệnh return có điều kiện phải được đặt SAU TẤT CẢ CÁC KHAI BÁO HOOKS
  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        Đang tải dữ liệu biến thể...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ color: "red", textAlign: "center", padding: "20px" }}>
        Lỗi: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {/* Blackblums */}
      <div className="border rounded-md px-8 py-4 flex items-center justify-between mb-10">
        <p className="text-[15px] font-semibold text-[#4B5966]">Shop Page </p>
        <div className="flex items-center gap-[6px]">
          <p className="text-sm text-[#4B5966]">Home</p>
          <p className="text-sm text-[#5CAF90]">
            {" "}
            <i className="ri-arrow-right-s-line"></i>{" "}
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
        {/* Left sidebar for filters */}
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
        {/* Right content for product display */}
        <div className="flex-1 p-4">
          {/* Added padding for overall layout */}
          <div className="border p-2 rounded-md flex items-center justify-between mb-8">
            <div className="flex items-center gap-1">
              {/* Grid View Button */}
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-2 rounded-md hover:bg-[#5CAF90] hover:text-white transition-all duration-300 ${
                  viewMode === "grid" ? "bg-[#5CAF90] text-white" : ""
                }`}
              >
                <i className="ri-function-line"></i>
              </button>
              {/* List View Button */}
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-2 rounded-md hover:bg-[#5CAF90] hover:text-white transition-all duration-300 ${
                  viewMode === "list" ? "bg-[#5CAF90] text-white" : ""
                }`}
              >
                <i className="ri-list-unordered"></i>
              </button>
            </div>
            <div>
              {/* Search Input */}
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-none focus:outline-none text-sm text-[#777] mr-4 p-2 rounded-md"
              />
              {/* Sort Select */}
              <select
                value={sortByPriceOrder}
                onChange={(e) => setSortByPriceOrder(e.target.value)}
                className="border-none focus:outline-none text-sm text-[#777] rounded-md"
              >
                <option value="">Sắp xếp theo ...</option>
                <option value="asc">Giá: Tăng dần</option>
                <option value="desc">Giá: Giảm dần</option>
              </select>
            </div>
          </div>
          {loading ? (
            <div className="text-center text-lg text-[#777] my-10">
              Đang tải sản phẩm...
            </div>
          ) : error ? (
            <div className="text-center text-lg text-red-500 my-10">
              Lỗi: {error}
            </div>
          ) : (
            <>
              {variants.length > 0 ? (
                <div
                  className={`${
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                      : "flex flex-col"
                  } gap-6 mb-7`}
                >
                  {variants.map((variant) => (
                    <div
                      key={variant._id}
                      className="border rounded-md shadow-sm"
                    >
                      <div className="border-b p-5 w-full h-64 overflow-hidden">
                        {/* Sử dụng thumbnail từ productId nếu có */}
                        <img
                          src={
                            variant.productId?.thumbnail ||
                            "https://placehold.co/300x300/e0e0e0/ffffff?text=No+Image"
                          }
                          alt={variant.productId?.name || "Product Image"}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="p-5">
                        <h5
                          className="text-[14px] text-[#4B5966] mb-4 font-semibold cursor-pointer hover:text-[#5CAF90]"
                          onClick={() =>
                            handleProductClick(variant._id)
                          }
                        >
                          {variant.productId?.name || "Tên sản phẩm"}
                        </h5>

                        <div className="flex gap-2 items-baseline">
                          <p className="text-sm text-red-400 font-bold">
                            {variant.price
                              ? new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(variant.price)
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-lg text-[#777] my-10">
                  Không tìm thấy sản phẩm nào.
                </div>
              )}
            </>
          )}
          <hr className="mb-2 border-gray-200" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#777]">
              Hiển thị{" "}
              {pagination.totalItems > 0
                ? (pagination.currentPage - 1) * itemsPerPage + 1
                : 0}
              -
              {Math.min(
                pagination.currentPage * itemsPerPage,
                pagination.totalItems
              )}{" "}
              trên {pagination.totalItems} sản phẩm
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1 || loading}
                className="px-4 py-2 bg-[#5CAF90] rounded-md text-base text-white font-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-[#4a9a7a]"
              >
                Prev
              </button>
              {Array.from(
                { length: pagination.totalPages },
                (_, i) => i + 1
              ).map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`px-4 py-2 rounded-md text-base font-light transition-colors duration-300 ${
                    pagination.currentPage === pageNumber
                      ? "bg-[#5CAF90] text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  disabled={loading}
                >
                  {pageNumber}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={
                  pagination.currentPage === pagination.totalPages || loading
                }
                className="flex items-center gap-2 px-4 py-2 bg-[#5CAF90] rounded-md text-base text-white font-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 hover:bg-[#4a9a7a]"
              >
                <p>Next</p>
                <i className="ri-arrow-right-s-line"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
