import React from "react";
import HeaderAdminPage from "../../components/header/HeaderAdminPage";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
const LayoutAdminPage = () => {
  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="w-full">
        <HeaderAdminPage />
        <main className="bg-gray-50 min-h-screen py-6 px-14">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutAdminPage;
