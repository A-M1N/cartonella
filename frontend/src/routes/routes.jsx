import { createBrowserRouter, Navigate } from "react-router-dom";

import AppLayout from "../ui/Layouts/AppLayout.jsx";
import AdminLayout from "../ui/Sections/Admin/AdminLayout.jsx";
import AdminDashboard from "../ui/Sections/Admin/AdminDashboard.jsx";
import AboutUs from "../pages/AboutUs.jsx";
import Support from "../ui/Sections/Support/Support.jsx";
import CartPage from "../pages/CartPage.jsx";
import CheckoutPage from "../pages/CheckoutPage.jsx";
import ErrorPage from "../pages/ErrorPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import SignupPage from "../pages/SignupPage.jsx";
import OrderConfirmationPage from "../pages/OrderConfirmationPage.jsx";
import ProductsPage from "../pages/ProductsPage.jsx";
import ProductDetail from "../pages/ProductDetail.jsx";
import SettingsPage from "../pages/SettingsPage.jsx";
import WishlistPage from "../pages/WishlistPage.jsx";
import AccountDetails from "../ui/Sections/Settings/AccountDetails.jsx";
import MyOrders from "../ui/Sections/Settings/MyOrders.jsx";
import MyAddress from "../ui/Sections/Settings/MyAddress.jsx";
import ChangePassword from "../ui/Sections/Settings/ChangePassword.jsx";
import OrderDetail from "../ui/Sections/Settings/OrderDetail.jsx";
import AdminProtectedRoute from "../ui/Sections/Admin/AdminProtectedRoute.jsx";
import AdminProducts from "../ui/Sections/Admin/AdminProducts.jsx";
import AdminOrders from "../ui/Sections/Admin/AdminOrders.jsx";
import AdminUsers from "../ui/Sections/Admin/AdminUsers.jsx";
import AdminStats from "../ui/Sections/Admin/AdminStats.jsx";
import AdminDeals from "../ui/Sections/Admin/AdminDeals.jsx";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    handle: { crumb: () => "Home" },
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
        handle: { crumb: () => "Login" },
      },
      {
        path: "signup",
        element: <SignupPage />,
        handle: { crumb: () => "Sign Up" },
      },
      {
        path: "products",
        element: <ProductsPage />,
        handle: { crumb: () => "Products" },
      },
      {
        path: "product/:productId",
        element: <ProductDetail />,
        handle: {
          crumb: (data) => data?.name || "Product",
        },
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
        handle: { crumb: () => "Checkout" },
      },
      {
        path: "order/:orderId",
        element: <OrderConfirmationPage />,
        handle: {
          crumb: (data) => data?.orderNumber || "Order",
        },
      },
      {
        path: "cart",
        element: <CartPage />,
        handle: { crumb: () => "Cart" },
      },
      {
        path: "about",
        element: <AboutUs />,
        handle: { crumb: () => "About Us" },
      },
      {
        path: "support",
        element: <Support />,
        handle: { crumb: () => "Support" },
      },
      {
        path: "settings",
        element: <SettingsPage />,
        handle: { crumb: () => "Settings" },
        children: [
          {
            index: true,
            element: <Navigate to="account" replace />,
          },
          {
            path: "account",
            element: <AccountDetails />,
          },
          {
            path: "orders",
            element: <MyOrders />,
          },
          {
            path: "orders/:orderId",
            element: <OrderDetail />,
          },
          {
            path: "address",
            element: <MyAddress />,
          },
          {
            path: "password",
            element: <ChangePassword />,
          },
        ],
      },
      {
        path: "wishlist",
        element: <WishlistPage />,
        handle: { crumb: () => "Wishlist" },
      },
      { path: "*", element: <ErrorPage /> },
    ],
  },
  {
    path: "admin",
    element: <AdminProtectedRoute />,
    handle: { crumb: () => "Admin" },
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "dashboard",
            element: <Navigate to="/admin" replace />,
          },
          {
            path: "products",
            element: <AdminProducts />,
          },
          {
            path: "orders",
            element: <AdminOrders />,
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            path: "stats",
            element: <AdminStats />,
          },
          {
            path: "deals",
            element: <AdminDeals />,
          },
        ],
      },
    ],
  },
]);
