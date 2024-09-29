import baseApi from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ----------- get current user
    getUserProfile: builder.query({
      query: () => {
        return {
          url: "/users/getMe",
        };
      },
    }),

    // get all users
    getAllUsers: builder.query({
      query: () => {
        return {
          url: "/users",
        };
      },
      providesTags: ["users"],
    }),

    // --------- toggle user status active to blocked and vice versa
    toggleUserStatus: builder.mutation({
      query: ({ id, status }) => {
        return {
          url: `/users/toggle-user-status/${id}`,
          method: "PATCH",
          body: { status: status },
        };
      },
      invalidatesTags: ["users"],
    }),

    // --------- toggle user role user to admin and vice versa
    toggleUserRole: builder.mutation({
      query: ({ id, role }) => {
        return {
          url: `/users/toggle-user-role/${id}`,
          method: "PATCH",
          body: { role: role },
        };
      },
      invalidatesTags: ["users"],
    }),

    // ---------- delete single user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: "user", id: arg.id }],
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetAllUsersQuery,
  useToggleUserStatusMutation,
  useToggleUserRoleMutation,
  useDeleteUserMutation,
} = userApi;
