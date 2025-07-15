import React from "react";
import useFetchSoftPro from "../../../hooks/product/useProductSoft";
import { Link } from "react-router-dom";
import { hardDeletePro, restorePro } from "../../../services/productApi";
import { toast } from "react-toastify";

const ProductTableSoft = () => {
  const { productSoft, loading, error } = useFetchSoftPro();

  if (loading) {
    return <p>Đang tải sản phẩm đã bị xóa mềm...</p>;
  }

  if (error) {
    return (
      <p style={{ color: "red" }}>
        Lỗi khi tải sản phẩm: {error.message || "Đã xảy ra lỗi!"}
      </p>
    );
  }

  if (productSoft.length === 0) {
    return <p>Không có sản phẩm nào bị xóa mềm.</p>;
  }

  const handleRestorePro = async (id) => {
    if (!window.confirm("Bạn có chắc muốn khôi phục sản phẩm này không?"))
      return;

    try {
      await restorePro(id);
      toast.success("Khôi phục sản phẩm thành công!");
      // Reload lại danh sách sau khi khôi phục
      window.location.reload(); // hoặc gọi lại useFetchSoftPro()
    } catch (err) {
      console.error("Lỗi khi khôi phục sản phẩm:", err);
      toast.error("Khôi phục sản phẩm thất bại!");
    }
  };
  const handleDeletePro = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa vĩnh viễn sản phẩm này không?"))
      return;

    try {
      await hardDeletePro(id);
      toast.success("Xóa vĩnh viễn sản phẩm thành công!");
      // Reload lại danh sách
      window.location.reload(); // hoặc gọi lại useFetchSoftPro()
    } catch (err) {
      console.error("Lỗi khi xóa sản phẩm:", err);
      toast.error("Xóa sản phẩm thất bại!");
    }
  };

  return (
    <div className="container mx-auto p-4 font-sans">
      <h4 className="text-xl font-semibold text-[1D2939] mb-6">
        Danh Sách Sản Phẩm Đã Xóa Mềm
      </h4>

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
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
            {productSoft.map((product, index) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {index + 1}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <button
                    title="Khôi phục"
                    className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                    onClick={() => handleRestorePro(product._id)}
                  >
                    <i className="ri-loop-right-line text-lg"></i>
                  </button>
                  <button
                    title="Xóa vĩnh viễn"
                    onClick={() => handleDeletePro(product._id)}
                    className="px-3 py-2 rounded-full text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                  >
                    <i className="ri-stop-circle-line text-lg"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTableSoft;
