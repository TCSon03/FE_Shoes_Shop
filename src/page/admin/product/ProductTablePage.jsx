import React from "react";
import useProducts from "../../../hooks/product/useProduct";
import { Link } from "react-router-dom";
import { softDeletePro } from "../../../services/productApi";
import { toast } from "react-toastify";

const ProductTablePage = () => {
  const {
    products,
    pagination,
    loading,
    search,
    setSearch,
    fetchProducts,
    setPagination,
  } = useProducts(1, 5);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts(1, pagination.limit, search);
  };

  const handlePageChange = (newPage) => {
    fetchProducts(newPage, pagination.limit, search);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setPagination((prev) => ({ ...prev, limit: newLimit, page: 1 }));
    fetchProducts(1, newLimit, search);
  };

  const handleSoftDeletePro = async (product) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa mềm sản phẩm "${product.name}" không?`
    );
    if (!confirmDelete) return;

    try {
      await softDeletePro(product._id);
      toast.success("Đã xóa mềm thành công!");
      fetchProducts(pagination.page, pagination.limit, search); // reload data thay vì reload page
    } catch (error) {
      console.error("Lỗi xóa mềm sản phẩm:", error);
      toast.error("Xóa mềm thất bại!");
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-semibold text-[1D2939]">
          Danh Sách Sản Phẩm
        </h4>
        {/* Nút thêm sản phẩm, nếu có */}
      </div>

      {/* Search and Limit controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search Form */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 w-full sm:max-w-md flex gap-3"
          // Thêm sm:max-w-md hoặc sm:max-w-sm tùy theo mức độ bạn muốn giới hạn
        >
          <input
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Tìm kiếm sản phẩm theo tên..."
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          >
            Tìm
          </button>
        </form>

        {/* Select Limit */}
        <div className="flex items-center space-x-2">
          <label htmlFor="limit-select" className="text-gray-700">
            Hiển thị:
          </label>
          <select
            id="limit-select"
            value={pagination.limit}
            onChange={handleLimitChange}
            className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 "
          >
            {[5, 10, 15, 20].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-lg text-gray-600 py-10">
          Đang tải sản phẩm...
        </p>
      ) : products.length === 0 ? (
        <p className="text-center text-lg text-gray-600 py-10">
          Không tìm thấy sản phẩm nào.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên Sản Phẩm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hình ảnh
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thương hiệu
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành Động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.thumbnail && (
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.brandId?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {product.categoryId?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-2">
                    <Link
                      to={`/admin/product/edit/${product._id}`}
                      // onClick={() => handleUpdate(product._id)}
                      className="px-3 py-2 rounded-full text-yellow-600 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      title="Cập nhật sản phẩm"
                    >
                      <i className="ri-loop-right-line text-lg"></i>
                    </Link>
                    <button
                      onClick={() => handleSoftDeletePro(product)}
                      className="px-3 py-2 rounded-full text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      title="Ẩn/Xóa sản phẩm"
                    >
                      <i className="ri-stop-circle-line text-lg"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <div className="text-gray-700 text-sm">
          Hiển thị {products.length} trên tổng số {pagination.total} sản
          phẩm
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={pagination.page <= 1}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
          >
            Trang trước
          </button>
          <span className="text-gray-700 font-medium">
            Trang {pagination.page} / {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
          >
            Trang tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductTablePage;
