import AdminDashboard from "../pages/admin/AdminDashboard";

// common admin paths
export const adminPaths = [
  {
    name: "Dashboard",
    index: true,
    element: <AdminDashboard />,
  },
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  }
];
