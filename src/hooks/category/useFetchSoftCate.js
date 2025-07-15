import { useState, useEffect } from "react";
import { getSoftDeletedCates } from "../../services/categoryApi";

const useFetchSoftCate = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await getSoftDeletedCates();
        console.log(response.data.categories);

        setCategories(response.data.categories);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

export default useFetchSoftCate;
