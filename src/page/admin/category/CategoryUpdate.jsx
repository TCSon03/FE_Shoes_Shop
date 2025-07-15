import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import cateValidation from "../../../validation/category/cateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCateById, updateCate } from "../../../services/categoryApi";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cateValidation),
    defaultValues: {
      name: "",
      logo: "",
      description: "",
      slug: "",
    },
  });

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const res = await getCateById(id);
        reset(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu cate:", error);
        setLoading(false);
      }
    };

    fetchCate();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await updateCate(id, data);
      toast.success("Success: Cập nhật Cate thành công!");
      navigate("/admin/category");
    } catch (error) {
      console.error("Lỗi khi cập nhật cate:", error);
      toast.error("Failed: Cập nhật thất bại!");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Cập nhật Category</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Tên Cate</label>
          <input
            type="text"
            {...register("name")}
            className="border p-2 w-full rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Logo (URL)</label>
          <input
            type="text"
            {...register("logo")}
            className="border p-2 w-full rounded"
          />
          {errors.logo && <p className="text-red-500">{errors.logo.message}</p>}
        </div>

        <div>
          <label className="block font-medium">Mô tả</label>
          <textarea
            {...register("description")}
            className="border p-2 w-full rounded"
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">Slug</label>
          <input
            type="text"
            {...register("slug")}
            className="border p-2 w-full rounded"
          />
          {errors.slug && <p className="text-red-500">{errors.slug.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
