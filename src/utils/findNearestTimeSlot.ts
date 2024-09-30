import dayjs from "dayjs";
import { TBooking } from "../types/bookingsType";

const findNearestSlot = (bookings: TBooking[], dataCount?: string) => {
  const now = dayjs(); // Current time

  // Combine date and startTime for each booking and filter out past slots
  const futureSlots = bookings
    .map((booking) => {
      const { date, startTime } = booking.slot;
      // Combine date and startTime to create a complete timestamp
      const slotDateTime = dayjs(`${date}T${startTime}`);
      return { ...booking, slotDateTime };
    })
    .filter((booking) => booking.slotDateTime.isAfter(now)) // Filter future slots
    .sort((a, b) => a.slotDateTime.diff(b.slotDateTime)); // Sort by the nearest date

  // Return the nearest future slot
  return dataCount === "one"
    ? futureSlots.length > 0
      ? futureSlots[0]
      : null
    : futureSlots.length > 0
    ? futureSlots
    : null;
};

export default findNearestSlot;
