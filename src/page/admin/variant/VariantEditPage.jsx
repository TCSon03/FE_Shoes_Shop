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
  const [loading, setLoading] = useState(true);
  const [selectedProductName, setSelectedProductName] = useState("");

  // Define allowed colors and sizes from your Mongoose schema for frontend validation and display
  const COLORS = ["Red", "Blue", "Black", "White", "Green"];
  const SIZES = [38, 39, 40, 41, 42, 43, 44];

  // Helper to normalize color string to match backend enum case
  const normalizeColor = (str) => {
    const found = COLORS.find(
      (c) => c.toLowerCase() === str?.trim().toLowerCase()
    );
    return found || ""; // Returns exact case or empty string if not found
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateVariantSchema), // Using Zod for validation
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [variantRes, productsRes] = await Promise.all([
          getVariantById(id),
          getAllProduct(1, 1000),
        ]);

        const variant = variantRes.data.mainVariant; // Ensure variant.data exists
        const productsList = productsRes.data.data; // Ensure productsRes.data.data exists

        // 2. Inspect extracted data:
        console.log("Extracted Variant Data:", variant);
        console.log("Extracted Products List:", productsList);

        // Check if variant and productsList are valid before proceeding
        if (!variant || !productsList || !Array.isArray(productsList)) {
          toast.error("Dữ liệu biến thể hoặc sản phẩm không hợp lệ.");
          setLoading(false);
          return;
        }

        // Find the product associated with this variant
        const foundProduct = productsList.find(
          (p) => p._id === variant.productId
        );
        // 3. Inspect foundProduct and setSelectedProductName:
        console.log("Found Product:", foundProduct);
        setSelectedProductName(foundProduct?.name || "Không rõ sản phẩm");

        // Set form default values using `reset`
        reset({
          color: normalizeColor(variant.color),
          size: String(variant.size),
          price: variant.price,
          stock: variant.stock ?? 0,
          image: variant.image || "",
        });
        // 4. Inspect data passed to reset:
        console.log("Data passed to reset:", {
          color: normalizeColor(variant.color),
          size: String(variant.size),
          price: variant.price,
          stock: variant.stock ?? 0,
          image: variant.image || "",
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching variant or product data:", err);
        toast.error("Lỗi khi tải dữ liệu biến thể.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, reset]); // Dependencies: re-run if ID changes or reset function changes

  const onSubmit = async (data) => {
    // Ensure color is normalized to match backend enum before sending
    const fixedData = {
      ...data,
      color: normalizeColor(data.color),
      // size and price are likely handled by zodResolver's type coercion if schema is correctly defined
    };

    try {
      await updateVariant(id, fixedData);
      toast.success("Cập nhật biến thể thành công!");
      navigate("/admin/variant"); // Navigate back to the variant list page
    } catch (err) {
      console.error("Error updating variant:", err);
      // Display specific error message from backend if available, otherwise a generic one
      toast.error(err.response?.data?.message || "Cập nhật biến thể thất bại!");
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-600">Đang tải dữ liệu...</div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Cập Nhật Biến Thể
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Product Name (Read-only) */}

        {/* Color Select */}
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Chọn màu --</option>
            {COLORS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.color && (
            <p className="text-red-600 text-sm mt-1">{errors.color.message}</p>
          )}
        </div>

        {/* Size Select */}
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">-- Chọn size --</option>
            {SIZES.map((s) => (
              <option key={s} value={String(s)}>
                {" "}
                {/* Value must be string */}
                {s}
              </option>
            ))}
          </select>
          {errors.size && (
            <p className="text-red-600 text-sm mt-1">{errors.size.message}</p>
          )}
        </div>

        {/* Price Input */}
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
            {...register("price", { valueAsNumber: true })} // Ensure price is treated as a number
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.price && (
            <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Stock Input */}
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
            {...register("stock", { valueAsNumber: true })} // Ensure stock is treated as a number
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.stock && (
            <p className="text-red-600 text-sm mt-1">{errors.stock.message}</p>
          )}
        </div>

        {/* Image URL Input */}
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com/image.jpg"
          />
          {errors.image && (
            <p className="text-red-600 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          Cập nhật
        </button>
      </form>
    </div>
  );
};

export default VariantEditPage;
