import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import brandValidation from "../../../validation/brand/brandSchema";
import { useEffect, useState } from "react";
import { getBrandById, updateBrand } from "../../../services/brandApi";
import { toast } from "react-toastify";

const BrandUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(brandValidation),
    defaultValues: {
      name: "",
      logo: "",
      description: "",
      slug: "",
    },
  });

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await getBrandById(id);
        console.log(res);
        reset(res.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu brand:", error);
        setLoading(false);
      }
    };

    fetchBrand();
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await updateBrand(id, data);
      toast.success("Success: Cập nhật brand thành công!");
      navigate("/admin/brand"); // tùy bạn định tuyến
    } catch (error) {
      console.error("Lỗi khi cập nhật brand:", error);
      toast.error("Failed: Cập nhật thất bại!");
    }
  };

  if (loading) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Cập nhật Brand</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block font-medium">Tên Brand</label>
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

export default BrandUpdatePage;
