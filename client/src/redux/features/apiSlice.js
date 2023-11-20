import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const myfetchBaseQuery = fetchBaseQuery({ baseUrl: "/" });

const myNewBaseQuery = async (arg, api, extra) => {
  const result = await myfetchBaseQuery(arg, api, extra);
  if (result?.data && result.error?.status === 401) {
    api.dispatch(
      apiSlice.util.invalidateTags(["Authentication", "UNKNOWN_ERROR"]),
    );
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: myNewBaseQuery,
  tagTypes: ["Subjects", "Authentication", "UNAUTHORIZED", "UNKNOWN_ERROR"],
  endpoints: () => ({}),
});
