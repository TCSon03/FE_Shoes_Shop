import React from "react";
import HeaderAdminPage from "../../components/header/HeaderAdminPage";
import { Outlet } from "react-router-dom";
const LayoutAdminPage = () => {
  return (
    <div>
      <HeaderAdminPage />
      <Outlet />
    </div>
  );
};

export default LayoutAdminPage;
