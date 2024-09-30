import styled from "styled-components";
import { useGetUserBookingsQuery } from "../../redux/features/bookings/bookingApi";
import { useEffect, useState } from "react";
import { TBooking } from "../../types/bookingsType";
import findNearestSlot from "../../utils/findNearestTimeSlot";
import UpcommingBookingCard from "./UpcommingBookingCard";
import DataNotFound from "../../components/messages/DataNotFound";

const UpcommingBookings = () => {
  const { data: bookings } = useGetUserBookingsQuery(undefined);

  // ------------ nearest booking countdwon timer
  const [nearestBooking, setNearestBooking] = useState<TBooking | any>(null);
  useEffect(() => {
    if (bookings?.data?.length > 0) {
      const nearestSlot = findNearestSlot(bookings?.data);
      setNearestBooking(nearestSlot);
    }
  }, [bookings]);

  return (
    <>
      {nearestBooking?.length === 0 ? (
        <h1>No Upcomming bookings</h1>
      ) : (
        <h1 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>
          Upcomming bookings are
        </h1>
      )}
      <UpcommingBookingsContainer>
        {nearestBooking?.length > 0 ? (
          nearestBooking.map((booking: any) => (
            <UpcommingBookingCard
              key={booking._id}
              deadline={booking?.slotDateTime?.valueOf()}
              nearestBooking={booking}
            />
          ))
        ) : (
          <DataNotFound />
        )}
      </UpcommingBookingsContainer>
    </>
  );
};

export default UpcommingBookings;

// upcomming bookings container
const UpcommingBookingsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`;
