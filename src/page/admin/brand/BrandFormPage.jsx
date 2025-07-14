import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import brandValidation from "../../../validation/brand/brandSchema";
import { createBrand } from "../../../services/brandApi";
import { useNavigate } from "react-router-dom";

const BrandFormPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(brandValidation),
  });

  const onSubmit = async (formData) => {
    console.log(formData);

    try {
      const brand = await createBrand(formData);
      console.log(brand);

      toast.success("Tạo brand thành công 🎉");
      reset();
      nav("/brand");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Tạo brand thất bại. Thử lại!"
      );
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-indigo-600">
        Tạo Brand Mới
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Tên Brand *</label>
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

        {/* isActive */}
        {/* <div>
          <label className="block font-medium">Trạng thái</label>
          <select
            {...register("isActive")}
            className="w-full border px-3 py-2 rounded"
          >
            <option value={true}>Hiển thị</option>
            <option value={false}>Ẩn</option>
          </select>
        </div> */}

        {/* Position */}
        {/* <div>
          <label className="block font-medium">Vị trí hiển thị</label>
          <input
            type="number"
            {...register("position")}
            className="w-full border px-3 py-2 rounded"
            defaultValue={0}
          />
        </div> */}

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Tạo Brand
        </button>
      </form>
    </div>
  );
};

export default BrandFormPage;
