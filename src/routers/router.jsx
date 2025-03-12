import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/orders", element: <div>Orders</div> },
      { path: "/about", element: <div>About</div> },
    ],
  },
]);

export default router;
