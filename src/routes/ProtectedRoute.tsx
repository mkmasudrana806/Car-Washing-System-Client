import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  const location = useLocation();
  if (!token)
    return <Navigate to={"/login"} state={{ from: location }} replace={true} />;
  return children;
};

export default ProtectedRoute;
