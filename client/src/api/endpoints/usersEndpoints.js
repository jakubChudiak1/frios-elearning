import { apiSlice } from "../../redux/features/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsersList: build.query({
      query: () => "users",
      providesTags: ["Users"],
    }),
    changeUsersRole: build.mutation({
      query: ({ ...user }) => ({
        url: "users/change-role",
        method: "PATCH",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersListQuery, useChangeUsersRoleMutation } = userApi;
