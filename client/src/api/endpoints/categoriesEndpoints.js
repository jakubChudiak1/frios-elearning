import { apiSlice } from "../../redux/features/apiSlice";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCategoriesList: build.query({
      query: () => "categories",
    }),
  }),
});

export const { useGetCategoriesListQuery } = categoryApi;
