import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const accessToken = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const location = useLocation();

  useEffect(() => {
    if (!accessToken) {
      toast.error("Vui lòng đăng nhập để tiếp tục");
    } else if (!["admin", "superAdmin"].includes(user.role)) {
      toast.error("Bạn không có quyền truy cập trang quản trị");
    }
  }, [location.pathname]);

  // redirect nếu không đăng nhập
  if (!accessToken) return <Navigate to="/login" replace />;

  // redirect nếu không đúng quyền
  if (!["admin", "superAdmin"].includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
