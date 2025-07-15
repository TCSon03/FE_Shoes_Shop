import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { createProductValidate } from "../../../validation/product/productSchema";
import { getDetailProduct, updateProduct } from "../../../services/productApi";
import { toast } from "react-toastify";
import { getAllBrand } from "../../../services/brandApi";
import { getAllCate } from "../../../services/categoryApi";

const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createProductValidate),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await getDetailProduct(id);
        reset(productRes.data.product);

        const [brandRes, categoryRes] = await Promise.all([
          getAllBrand(1, 1000),
          getAllCate(1, 1000),
        ]);

        setBrands(brandRes.data.data);
        setCategories(categoryRes.data.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Lỗi khi tải dữ liệu sản phẩm, thương hiệu hoặc danh mục:",
          error
        );
        toast.error("Không thể tải dữ liệu. Vui lòng thử lại!");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]); // Thêm reset vào dependency array

  const onSubmit = async (data) => {
    try {
      await updateProduct(id, data);
      toast.success("Cập nhật sản phẩm thành công! 🎉");
      navigate("/admin/product");
    } catch (error) {
      console.error("Lỗi khi cập nhật sản phẩm:", error);
      toast.error(
        error?.response?.data?.message ||
          "Cập nhật sản phẩm thất bại. Vui lòng thử lại!"
      );
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-700">Đang tải dữ liệu sản phẩm...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-2xl">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center drop-shadow-sm">
        Cập Nhật Sản Phẩm
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tên sản phẩm
          </label>
          <input
            id="name"
            {...register("name")}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-base"
            placeholder="Nhập tên sản phẩm (ví dụ: Áo phông Cotton cao cấp)"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Slug
          </label>
          <input
            id="slug"
            {...register("slug")}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-base"
            placeholder="Tên sản phẩm không dấu, cách nhau bằng dấu gạch ngang (ví dụ: ao-phong-cotton-cao-cap)"
          />
          {errors.slug && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.slug.message}
            </p>
          )}
        </div>

        {/* Thumbnail */}
        <div>
          <label
            htmlFor="thumbnail"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Ảnh đại diện (URL)
          </label>
          <input
            id="thumbnail"
            {...register("thumbnail")}
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-base"
            placeholder="Dán URL hình ảnh tại đây (ví dụ: https://example.com/product_image.jpg)"
          />
          {errors.thumbnail && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.thumbnail.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Mô tả
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows="5"
            className="block w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-base resize-y"
            placeholder="Nhập mô tả chi tiết về sản phẩm, các tính năng nổi bật và lợi ích..."
          />
        </div>

        {/* Brand select */}
        <div>
          <label
            htmlFor="brandId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Thương hiệu
          </label>
          <div className="relative">
            <select
              id="brandId"
              {...register("brandId")}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-900 py-2.5 px-4 pr-8 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-base"
            >
              <option value="">-- Chọn thương hiệu --</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 12.086 6.414 8.5 5 9.914l4.293 4.293z" />
              </svg>
            </div>
          </div>
          {errors.brandId && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.brandId.message}
            </p>
          )}
        </div>

        {/* Category select */}
        <div>
          <label
            htmlFor="categoryId"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Danh mục
          </label>
          <div className="relative">
            <select
              id="categoryId"
              {...register("categoryId")}
              className="block appearance-none w-full bg-white border border-gray-300 text-gray-900 py-2.5 px-4 pr-8 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out sm:text-base"
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15 9.707l-1.414-1.414L10 12.086 6.414 8.5 5 9.914l4.293 4.293z" />
              </svg>
            </div>
          </div>
          {errors.categoryId && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full flex justify-center py-3.5 px-6 border border-transparent rounded-lg shadow-xl text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-3 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Cập nhật Sản Phẩm
        </button>
      </form>
    </div>
  );
};

export default ProductEditPage;
