import useAuthStore from "@/services/store/useAuthStore";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated()) {
    return (
      <>
        <Outlet />
      </>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default ProtectedRoute;
