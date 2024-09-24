import PaymentFaildMsg from "../components/messages/PaymentFaildMsg";
import PurchaseSuccessMessage from "../components/messages/PurchaseSuccessMessage";
import BookingPage from "../pages/user/BookingPage";
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
    path: "booking",
    element: <BookingPage />,
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
    path: "purchase-success",
    element: <PurchaseSuccessMessage />,
  },
  {
    path: "purchase-faild",
    element: <PaymentFaildMsg />,
  },
];
