import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";
import ShopPage from "../pages/shop/ShopPage";
import ProductDetails from "../pages/shop/ProductDetails";

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
    ],
  },
]);

export default router;
