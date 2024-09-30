import PaymentFaildMsg from "../components/messages/PaymentFaildMsg";
import PurchaseSuccessMessage from "../components/messages/PurchaseSuccessMessage";
import BookingPage from "../pages/user/BookingPage";
import UpcommingBookings from "../pages/user/UpcommingBookings";
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
    name: "Upcomming Bookings",
    path: "upcomming-bookings",
    element: <UpcommingBookings />,
  },
  {
    path: "booking",
    element: <BookingPage />,
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
