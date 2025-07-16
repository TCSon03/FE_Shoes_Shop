import { useEffect, useState } from "react";
import { getAllVariant } from "../../services/variantApi";

const useVariants = (
  initialPage = 1,
  initialLimit = 5,
  initialSearch = "",
  initialSortPrice = ""
) => {
  const [variants, setVariants] = useState([]);
  const [pagination, setPagination] = useState({
    page: initialPage,
    limit: initialLimit,
    total: 0,
    totalPages: 0,
  });
  const [search, setSearch] = useState(initialSearch);
  const [sortPrice, setSortPrice] = useState(initialSortPrice);
  const [loading, setLoading] = useState(false);

  const fetchVariants = async (
    page = pagination.page,
    limit = pagination.limit,
    searchQuery = search,
    sort = sortPrice
  ) => {
    setLoading(true);
    try {
      const res = await getAllVariant({
        page,
        limit,
        search: searchQuery,
        sortPrice: sort,
      });
      setVariants(res.data.data);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error("Lỗi khi lấy biến thể:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants();
  }, []);

  return {
    variants,
    pagination,
    loading,
    search,
    setSearch,
    sortPrice,
    setSortPrice,
    fetchVariants,
    setPagination,
  };
};

export default useVariants;
