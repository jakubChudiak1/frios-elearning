import { apiSlice } from "../../redux/features/apiSlice";

export const ldapApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    ldapSignIn: build.mutation({
      query: (user) => ({
        url: "ldap/signin",
        method: "POST",
        body: user,
      }),
      invalidatesTags: (result, error, id) =>
        result ? ["Authentication", "Accesses"] : [""],
    }),
  }),
});

export const { useLdapSignInMutation } = ldapApi;
