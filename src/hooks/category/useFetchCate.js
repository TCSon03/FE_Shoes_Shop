import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCate } from "../../services/categoryApi";

export const useCategories = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lấy các tham số từ URL khi khởi tạo state
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page")) || 1;
  const initialLimit = parseInt(queryParams.get("limit")) || 5;
  const initialSearch = queryParams.get("search") || "";

  const [cates, setCates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [search, setSearch] = useState(initialSearch);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const fetchCates = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllCate(page, limit, search);

      setCates(response.data.data);

      setTotalItems(response.data.pagination.totalItems);
      setTotalPages(response.data.pagination.totalPages);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách Cate:", err);
      setError("Không thể tải dữ liệu Cate.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newPage = parseInt(queryParams.get("page")) || 1;
    const newLimit = parseInt(queryParams.get("limit")) || 5;
    const newSearch = queryParams.get("search") || "";

    if (newPage !== page) setPage(newPage);
    if (newLimit !== limit) setLimit(newLimit);
    if (newSearch !== search) setSearch(newSearch);

    fetchCates();
  }, [location.search, page, limit, search]);

  const updateUrl = (newPage, newLimit, newSearch) => {
    const params = new URLSearchParams();
    if (newPage !== 1) params.set("page", newPage);
    if (newLimit !== 5) params.set("limit", newLimit);
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
    fetchCates,
  };
};

export default useCategories;
