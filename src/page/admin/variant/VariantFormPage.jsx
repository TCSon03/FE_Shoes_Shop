import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllProduct } from "../../../services/productApi";
import { variantSchema } from "../../../validation/variant/variantSchame";
import { createVariant } from "../../../services/variantApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VariantFormPage = () => {
  const nav = useNavigate();
  const [products, setProducts] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(variantSchema),
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProduct(1, 1000);

        setProducts(res.data.data);
      } catch (err) {
        console.error("Lỗi khi load products", err);
      }
    };

    fetchProducts();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await createVariant(data);
      toast.success("Tạo biến thể thành công!");
      nav("/admin/variant");
    } catch (err) {
      toast.error(err.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Tạo Biến Thể Sản Phẩm
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="productId"
            className="block text-lg font-semibold text-gray-700 mb-1"
          >
            Sản phẩm
          </label>{" "}
          {/* Larger label, slightly darker, added margin-bottom */}
          <select
            id="productId"
            {...register("productId")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            required
          >
            <option value="">-- Chọn sản phẩm --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>
          {errors.productId && (
            <p className="text-red-600 text-sm mt-1">
              {errors.productId.message}
            </p>
          )}
        </div>

        {/* Màu sắc */}
        <div>
          <label
            htmlFor="color"
            className="block text-lg font-semibold text-gray-700 mb-1"
          >
            Màu sắc
          </label>
          <select
            id="color"
            {...register("color")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
          >
            <option value="">-- Chọn màu --</option>
            {["Red", "Blue", "Black", "White", "Green"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.color && (
            <p className="text-red-600 text-sm mt-1">{errors.color.message}</p>
          )}
        </div>

        {/* Size */}
        <div>
          <label
            htmlFor="size"
            className="block text-lg font-semibold text-gray-700 mb-1"
          >
            Kích cỡ
          </label>
          <select
            id="size"
            {...register("size")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
          >
            <option value="">-- Chọn size --</option>
            {[38, 39, 40, 41, 42, 43, 44].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.size && (
            <p className="text-red-600 text-sm mt-1">{errors.size.message}</p>
          )}
        </div>

        {/* Giá */}
        <div>
          <label
            htmlFor="price"
            className="block text-lg font-semibold text-gray-700 mb-1"
          >
            Giá
          </label>
          <input
            id="price"
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Nhập giá" // Added placeholder
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Tồn kho */}
        <div>
          <label
            htmlFor="stock"
            className="block text-lg font-semibold text-gray-700 mb-1"
          >
            Tồn kho
          </label>
          <input
            id="stock"
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Nhập số lượng tồn kho" // Added placeholder
          />
          {errors.stock && (
            <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Ảnh */}
        <div>
          <label
            htmlFor="image"
            className="block text-lg font-semibold text-gray-700 mb-1"
          >
            Ảnh (URL)
          </label>
          <input
            id="image"
            type="text"
            {...register("image")}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
            placeholder="Dán URL ảnh" // Added placeholder
          />
          {errors.image && (
            <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Tạo Biến Thể
        </button>
      </form>
    </div>
  );
};

export default VariantFormPage;
