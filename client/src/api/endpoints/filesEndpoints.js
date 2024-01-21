import { apiSlice } from "../../redux/features/apiSlice";

export const filesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getFiles: build.query({
      query: () => "files",
      providesTags: ["Files"],
    }),
    getFileById: build.query({
      query: (fileId) => `files/${fileId}`,
      providesTags: ["Files"],
    }),
    addFile: build.mutation({
      query: (file) => ({
        url: "files/add-file",
        method: "POST",
        body: file,
      }),
      invalidatesTags: ["Files"],
    }),
  }),
});

export const { useGetFilesQuery, useGetFileByIdQuery, useAddFileMutation } =
  filesApi;
