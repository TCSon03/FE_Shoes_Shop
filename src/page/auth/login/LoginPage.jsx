import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginApi } from "../../../services/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from "../../../validation/auth/loginSchema";
import { toast } from "react-toastify";

const LoginPage = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });
  const onSubmit = async (dataLogin) => {
    try {
      const { data } = await loginApi(dataLogin);
      console.log(data);
      
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        nav("/");
      }
      console.log(data);
      toast.success("Login successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
    }
  };
  return (
    <div className="container mx-auto min-h-screen flex flex-col justify-center items-center">
      <div className="text-center text-2xl mb-6">
        <h2 className="font-semibold mb-2">
          Create <span className="text-[#FF954D]">Account</span>
        </h2>
        <div className="flex justify-center items-center mb-2 gap-3">
          <button
            className="py-1 px-2 border-2 border-gray-400 rounded-full flex items-center  hover:bg-gray-100 hover:border-indigo-500 hover:text-indigo-500 
               transition duration-200 ease-in-out"
          >
            <i className="ri-google-fill text-sm"></i>
          </button>
          <button
            className="py-1 px-2 border-2 border-gray-400 rounded-full flex items-center  hover:bg-gray-100 hover:border-indigo-500 hover:text-indigo-500 
               transition duration-200 ease-in-ou"
          >
            <i className="ri-facebook-fill text-sm"></i>
          </button>
          <button
            className="py-1 px-2 border-2 border-gray-400 rounded-full flex items-center  hover:bg-gray-100 hover:border-indigo-500 hover:text-indigo-500 
               transition duration-200 ease-in-ou"
          >
            <i className="ri-twitter-fill text-sm"></i>
          </button>
          <button
            className="py-1 px-2 border-2 border-gray-400 rounded-full flex items-center  hover:bg-gray-100 hover:border-indigo-500 hover:text-indigo-500 
               transition duration-200 ease-in-ou"
          >
            <i className="ri-instagram-fill text-sm"></i>
          </button>
        </div>
        <p className="text-sm text-[#686E7D]">
          Best place to buy and sell digital products
        </p>
      </div>
      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6 border rounded-2xl p-8 w-[500px] mx-auto"
      >
        <div>
          <label htmlFor="" className="block mb-1 font-medium text-gray-600">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter Your Email"
            className="border w-full rounded-md py-2 px-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
            {...register("email", { required: true })}
          />
          {errors?.email && (
            <span className="text-orange-400 text-xs">
              {errors?.email.message}
            </span>
          )}
        </div>
        <div>
          <label htmlFor="" className="block mb-1 font-medium text-gray-600">
            Password <span className="text-red-600">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter Your Password"
            className="border w-full rounded-md py-2 px-3 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-300 transition"
            {...register("password", { required: true })}
          />
          {errors?.password && (
            <span className="text-orange-400 text-xs">
              {errors?.password.message}
            </span>
          )}
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-400 w-full rounded-lg py-3 font-semibold text-white hover:bg-blue-500 hover:shadow-lg hover:scale-105 
         transition duration-200 ease-in-out"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <hr />
        <p className="text-sm">
          Have an account?{" "}
          <Link
            to="/register"
            className="text-[#8470FF] font-semibold hover:text-purple-500 transition ease-in-out"
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
