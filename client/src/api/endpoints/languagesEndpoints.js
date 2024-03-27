import { apiSlice } from "../../redux/features/apiSlice";

const languageApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getLanguages: build.query({
      query: () => "languages",
      providesTags: ["Languages"],
    }),
  }),
});

export const { useGetLanguagesQuery } = languageApi;
