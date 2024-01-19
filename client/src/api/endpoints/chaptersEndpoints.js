import { apiSlice } from "../../redux/features/apiSlice";

export const chapterApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubjectChapters: build.query({
      query: (subjectId) => `chapters/${subjectId}`,
    }),
    getChaptersContent: build.query({
      query: ({ subjectId, chapterId }) =>
        `chapters/${subjectId}/chapter/${chapterId}`,
    }),
    updateChaptersContent: build.mutation({
      query: ({ chapterId, ...chapter }) => ({
        url: `chapters/chapter/${chapterId}`,
        method: "PATCH",
        body: chapter,
      }),
    }),
  }),
});

export const {
  useGetSubjectChaptersQuery,
  useGetChaptersContentQuery,
  useUpdateChaptersContentMutation,
} = chapterApi;
