import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();
  
  if (!user) {
    return <Navigate state={{ from: location }} to="/login" replace />;
  }

  // Check if the user is logged in and is an admin
  if (user && user!.role !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  // If user is an admin, allow them to access the admin routes
  return children;
};

export default AdminRoute;
