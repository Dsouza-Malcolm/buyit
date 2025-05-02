import useAuthStore from "@/services/store/useAuthStore";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthProtected = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated()) {
    return <Navigate to={"/products"} />;
  }

  return <Outlet />;
};

export default AuthProtected;
