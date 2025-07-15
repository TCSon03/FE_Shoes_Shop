import React from "react";
import useFetchSoftCate from "../../../hooks/category/useFetchSoftCate";
import { Link } from "react-router-dom";
import { hardDeleteCate, restoreCate } from "../../../services/categoryApi";
import { toast } from "react-toastify";

const CategoryTableSoft = () => {
  const { categories, loading, error } = useFetchSoftCate();

  if (loading) {
    return <p>Đang tải danh mục đã xóa mềm...</p>;
  }

  if (error) {
    return (
      <p style={{ color: "red" }}>
        Lỗi khi tải danh mục: {error.message || "Có lỗi xảy ra!"}
      </p>
    );
  }

  if (categories.length === 0) {
    return <p>Không có danh mục nào bị xóa mềm.</p>;
  }

  const handleRestoreCate = async (id) => {
    try {
      const response = await restoreCate(id);
      if (response.data.success) {
        toast.success(response.data.message || "Khôi phục  thành công!");
        window.location.reload();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Lỗi khi khôi phục !";
      toast.error(errorMessage);
      console.error("Error restoring:", error);
    }
  };

  const handleDeleteCate = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc muốn xóa vĩnh viễn không?"
    );
    if (!confirmDelete) return;
    try {
      const response = await hardDeleteCate(id);
      console.log(response);

      if (response.data.success) {
        toast.success(response.data.message || "Xóa vĩnh thành công!");
        window.location.reload();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Lỗi khi xóa vĩnh viễn!";
      toast.error(errorMessage);
      console.error("Lỗi xóa vĩnh viễn:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-semibold text-[1D2939]">Quản lý cate</h4>
        <Link
          to="/admin/category/add"
          className="flex items-center gap-4 bg-purple-600 py-3 px-4 text-white font-medium rounded-xl hover:drop-shadow-xl hover:bg-purple-700 transition-all duration-300"
        >
          <i className="ri-add-line font-semibold"></i>
          <p>Thêm cate</p>
        </Link>
      </div>

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
                Hình ảnh
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ngày tạo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.length > 0 ? (
              categories.map((cate, index) => (
                <tr key={cate._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cate.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cate.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {cate.logo ? (
                      <img
                        src={cate.logo}
                        alt={cate.name}
                        className="w-16 h-16 object-cover rounded-md"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/64x64/E0E0E0/A0A0A0?text=No+Image";
                        }}
                      />
                    ) : (
                      <img
                        src="https://placehold.co/64x64/E0E0E0/A0A0A0?text=No+Image"
                        alt="No Image"
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(cate.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-2">
                    {/* <button
                      title="Xem chi tiết"
                      className="px-3 py-2 rounded-full text-blue-600 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                      <i className="ri-eye-fill text-lg"></i>
                    </button> */}
                    <button
                      title="Khôi phục"
                      className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                      onClick={() => handleRestoreCate(cate._id)}
                    >
                      <i className="ri-loop-right-line text-lg"></i>
                    </button>
                    <button
                      title="Xóa mềm"
                      onClick={() => handleDeleteCate(cate._id)}
                      className="px-3 py-2 rounded-full text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                      <i className="ri-stop-circle-line text-lg"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Không tìm thấy cate nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
    </div>
  );
};

export default CategoryTableSoft;
