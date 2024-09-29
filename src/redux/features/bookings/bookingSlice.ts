import { createSlice } from "@reduxjs/toolkit";
import { TBooking, TCurrentBooking } from "../../../types/bookingsType";

// type
type TBookings = {
  userBookings: TBooking[];
  allBookings: TBooking[];
  currentBooking: TCurrentBooking | null;
};

// initialState
const initialState: TBookings = {
  userBookings: [],
  allBookings: [],
  currentBooking: null,
};

// bookings slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    // set curretn booking data
    setCurrentBooking: (state, action) => {
      state.currentBooking = { ...state.currentBooking, ...action.payload };
    },

    // remove current booking
    removeCurrentBooking: (state) => {
      state.currentBooking = null;
    },

    // set booking to store
    setBookingToStore: (state, action) => {
      state.userBookings?.push(action.payload);
    },
  },
});

export const { setCurrentBooking, removeCurrentBooking, setBookingToStore } =
  bookingSlice.actions;
export default bookingSlice.reducer;
