// Utility function to check if a given date is the same as today
const isSameDate = (bookingDate: Date): boolean => {
  const today = new Date();
  const booking = new Date(bookingDate);

  // Compare year, month, and day only (ignoring time)
  return (
    booking.getFullYear() === today.getFullYear() &&
    booking.getMonth() === today.getMonth() &&
    booking.getDate() === today.getDate()
  );
};

export default isSameDate;
