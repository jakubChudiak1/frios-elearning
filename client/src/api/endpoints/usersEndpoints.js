import { apiSlice } from "../../redux/features/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsersList: build.query({
      query: () => "users",
    }),
    getUsersSubjects: build.query({
      query: () => "accesses/users-subjects",
      providesTags: ["Subjects", "Authentication"],
    }),
  }),
});

export const { useGetUsersListQuery, useGetUsersSubjectsQuery } = userApi;
