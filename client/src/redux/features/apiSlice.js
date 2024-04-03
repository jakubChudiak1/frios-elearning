import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const myfetchBaseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_ADRESS,
  prepareHeaders(headers) {
    return headers;
  },
  credentials: "include",
});

const myNewBaseQuery = async (arg, api, extra) => {
  const result = await myfetchBaseQuery(arg, api, extra);
  if (result?.data && result.error?.status === 401) {
    api.dispatch(apiSlice.util.invalidateTags(["Authentication"]));
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: myNewBaseQuery,
  tagTypes: [
    "Subjects",
    "Authentication",
    "UNKNOWN_ERROR",
    "Accesses",
    "Files",
    "Categories",
    "Chapters",
    "EditMode",
    "Users",
    "Roles",
    "Languages",
  ],
  endpoints: () => ({}),
});
