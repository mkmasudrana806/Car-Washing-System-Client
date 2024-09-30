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
      // invalidatesTags: (_result, _error, arg) => [
      //   { type: "service-slots", id: arg.newBooking?.slot },
      // ],
    }),

    // load all bookings
    loadAllBookings: builder.query({
      query: ({ searchTerm, sort, limit, page, fields, ...others }) => {
        const params = new URLSearchParams();
        // Search term
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        // Sorting
        if (sort) {
          params.append("sort", sort);
        }
        // Pagination
        if (limit) {
          params.append("limit", limit.toString());
        }
        if (page) {
          params.append("page", page.toString());
        }
        // fileds limiting
        if (fields) {
          params.append("fields", fields.toString());
        }
        // Handle dynamic properties in "others"
        Object.keys(others).forEach((key) => {
          if (others[key]) {
            params.append(key, others[key].toString());
          }
        });

        return { url: `/bookings?${params.toString()}` };
      },
    }),

    // loads user bookings
    getUserBookings: builder.query({
      query: () => {
        return { url: "/my-bookings" };
      },
    }),
  }),
});

export const {
  useMakeAnBookingMutation,
  useLoadAllBookingsQuery,
  useGetUserBookingsQuery,
} = bookingApi;
