import React, { useEffect } from "react";
import useVariants from "../../../hooks/variant/useVariants";
import { Link } from "react-router-dom";
import { hardDeleteVar } from "../../../services/variantApi";
import { toast } from "react-toastify";

const VariantList = () => {
  const {
    variants,
    pagination,
    loading,
    search,
    setSearch,
    fetchVariants,
    setPagination,
    sortPrice,
    setSortPrice,
  } = useVariants();

  // Fetch lại khi search hoặc sortPrice thay đổi
  useEffect(() => {
    fetchVariants(1, pagination.limit, search, sortPrice);
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [search, sortPrice]);

  const handlePageChange = (newPage) => {
    fetchVariants(newPage, pagination.limit, search, sortPrice);
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleDeleteVariant = async (id) => {
    const confirm = window.confirm("Bạn có chắc muốn xóa biến thể này?");
    if (!confirm) return;

    try {
      await hardDeleteVar(id);
      toast.success("Xóa biến thể thành công");
      fetchVariants(pagination.page, pagination.limit, search, sortPrice);
    } catch (error) {
      console.error("Xóa thất bại:", error);
      toast.error("Xóa biến thể thất bại");
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-semibold text-[1D2939]">
          Danh sách biến thể sản phẩm
        </h4>
      </div>

      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-4">
        <form className="flex-1 w-full sm:max-w-md flex gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo màu hoặc size..."
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>

        {/* Dropdown lọc theo giá */}
        <div className="flex items-center space-x-2">
          <label htmlFor="sort-select" className="text-gray-700">
            Lọc theo giá:
          </label>
          <select
            id="sort-select"
            value={sortPrice}
            onChange={(e) => setSortPrice(e.target.value)}
            className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Mặc định</option>
            <option value="asc">Tăng dần</option>
            <option value="desc">Giảm dần</option>
          </select>
        </div>
      </div>

      {/* Loading / Empty / Table */}
      {loading ? (
        <p className="text-center text-lg text-gray-600 py-10">
          Đang tải dữ liệu...
        </p>
      ) : variants.length === 0 ? (
        <p className="text-center text-lg text-gray-600 py-10">
          Không tìm thấy biến thể nào.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "STT",
                  "Màu",
                  "Size",
                  "Giá",
                  "Tồn kho",
                  "Ảnh",
                  "Sản phẩm",
                  "Hành Động",
                ].map((text) => (
                  <th
                    key={text}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {variants.map((v, index) => (
                <tr key={v._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {v.color}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {v.size}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {v.price?.toLocaleString()}đ
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {v.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <img
                      src={v.image}
                      alt="variant"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {v.productId?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-2">
                    <Link
                      to={`/admin/variant/edit/${v._id}`}
                      className="px-3 py-2 rounded-full text-yellow-600 hover:bg-yellow-200 transition"
                      title="Cập nhật biến thể"
                    >
                      <i className="ri-loop-right-line text-lg"></i>
                    </Link>
                    <button
                      onClick={() => handleDeleteVariant(v._id)}
                      className="px-3 py-2 rounded-full text-red-600 hover:bg-red-200 transition"
                      title="Xóa biến thể"
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
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
          Hiển thị {variants.length} trên tổng số {pagination.total} biến thể
        </div>
        <div className="flex items-center space-x-2">
          <button
            disabled={pagination.page <= 1}
            onClick={() => handlePageChange(pagination.page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 transition"
          >
            Trang trước
          </button>
          <span className="text-gray-700 font-medium">
            Trang {pagination.page} / {pagination.totalPages}
          </span>
          <button
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => handlePageChange(pagination.page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 transition"
          >
            Trang tiếp
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantList;
