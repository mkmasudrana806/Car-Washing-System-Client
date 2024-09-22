import { createBrowserRouter } from "react-router-dom";
import { adminPaths } from "./admin.routes";
import { userPaths } from "./user.routes";
import routesGenerator from "../utils/routesGenerator";
import PublicLayout from "../components/layout/PublicLayout";
import Homepage from "../pages/public/Homepage";
import AboutUs from "../pages/public/AboutUs";
import AuthContainer from "../pages/AuthContainer";
import RouteNotFound from "../components/messages/RouteNotFound";
import DashboardLayout from "../components/layout/DashboardLayout";
import AdminRoute from "./AdminProtectedRoute";
import UserRoute from "./UserProtectedRoute";
import UnauthorizedAccess from "../components/messages/UnauthorizedAccess";
import ServicesPage from "../pages/public/ServicesPage";
import ServiceDetailsPage from "../pages/public/ServiceDetailsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "services/:id",
        element: <ServiceDetailsPage />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "login",
        element: <AuthContainer />,
      },
      {
        path: "forbidden",
        element: <UnauthorizedAccess />,
      },
      { path: "*", element: <RouteNotFound /> },
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
      ...routesGenerator(adminPaths),
      { path: "*", element: <RouteNotFound /> },
    ],
  },
  {
    path: "/user",
    element: (
      <UserRoute>
        <DashboardLayout />
      </UserRoute>
    ),
    children: [
      ...routesGenerator(userPaths),
      { path: "*", element: <RouteNotFound /> },
    ],
  },
  { path: "*", element: <RouteNotFound /> },
]);
