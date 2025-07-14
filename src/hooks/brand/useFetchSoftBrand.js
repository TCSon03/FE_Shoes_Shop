import { useEffect, useState } from "react";
import { getSoftDeletedBrands } from "../../services/brandApi";

const useFetchSoftBrand = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchSoftBrands = async () => {
      try {
        setLoading(true);
        const res = await getSoftDeletedBrands(page, limit, search);
        setBrands(res.data.data);

        setTotalPages(res.data.pagination.totalPages);
        setTotalItems(res.data.pagination.totalItems);
        setError(null);
      } catch (err) {
        setError(err.message || "Lỗi không xác định");
      } finally {
        setLoading(false);
      }
    };

    fetchSoftBrands();
  }, [page, limit, search]);

  return {
    brands,
    loading,
    error,
    page,
    limit,
    search,
    totalPages,
    totalItems,
    handlePageChange: setPage,
    handleLimitChange: setLimit,
    handleSearchChange: setSearch,
  };
};

export default useFetchSoftBrand;
