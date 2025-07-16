import { useCallback, useState } from "react";
import { getVariantsByProductName } from "../../services/variantApi";

const useGetAllVariant = () => {
  // State để lưu trữ danh sách biến thể
  const [variants, setVariants] = useState([]);
  // State để quản lý trạng thái tải (loading)
  const [loading, setLoading] = useState(false);
  // State để quản lý lỗi
  const [error, setError] = useState(null);
  // State để lưu trữ thông tin phân trang
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalItems: 0,
  });
  const fetchVariants = useCallback(async (params = {}) => {
    setLoading(true); // Bắt đầu tải, đặt trạng thái loading là true
    setError(null); // Xóa lỗi cũ nếu có

    try {
      const response = await getVariantsByProductName(params); // Gọi API
      // Cập nhật danh sách biến thể và thông tin phân trang từ phản hồi API
      setVariants(response.data.variants || []);
      setPagination(
        response.data.pagination || {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
        }
      );
    } catch (err) {
      // Xử lý lỗi và cập nhật state lỗi
      console.error("Lỗi khi tải biến thể:", err);
      setError(
        err.response?.data?.message || "Đã xảy ra lỗi khi tải biến thể."
      );
      setVariants([]); // Xóa danh sách biến thể nếu có lỗi
      setPagination({ currentPage: 1, totalPages: 0, totalItems: 0 }); // Reset phân trang
    } finally {
      setLoading(false); // Kết thúc tải, đặt trạng thái loading là false
    }
  }, []);
  return {
    variants,
    loading,
    error,
    pagination,
    fetchVariants, // Hàm để component gọi khi cần tải dữ liệu
  };
};

export default useGetAllVariant;
