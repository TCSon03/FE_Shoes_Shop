import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutClientPage from "./../layout/client/LayoutClientPage";
import clientRoutes from "./clientRoutes";
import LoginPage from "../page/auth/login/LoginPage";
import RegisterPage from "./../page/auth/register/RegisterPage";
import NotfoundPage from "../page/notfound/NotfoundPage";
import LayoutAdminPage from "./../layout/admin/LayoutAdminPage";
import adminRoutes from "./adminRoutes";

const router = createBrowserRouter([
  // Layout client
  { path: "/", element: <LayoutClientPage />, children: clientRoutes },

  // Layout admin
  { path: "/admin", element: <LayoutAdminPage />, children: adminRoutes },

  // Layout empty
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },

  { path: "*", element: <NotfoundPage /> },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};
export default AppRouter;
