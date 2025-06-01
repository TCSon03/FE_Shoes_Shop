import React from "react";
import { Link } from "react-router-dom";

const ProductTablePage = () => {
  return (
    <div className="">
      <p>ProductTablePage</p>
      <Link to="/admin/product/add">Product add</Link>
    </div>
  );
};

export default ProductTablePage;
