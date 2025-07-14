import React from "react";
import useFetchSoftBrand from "../../../hooks/brand/useFetchSoftBrand";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { hardDeleteBrand, restoreBrand } from "../../../services/brandApi";

const BrandTableSoftPage = () => {
  const {
    brands,
    loading,
    error,
    page,
    limit,
    search,
    totalPages,
    totalItems,
    handlePageChange,
    handleLimitChange,
    handleSearchChange,
  } = useFetchSoftBrand();

  if (loading) {
    return (
      <div className="text-center p-4">
        Đang tải dữ liệu Brand đã xóa mềm...
      </div>
    );
  }
  if (error) {
    return <div className="text-center p-4 text-red-500">Lỗi: {error}</div>;
  }

  const handleRestoreBrand = async (id) => {
    try {
      const response = await restoreBrand(id);
      if (response.data.success) {
        toast.success(response.data.message || "Khôi phục Brand thành công!");
        window.location.reload();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Lỗi khi khôi phục Brand!";
      toast.error(errorMessage);
      console.error("Error restoring brand:", error);
    }
  };

  const handleDeleteBrand = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa vĩnh viễn Brand này không?"
    );
    if (!confirmDelete) return;
    try {
      const response = await hardDeleteBrand(id); // Gọi API xóa vĩnh viễn
      if (response.data.success) {
        toast.success(
          response.data.message || "Xóa vĩnh viễn Brand thành công!"
        );
        window.location.reload();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Lỗi khi xóa vĩnh viễn Brand!";
      toast.error(errorMessage);
      console.error("Lỗi xóa vĩnh viễn Brand:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-semibold text-[1D2939]">
          Danh sách Brand đã xóa mềm
        </h4>
        <Link
          to="/admin/brand"
          className="flex items-center gap-2 bg-gray-200 py-2 px-4 text-gray-700 font-medium rounded-xl hover:bg-gray-300 transition-all duration-300"
        >
          <i className="ri-arrow-left-line font-semibold"></i>
          <p>Quay lại danh sách Brand</p>
        </Link>
      </div>

      {/* Search and Limit controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên Brand đã xóa..."
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-1/2 md:w-1/3"
        />
        <div className="flex items-center space-x-2">
          <label htmlFor="limit" className="text-gray-700">
            Hiển thị:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={(e) => handleLimitChange(parseInt(e.target.value))}
            className=" border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>

      {/* Brand Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STT
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tên Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày xóa
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {brands.length > 0 ? (
              brands.map((brand, index) => (
                <tr key={brand._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {brand.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {brand.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(brand.deletedAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-2">
                    <button
                      title="Khôi phục Brand"
                      className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      onClick={() => handleRestoreBrand(brand._id)}
                    >
                      <i className="ri-refresh-line text-lg"></i>{" "}
                    </button>
                    <button
                      title="Xóa vĩnh viễn"
                      className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      onClick={() => handleDeleteBrand(brand._id)}
                    >
                      <i className="ri-delete-bin-line text-lg"></i>{" "}
                      {/* Icon cho hard delete */}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Không có Brand nào bị xóa mềm.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <div className="text-gray-700 text-sm">
          Hiển thị {brands.length} trên tổng số {totalItems} Brand đã xóa
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
          >
            Trang trước
          </button>
          <span className="text-gray-700 font-medium">
            Trang {page} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
          >
            Trang tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrandTableSoftPage;
