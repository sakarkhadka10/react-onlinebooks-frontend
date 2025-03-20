import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/shop/ShopPage";
import ProductDetails from "../pages/shop/ProductDetails";
import CartPage from "../pages/cart/CartPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import CheckOutPage from "../pages/checkout/CheckOutPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/shop", element: <ShopPage /> },
      { path: "/shop/:slug", element: <ProductDetails /> },
      { path: "/orders", element: <div>Orders</div> },
      { path: "/about", element: <div>About</div> },
      { path: "/cart", element: <CartPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/checkout", element: <CheckOutPage /> },
    ],
  },
]);

export default router;
