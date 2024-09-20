import PurchaseSuccessMessage from "../components/messages/PurchaseSuccessMessage";
import UserDashboard from "../pages/user/UserDashboard";

// common user paths
export const userPaths = [
  {
    name: "Dashboard",
    index: true,
    element: <UserDashboard />,
  },
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashboard />,
  },
  {
    name: "Orders Management",
    children: [
      {
        name: "My Orders",
        path: "my-orders",
        element: <h1>My Orders</h1>,
      },
      {
        name: "Bookings",
        path: "bookings",
        element: <h1>Booking</h1>,
      },
    ],
  },
  {
    path: "purchase-success/:id",
    element: <PurchaseSuccessMessage />,
  },
];
