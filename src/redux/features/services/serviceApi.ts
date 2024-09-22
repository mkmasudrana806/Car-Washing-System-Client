import baseApi from "../../api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ---------- create a service into db
    createService: builder.mutation({
      query: (newService) => {
        return {
          url: `/services/create-service`,
          method: "POST",
          body: newService,
        };
      },
      invalidatesTags: ["services"],
    }),
    // --------- load all services
    loadAllServices: builder.query({
      query: ({
        searchTerm,
        priceRange,
        selectedCategories,
        sort,
        limit,
        page,
        ...others
      }) => {
        const params = new URLSearchParams();
        // Search term
        if (searchTerm) {
          params.append("searchTerm", searchTerm);
        }
        // Price range
        if (priceRange) {
          params.append("minPrice", priceRange[0].toString());
          params.append("maxPrice", priceRange[1].toString());
        }
        // Categories
        if (selectedCategories?.length > 0) {
          selectedCategories?.forEach((category: string) =>
            params.append("category", encodeURIComponent(category))
          );
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

        // Handle dynamic properties in "others"
        Object.keys(others).forEach((key) => {
          if (others[key]) {
            params.append(key, others[key].toString());
          }
        });

        return { url: `/services?${params.toString()}` };
      },
      providesTags: ["services"],
    }),

    // ---------- load single service
    getServiceById: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
      }),
      providesTags: (_result, _error, arg) => [{ type: "service", id: arg.id }],
    }),

    // ---------- delete single service
    deleteService: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "service", id: arg.id },
      ],
    }),

    // ---------- update single service
    updateService: builder.mutation({
      query: ({ service, serviceId }) => {
        return {
          url: `/services/${serviceId}`,
          method: "PATCH",
          body: service,
        };
      },
      invalidatesTags: ["services"],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useLoadAllServicesQuery,
  useGetServiceByIdQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
