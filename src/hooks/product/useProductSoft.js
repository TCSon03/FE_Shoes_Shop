import { useState, useEffect } from "react";
import { getSoftDeletedPro } from "../../services/productApi";

const useFetchSoftPro = () => {
  const [productSoft, setProductSoft] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductSoft = async () => {
      try {
        const response = await getSoftDeletedPro();
        setProductSoft(response.data.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductSoft();
  }, []);

  return { productSoft, loading, error };
};

export default useFetchSoftPro;
