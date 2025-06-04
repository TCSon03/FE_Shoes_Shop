import React from "react";
import HeaderClientPage from "./../../components/header/HeaderClientPage";
import { Outlet } from "react-router-dom";
import FooterClientPage from "../../components/footer/FooterClientPage";

const LayoutClientPage = () => {
  return (
    <>
      <HeaderClientPage />
      <Outlet />
      <FooterClientPage />
    </>
  );
};

export default LayoutClientPage;
