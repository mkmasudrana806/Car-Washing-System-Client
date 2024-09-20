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
        console.log("getAllUsers redux called");
        return {
          url: "/users",
        };
      },
    }),
  }),
});

export const { useGetUserProfileQuery, useGetAllUsersQuery } = userApi;
