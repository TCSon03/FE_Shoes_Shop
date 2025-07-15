import { useEffect, useState } from "react";
import { getAllProduct } from "../../services/productApi";

const useProducts = (initialPage = 1, initialLimit = 5, initialSearch = "") => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState(initialSearch);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async (
    page = pagination.page,
    limit = pagination.limit,
    searchQuery = search
  ) => {
    setLoading(true);
    try {
      const res = await getAllProduct(page, limit, searchQuery);
      setProducts(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Lỗi khi lấy sản phẩm:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    pagination,
    loading,
    search,
    setSearch,
    fetchProducts,
    setPagination,
  };
};

export default useProducts;
