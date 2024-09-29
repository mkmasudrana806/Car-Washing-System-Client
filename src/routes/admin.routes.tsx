import AdminDashboard from "../pages/admin/AdminDashboard";
import ServiceManagement from "../pages/admin/ServiceManagement";
import SlotsManagement from "../pages/admin/SlotsManagement";
import UserBookings from "../pages/admin/UserBookings";
import UsersManagement from "../pages/admin/UsersManagement";

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
  },
  {
    name: "Services",
    path: "services",
    element: <ServiceManagement />,
  },
  {
    name: "Slots",
    path: "slots",
    element: <SlotsManagement />,
  },
  {
    name: "Bookings",
    path: "bookings",
    element: <UserBookings />,
  },

  {
    name: "Users",
    path: "users",
    element: <UsersManagement />,
  },
];
