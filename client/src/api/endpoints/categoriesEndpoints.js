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
      invalidatesTags: (result, error, id) => (result ? ["Categories"] : [""]),
    }),
    updateCategory: build.mutation({
      query: ({ categoryId, ...category }) => ({
        url: `categories/update-category/${categoryId}`,
        method: "PATCH",
        body: category,
      }),
      invalidatesTags: (result, error, id) => (result ? ["Categories"] : [""]),
    }),
    deleteCategory: build.mutation({
      query: ({ categoryId }) => ({
        url: `categories/delete-category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => (result ? ["Categories"] : [""]),
    }),
  }),
});

export const {
  useGetCategoriesListQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
