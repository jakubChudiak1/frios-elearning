import { apiSlice } from "../../redux/features/apiSlice";

export const chapterApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubjectChapters: build.query({
      query: (subjectId) => `chapters/${subjectId}`,
      providesTags: ["Chapters"],
    }),
    getChaptersContent: build.query({
      query: ({ subjectId, chapterId }) =>
        `chapters/${subjectId}/chapter/${chapterId}`,
      providesTags: ["Chapters"],
    }),
    addMainChapter: build.mutation({
      query: (chapter) => ({
        url: `chapters/create-main-chapter`,
        method: "POST",
        body: chapter,
      }),
      invalidatesTags: ["Chapters"],
    }),
    addSideChapter: build.mutation({
      query: (chapter) => ({
        url: "chapters/create-side-chapter",
        method: "POST",
        body: chapter,
      }),
      invalidatesTags: ["Chapters"],
    }),
    updateChaptersContent: build.mutation({
      query: ({ chapterId, ...chapter }) => ({
        url: `chapters/chapter/${chapterId}`,
        method: "PATCH",
        body: chapter,
      }),
      invalidatesTags: ["Chapters"],
    }),
  }),
});

export const {
  useGetSubjectChaptersQuery,
  useGetChaptersContentQuery,
  useAddMainChapterMutation,
  useAddSideChapterMutation,
  useUpdateChaptersContentMutation,
} = chapterApi;
