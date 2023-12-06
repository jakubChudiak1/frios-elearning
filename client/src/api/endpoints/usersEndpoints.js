import { apiSlice } from "../../redux/features/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsersList: build.query({
      query: () => "users",
    }),
  }),
});

export const { useGetUsersListQuery } = userApi;
