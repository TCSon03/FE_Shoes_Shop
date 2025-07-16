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
import BrandUpdatePage from "./../page/admin/brand/BrandUpdatePage";
import BrandTableSoftPage from "../page/admin/brand/BrandTableSoftPage";
import CategoryUpdate from "../page/admin/category/CategoryUpdate";
import CategoryTableSoft from "../page/admin/category/CategoryTableSoft";
import ProductEditPage from "../page/admin/product/ProductEditPage";
import ProductTableSoft from "../page/admin/product/ProductTableSoft";
import VariantFormPage from "../page/admin/variant/VariantFormPage";
import VariantTablePage from "../page/admin/variant/VariantTablePage";
import VariantEditPage from "../page/admin/variant/VariantEditPage";

const adminRoutes = [
  // Common routes
  { index: true, element: <DashboardPage /> },
  { path: "/admin/variant", element: <VariantTablePage /> },
  { path: "/admin/variant/add", element: <VariantFormPage /> },
  { path: "/admin/variant/edit/:id", element: <VariantEditPage /> },

  // Product and category routes
  { path: "/admin/product", element: <ProductTablePage /> },
  { path: "/admin/product", element: <ProductTablePage /> },
  { path: "/admin/product/edit/:id", element: <ProductEditPage /> },
  { path: "/admin/product/soft", element: <ProductTableSoft /> },
  { path: "/admin/category", element: <CategoryTable /> },
  { path: "/admin/category/add", element: <CategoryForm /> },
  { path: "/admin/category/edit/:id", element: <CategoryUpdate /> },
  { path: "/admin/category/soft", element: <CategoryTableSoft /> },

  // Brand
  { path: "/admin/brand", element: <BrandTablePage /> },
  { path: "/admin/brand/add", element: <BrandFormPage /> },
  { path: "/admin/brand/edit/:id", element: <BrandUpdatePage /> },
  { path: "/admin/brand/soft", element: <BrandTableSoftPage /> },

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
