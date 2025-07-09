import React from "react";
import { Link } from 'react-router-dom';

const BrandTablePage = () => {
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-semibold text-[1D2939]">Brand List</h4>
        <Link
          to="/admin/product/add"
          className="flex items-center gap-4 bg-purple-600 py-3 px-4 text-white font-medium rounded-xl hover:drop-shadow-xl hover:bg-purple-700 transition-all duration-300"
        >
          <i className="ri-add-line font-semibold"></i>
          <p>Brand Add</p>
        </Link>
      </div>
    </>
  );
};

export default BrandTablePage;
