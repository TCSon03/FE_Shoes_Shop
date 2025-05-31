import React from "react";
import HeaderClientPage from "./../../components/header/HeaderClientPage";
import { Outlet } from "react-router-dom";

const LayoutClientPage = () => {
  return (
    <>
      <HeaderClientPage />
      <Outlet />
    </>
  );
};

export default LayoutClientPage;
