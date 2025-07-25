import { Link } from "react-router-dom";
import useCategories from "../../../hooks/category/useFetchCate";
import CategoryForm from "./CategoryForm";
import { toast } from "react-toastify";
import { softDeleteCate } from "../../../services/categoryApi";

const CategoryList = () => {
  const {
    cates,
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
  } = useCategories();

  if (loading) {
    return <div className="text-center p-4">Đang tải dữ liệu cate...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">Lỗi: {error}</div>;
  }

  const handleSoftDeleteBrand = async (cate) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa mềm cate "${cate.name}" không?`
    );
    if (!confirmDelete) return;

    try {
      await softDeleteCate(cate._id);
      toast.success("Đã xóa mềm thành công!");
      window.location.reload();
    } catch (error) {
      console.error("Lỗi xóa mềm cate:", error);
      toast.error("Xóa mềm thất bại!");
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

      {/* Search and Limit controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên cate..."
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
            className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>
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
            {cates.length > 0 ? (
              cates.map((cate, index) => (
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
                    <Link
                      to={`/admin/category/edit/${cate._id}`}
                      title="Cập nhật"
                      className="px-3 py-2 rounded-full b text-yellow-600 hover:bg-yellow-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    >
                      <i className="ri-loop-right-line text-lg"></i>
                    </Link>
                    <button
                      title="Xóa mềm"
                      onClick={() => handleSoftDeleteBrand(cate)}
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
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-4 sm:space-y-0">
        <div className="text-gray-700 text-sm">
          Hiển thị {cates.length} trên tổng số {totalItems} cate
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

export default CategoryList;
