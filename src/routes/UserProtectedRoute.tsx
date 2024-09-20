import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { ReactNode } from "react";

const UserRoute = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);
  const location = useLocation();

  if (!user) {
    return <Navigate state={{ from: location }} to="/login" replace />;
  }

  if (user && user!.role !== "user") {
    return <Navigate to="/forbidden" replace />;
  }
  // If user is an User, allow them to access the User routes
  return children;
};

export default UserRoute;
