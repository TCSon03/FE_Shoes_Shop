import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateVariantSchema } from "../../../validation/variant/variantSchame";
import { getVariantById, updateVariant } from "../../../services/variantApi";
import { getAllProduct } from "../../../services/productApi";

const VariantEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProductName, setSelectedProductName] = useState("");

  const COLORS = ["Red", "Blue", "Black", "White", "Green"];

  const normalizeColor = (str) => {
    const found = COLORS.find(
      (c) => c.toLowerCase() === str?.trim().toLowerCase()
    );
    return found || "";
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateVariantSchema),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [variantRes, productsRes] = await Promise.all([
          getVariantById(id),
          getAllProduct(1, 1000),
        ]);

        const variant = variantRes.data;
        const productsList = productsRes.data.data;

        setProducts(productsList);

        const foundProduct = productsList.find(
          (p) => p._id === variant.productId
        );
        setSelectedProductName(foundProduct?.name || "Không rõ");

        reset({
          color: normalizeColor(variant.color),
          size: String(variant.size),
          price: variant.price,
          stock: variant.stock ?? 0,
          image: variant.image || "",
        });

        setLoading(false);
      } catch (err) {
        toast.error("Lỗi khi tải dữ liệu");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]);

  const onSubmit = async (data) => {
    const fixedData = {
      ...data,
      color: normalizeColor(data.color),
    };

    try {
      await updateVariant(id, fixedData);
      toast.success("Cập nhật biến thể thành công!");
      navigate("/admin/variant");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Cập nhật thất bại");
    }
  };

  if (loading)
    return <div className="text-center mt-10">Đang tải dữ liệu...</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Cập Nhật Biến Thể
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Tên sản phẩm (readonly) */}
        {/* <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Sản phẩm
          </label>
          <input
            type="text"
            value={selectedProductName}
            readOnly
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
          />
        </div> */}

        {/* Màu sắc */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Màu sắc
          </label>
          <select
            {...register("color")}
            className="w-full border rounded-lg px-4 py-2"
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

        {/* Kích cỡ */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Kích cỡ
          </label>
          <select
            {...register("size")}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">-- Chọn size --</option>
            {[38, 39, 40, 41, 42, 43, 44].map((s) => (
              <option key={s} value={String(s)}>
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
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Giá
          </label>
          <input
            type="number"
            {...register("price", { valueAsNumber: true })}
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Tồn kho */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Tồn kho
          </label>
          <input
            type="number"
            {...register("stock", { valueAsNumber: true })}
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.stock && (
            <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Ảnh */}
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-1">
            Ảnh (URL)
          </label>
          <input
            type="text"
            {...register("image")}
            className="w-full border rounded-lg px-4 py-2"
          />
          {errors.image && (
            <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default VariantEditPage;
