import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/shop/ShopPage";
import ProductDetails from "../pages/shop/ProductDetails";
import CartPage from "../pages/cart/CartPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import CheckOutPage from "../pages/checkout/CheckOutPage";
import PrivateRoute from "./PrivateRoute";
import OrdersPage from "../pages/orders/OrdersPage";
import AdminRoute from "./AdminRoute";
import DashboardLayout from "../pages/AdminDashboard/DashboardLayout";
import AdminHome from "../pages/AdminDashboard/AdminHome";
import AddBook from "../pages/AdminDashboard/AddBook";
import ManageBooks from "../pages/AdminDashboard/ManageBooks";
import EditBook from "../pages/AdminDashboard/EditBook";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/shop/:slug", element: <ProductDetails /> },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrdersPage />
          </PrivateRoute>
        ),
      },
      { path: "/about", element: <div>About</div> },
      { path: "/cart", element: <CartPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <CheckOutPage />
          </PrivateRoute>
        ),
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <AdminRoute>
        <DashboardLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "add-book",
        element: <AddBook />,
      },

      {
        path: "edit-book/:id",
        element: <EditBook />,
      },

      {
        path: "manage-books",
        element: <ManageBooks />,
      },
    ],
  },
]);

export default router;
