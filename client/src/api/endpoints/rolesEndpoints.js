import { apiSlice } from "../../redux/features/apiSlice";

export const rolesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getRoles: build.query({
      query: () => "roles",
      providesTags: ["Roles"],
    }),
  }),
});

export const { useGetRolesQuery } = rolesApi;
