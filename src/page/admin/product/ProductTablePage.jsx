import React from "react";
import { Link } from "react-router-dom";
import useFetchProduct from "../../../hooks/useFetchProduct";
import { deleteProduct } from "../../../services/productApi";
import { toast } from "react-toastify";

const ProductTablePage = () => {
  const { products, fetchProduct } = useFetchProduct();
  const handleDelete = async (productId) => {
    if (confirm("Ban co chac muon xoa?")) {
      try {
        await deleteProduct(productId);
        toast.success("Delete Successfully");
        fetchProduct();
      } catch (error) {
        console.log(error);
        toast.error("Delete Failed");
      }
    }
  };
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xl font-semibold text-[1D2939]">Product List</h4>
        <Link
          to="/admin/product/add"
          className="flex items-center gap-4 bg-purple-600 py-3 px-4 text-white font-medium rounded-xl hover:drop-shadow-xl hover:bg-purple-700 transition-all duration-300"
        >
          <i className="ri-add-line font-semibold"></i>
          <p>Product Add</p>
        </Link>
      </div>
      <div className="border rounded-xl bg-white w-full">
        <div className="py-5 px-6 border-b">
          <p className="text-base text-[1D2939] font-medium">
            Product Data Table
          </p>
        </div>
        <div className="m-6 border rounded-xl">
          <div className="py-4 px-6 border-b">
            <input
              type="text"
              placeholder="Search Product..."
              className="border"
            />
          </div>
          {products.length > 0 && (
            <table className="table-fixed w-full">
              <thead>
                <tr className="bg-slate-50 border-b">
                  <th className="text-left px-6 py-3 text-xs text-gray-500">
                    Pro ID
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500">
                    Title
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500">
                    Image
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500">
                    Price
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500">
                    Short_Des
                  </th>
                  <th className="text-left px-6 py-3 text-xs text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="text-left px-6 py-5 text-sm font-medium text-black">
                      {String(item.id).padStart(2, "0")}
                    </td>
                    <td className="text-left px-6 py-5 text-sm font-medium text-gray-700">
                      {item.title}
                    </td>
                    <td className="text-left px-6 py-5 text-sm font-medium text-gray-700">
                      <img src={item.image_url} alt="" className="rounded-full w-12 h-12"/>
                    </td>
                    <td className="text-left px-6 py-5 text-sm font-medium text-gray-500">
                      ${item.price}
                    </td>
                    <td className="text-left px-6 py-5 text-sm font-medium text-gray-500 truncate">
                      {item.short_description}
                    </td>
                    <td className="text-left px-6 py-5 text-sm font-medium text-gray-500 flex gap-4">
                      {" "}
                      <button
                        className="focus:outline-none"
                        onClick={() => handleDelete(item.id)}
                      >
                        <i className="ri-delete-bin-6-line text-2xl text-red-300 hover:text-red-500 transion scale-105 duration-300"></i>
                      </button>
                      <Link to={`/admin/product/edit/${item.id}`}>
                        <i className="ri-edit-box-line text-2xl text-orange-300 hover:text-orange-500 transion scale-105 duration-300"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductTablePage;
