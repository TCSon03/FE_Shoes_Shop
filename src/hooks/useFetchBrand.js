import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks từ react-router-dom
import { getAllBrand } from "../services/brandApi";

const useFetchBrand = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy các tham số từ URL khi khởi tạo state
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = parseInt(queryParams.get("limit")) || 5;
  const initialSearch = queryParams.get("search") || "";

  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Hàm fetchBrands sẽ được gọi khi page, limit, hoặc search thay đổi
  // Các giá trị này sẽ được lấy từ state, mà state lại được cập nhật từ URL
  const fetchBrands = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllBrand(page, limit, search);
      setBrands(response.data.data);
      setTotalItems(response.data.pagination.totalItems);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách Brand:", err);
      setError("Không thể tải dữ liệu Brand.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect để cập nhật state từ URL khi URL thay đổi (ví dụ: người dùng back/forward trình duyệt)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newPage = parseInt(queryParams.get("page")) || 1;
    const newLimit = parseInt(queryParams.get("limit")) || 5;
    const newSearch = queryParams.get("search") || "";

    // Chỉ cập nhật state nếu có sự khác biệt để tránh loop vô hạn
    if (newPage !== page) setPage(newPage);
    if (newLimit !== limit) setLimit(newLimit);
    if (newSearch !== search) setSearch(newSearch);

    // Gọi fetchBrands khi các tham số thay đổi
    fetchBrands();
  }, [location.search, page, limit, search]); // Phụ thuộc vào location.search để phản ứng với thay đổi URL

  // Hàm cập nhật URL và sau đó state sẽ được cập nhật thông qua useEffect
  const updateUrl = (newPage, newLimit, newSearch) => {
    const params = new URLSearchParams();
    if (newPage !== 1) params.set("page", newPage);
    if (newLimit !== 5) params.set("limit", newLimit); // Chỉ thêm limit nếu khác giá trị mặc định
    if (newSearch) params.set("search", newSearch);

    navigate(`?${params.toString()}`, { replace: true });
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      updateUrl(newPage, limit, search);
    }
  };

  const handleLimitChange = (newLimit) => {
    updateUrl(1, newLimit, search); // Reset về trang 1 khi thay đổi limit
  };

  const handleSearchChange = (newSearch) => {
    updateUrl(1, limit, newSearch); // Reset về trang 1 khi thay đổi search
  };

  return {
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
    fetchBrands, // Vẫn export để có thể gọi lại nếu cần refresh thủ công
  };
};

export default useFetchBrand;
