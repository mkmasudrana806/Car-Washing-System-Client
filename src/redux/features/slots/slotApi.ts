import baseApi from "../../api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- create a slot into db
    createSlot: builder.mutation({
      query: (newSlot) => {
        return {
          url: `/slots/create-slots`,
          method: "POST",
          body: newSlot,
        };
      },
      invalidatesTags: ["slots"],
    }),

    // --------- load all slots
    loadAllSlots: builder.query({
      query: ({ fields }) => {
        const queryParams = new URLSearchParams();
        if (fields) queryParams.append("fields", fields);
        return { url: `/slots?${queryParams}` };
      },
      providesTags: ["slots"],
    }),

    // --------- toggle slot status available to cancel
    toggleSlotStatus: builder.mutation({
      query: (slotId) => {
        return {
          url: `/slots/toggle-slot-status/${slotId}`,
          method: "PATCH",
        };
      },
      invalidatesTags: ["slots"],
    }),

    // --------- load available slots
    loadAvailableSlots: builder.query({
      query: ({ fields }) => {
        const queryParams = new URLSearchParams();
        if (fields) queryParams.append("fields", fields);
        return { url: `/slots/availability?${queryParams}` };
      },
      providesTags: ["slots"],
    }),

    // ---------- delete single slot
    deleteSlot: builder.mutation({
      query: (id) => ({
        url: `/slots/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "slot", id: arg.id }],
    }),

    // ---------- update single slot
    updateSlot: builder.mutation({
      query: ({ slot, slotId }) => {
        return {
          url: `/slots/${slotId}`,
          method: "PATCH",
          body: slot,
        };
      },
      invalidatesTags: ["slots"],
    }),
  }),
});

export const {
  useCreateSlotMutation,
  useLoadAllSlotsQuery,
  useLoadAvailableSlotsQuery,
  useToggleSlotStatusMutation,
  useDeleteSlotMutation,
  useUpdateSlotMutation,
} = slotApi;
