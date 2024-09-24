import baseApi from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // -------- make an booking
    makeAnBooking: builder.mutation({
      query: (newBooking) => {
        return {
          url: `/bookings/create-booking`,
          method: "POST",
          body: newBooking,
        };
      },
      invalidatesTags: ["bookings"],
    }),
  }),
});

export const { useMakeAnBookingMutation } = bookingApi;
