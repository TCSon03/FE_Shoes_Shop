import { useEffect, useState } from "react";
import api from "../services";
import { getAllProduct } from "../services/productApi";

const useFetchProduct = () => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await getAllProduct();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return { products,  fetchProduct };
};

export default useFetchProduct;
