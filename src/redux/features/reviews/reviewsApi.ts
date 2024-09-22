import baseApi from "../../api/baseApi";

const reviewsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // --------- get all reviews
    getAllReviews: builder.query({
      query: ({ serviceId }) => {
        const params = new URLSearchParams();
        if (serviceId) {
          params.append("serviceId", serviceId);
        }
        return { url: `/reviews?${params.toString()}` };
      },
      providesTags: ["reviews"],
    }),

    //------------ create a new review
    createReview: builder.mutation({
      query: (review) => {
        return {
          url: `/reviews/create-review`,
          method: "POST",
          body: review,
        };
      },
      invalidatesTags: ["reviews"],
    }),

    //------------ delete a review
    deleteReview: builder.mutation({
      query: (reviewId) => {
        return {
          url: `/reviews/${reviewId}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["reviews"],
    }),

    //------------ update a review
    updateReview: builder.mutation({
      query: ({ values, reviewId }) => {
        return {
          url: `/reviews/${reviewId}`,
          method: "PATCH",
          body: values,
        };
      },
      invalidatesTags: ["reviews"],
    }),
  }),
});

export const {
  useGetAllReviewsQuery,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = reviewsApi;
