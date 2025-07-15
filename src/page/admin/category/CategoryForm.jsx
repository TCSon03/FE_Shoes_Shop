import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createCate } from "../../../services/categoryApi";
import cateValidation from "../../../validation/category/cateSchema";
import { toast } from "react-toastify";

const CategoryForm = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cateValidation),
  });

  const onSubmit = async (formData) => {

    try {
      const cate = await createCate(formData);
      toast.success("Tạo category thành công 🎉");
      reset();
      nav("/admin/category");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Tạo category thất bại. Thử lại!"
      );
    }
  };
  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Tạo Category Mới
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Tên Category *</label>
          <input
            type="text"
            {...register("name")}
            className="w-full border px-3 py-2 rounded"
            placeholder="VD: Nike"
          />
          {errors?.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Logo */}
        <div>
          <label className="block font-medium">Logo (URL)</label>
          <input
            type="text"
            {...register("logo")}
            className="w-full border px-3 py-2 rounded"
            placeholder="https://example.com/logo.png"
          />
          {errors?.logo && (
            <p className="text-red-500 text-sm mt-1">{errors.logo.message}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium">Slug *</label>
          <input
            type="text"
            {...register("slug")}
            className="w-full border px-3 py-2 rounded"
            placeholder="nike"
          />
          {errors?.slug && (
            <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium">Mô tả</label>
          <textarea
            {...register("description")}
            className="w-full border px-3 py-2 rounded"
            rows="3"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Tạo Category
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
