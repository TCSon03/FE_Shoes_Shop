import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import productSchema from "../../../validation/product/productSchema";
import { toast } from "react-toastify";
import {
  createProduct,
  getDetailProduct,
  updateProduct,
} from "../../../services/productApi";
import { useNavigate, useParams } from "react-router-dom";

const ProductFormPage = () => {
  const nav = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  useEffect(() => {
    if (isEditMode) {
      const fetchProductData = async () => {
        try {
          const reponse = await getDetailProduct(id);
          reset(reponse.data);
          console.log(reponse.data);
        } catch (error) {
          console.log(error);
          toast.error("Product Detail Failed!");
        }
      };
      fetchProductData();
    }
  }, [id, isEditMode, reset]);

  const onSubmit = async (data) => {
    try {
      let res;
      if (isEditMode) {
        res = await updateProduct(id, data);
        toast.success("Update Product successfully");
      } else {
        res = await createProduct(data);
        toast.success("Add Product successfully");
      }
      console.log(res);
      reset();
      nav("/admin/product");
    } catch (error) {
      console.log(error);
      toast.error(isEditMode ? "Update Product Failed" : "Add Product Failed");
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
