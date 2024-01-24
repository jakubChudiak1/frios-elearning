import { apiSlice } from "../../redux/features/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategoriesList: build.query({
      query: () => "categories",
      providesTags: ["Categories"],
    }),
    addCategory: build.mutation({
      query: (category) => ({
        url: "categories/add-category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const { useGetCategoriesListQuery, useAddCategoryMutation } =
  categoryApi;
