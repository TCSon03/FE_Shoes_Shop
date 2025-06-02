import HomePage from "./../page/client/home/HomePage";
import ProductPage from "./../page/client/product/ProductPage";
import AboutPage from "./../page/client/about/AboutPage";
import ContactPage from "./../page/client/contact/ContactPage";
import BlogPage from "./../page/client/blog/BlogPage";
import BlogDetailPage from "../page/client/blog/BlogDetailPage";
import ProductDetailPage from "../page/client/product/ProductDetailPage";
import CategoryPage from "./../page/client/cateogory/CategoryPage";
import ProfilePage from "./../page/client/profile/ProfilePage";
import OrderPage from "../page/client/profile/OrderPage";
import OrderDetailPage from "../page/client/profile/OrderDetailPage";
import CartPage from './../page/client/cart/CartPage';
const clientRoutes = [
  // Common routes
  { index: true, element: <HomePage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/contact", element: <ContactPage /> },

  //   Blog routes
  { path: "/blog", element: <BlogPage /> },
  { path: "/blog/:slug", element: <BlogDetailPage /> },

  //   product and category
  { path: "/product", element: <ProductPage /> },
  { path: "/product/:id", element: <ProductDetailPage /> },
  { path: "/category", element: <CategoryPage /> },

  // Cart routes
  { path: "/cart", element: <CartPage /> },

  //   user routes
  { path: "/profile/me/:id", element: <ProfilePage /> },
  { path: "/profile/order", element: <OrderPage /> },
  { path: "/profile/order/:id", element: <OrderDetailPage /> },
];

export default clientRoutes;
