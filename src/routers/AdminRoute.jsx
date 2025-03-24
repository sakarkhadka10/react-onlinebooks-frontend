import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={"/"} />;
  }

  //If usertype is "user then they will not allowed to access admin route"
  const usertype = localStorage.getItem("usertype");

  if (usertype !== "admin") {
    return <Navigate to={"/"} />;
  }

  return children ? children : <Outlet />;
};

export default AdminRoute;
