import { apiSlice } from "../../redux/features/apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getIsValid: build.query({
      query: () => "auth/isvalid",
      providesTags: ["Authentication", "EditMode"],
    }),
    signin: build.mutation({
      query: (user) => ({
        url: "auth/signin",
        method: "POST",
        body: user,
      }),
      invalidatesTags: (result, error, id) =>
        result ? ["Authentication", "Accesses"] : [""],
    }),
    signup: build.mutation({
      query: (user) => ({
        url: "auth/signup",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Authentication"],
    }),
    signout: build.mutation({
      query: () => ({
        url: "auth/signout",
        method: "POST",
      }),
      invalidatesTags: ["Authentication", "Accesses"],
    }),
  }),
});

export const {
  useGetIsValidQuery,
  useSigninMutation,
  useSignoutMutation,
  useSignupMutation,
} = authApi;
