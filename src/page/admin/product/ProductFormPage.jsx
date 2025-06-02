import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import productSchema from "../../../validation/product/productSchema";
import { toast } from "react-toastify";
import { createProduct } from "../../../services/productApi";
import { useNavigate } from "react-router-dom";

const ProductFormPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });
  const onSubmit = async (data) => {
    try {
      const res = await createProduct(data);
      console.log(res);
      reset();
      toast.success("Add Product Successfully");
      nav("/admin/product");
    } catch (error) {
      console.log(error);
      toast.error("Add Product Failed");
    }
  };
  return (
    <>
      <div>
        <h4 className="text-xl font-semibold text-[1D2939] mb-8">
          Form Product Add
        </h4>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-xl bg-white"
      >
        <div className="py-5 px-6 border-b">
          <p className="text-base text-[1D2939] font-medium">Form</p>
        </div>
        <div className="px-6 py-5 flex flex-col gap-6">
          <div>
            <label
              htmlFor=""
              className="block mb-1 font-medium text-sm text-gray-600"
            >
              Title:
            </label>
            <input
              type="text"
              placeholder="Enter Your Title"
              className="border w-full rounded-md py-2 px-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
              {...register("title", { required: true })}
            />
            {errors?.title && (
              <span className="text-orange-400 text-xs">
                {errors?.title.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor=""
              className="block mb-1 font-medium text-sm text-gray-600"
            >
              Price:
            </label>
            <input
              type="number"
              placeholder="Enter Your Price"
              className="border w-full rounded-md py-2 px-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
              {...register("price", { required: true, valueAsNumber: true })}
            />
            {errors?.price && (
              <span className="text-orange-400 text-xs">
                {errors?.price.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor=""
              className="block mb-1 font-medium text-sm text-gray-600"
            >
              Short Description:
            </label>
            <input
              type="text"
              placeholder="Enter Your Short Description"
              className="border w-full rounded-md py-2 px-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
              {...register("short_description", { required: true })}
            />
            {errors?.short_description && (
              <span className="text-orange-400 text-xs">
                {errors?.short_description.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor=""
              className="block mb-1 font-medium text-sm text-gray-600"
            >
              Long Description:
            </label>
            <input
              type="text"
              placeholder="Enter Your Long Description"
              className="border w-full rounded-md py-2 px-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
              {...register("long_description", { required: true })}
            />
            {errors?.long_description && (
              <span className="text-orange-400 text-xs">
                {errors?.long_description.message}
              </span>
            )}
          </div>
          {/* <div>
            <label
              htmlFor=""
              className="block mb-1 font-medium text-sm text-gray-600"
            >
              Image:
            </label>
            <input
              type="file"
              placeholder="Enter Your Long Description"
              className="border w-full rounded-md py-2 px-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
              {...register("image", { required: true })}
            />
          </div> */}
          <div className="flex justify-center items-center">
            <button
              className="bg-blue-400 w-full rounded-lg py-3 font-semibold text-white hover:bg-blue-500 hover:shadow-lg hover:scale-95 
         transition duration-200 ease-in-out"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProductFormPage;
