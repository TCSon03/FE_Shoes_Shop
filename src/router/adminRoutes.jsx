import DashboardPage from "../page/admin/dashboard/DashboardPage";
import ProductTablePage from "../page/admin/product/ProductTablePage";
import SettingPage from "./../page/admin/setting/SettingPage";
import ProductFormPage from "./../page/admin/product/ProductFormPage";
import CategoryTable from "./../page/admin/category/CategoryTable";
import CategoryForm from "./../page/admin/category/CategoryForm";
import BlogTable from "../page/admin/blog/BlogTable";
import BlogForm from "./../page/admin/blog/BlogForm";
import OrderTable from "./../page/admin/order/OrderTable";
import OrderForm from "../page/admin/order/OrderForm";
import UserListPage from "../page/admin/user/UserListPage";
import BrandTablePage from "../page/admin/brand/BrandTablePage";
import BrandFormPage from "../page/admin/brand/BrandFormPage";

const adminRoutes = [
  // Common routes
  { index: true, element: <DashboardPage /> },
  { path: "/admin/setting", element: <SettingPage /> },

  // Product and category routes
  { path: "/admin/product", element: <ProductTablePage /> },
  { path: "/admin/product/add", element: <ProductFormPage /> },
  { path: "/admin/product/edit/:id", element: <ProductFormPage /> },
  { path: "/admin/category", element: <CategoryTable /> },
  { path: "/admin/category/add", element: <CategoryForm /> },
  { path: "/admin/category/edit/:id", element: <CategoryForm /> },

  // Brand
  { path: "/admin/brand", element: <BrandTablePage /> },
  { path: "/admin/brand/add", element: <BrandFormPage /> },

  // Blog routes
  { path: "/admin/blog", element: <BlogTable /> },
  { path: "/admin/blog/add", element: <BlogForm /> },
  { path: "/admin/blog/edit/:id", element: <BlogForm /> },

  // Order routes
  { path: "/admin/order", element: <OrderTable /> },
  { path: "/admin/order/:id", element: <OrderForm /> },

  // User
  { path: "/admin/user", element: <UserListPage /> },
];

export default adminRoutes;
