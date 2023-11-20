import { apiSlice } from "../../redux/features/apiSlice";

export const accessApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAccessesList: build.query({
      query: () => "accesses",
    }),
    getAccessStatus: build.query({
      query: (subjectId) => `/accesses/access-status/${subjectId}`,
    }),
  }),
});
