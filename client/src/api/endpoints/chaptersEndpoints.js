import { apiSlice } from "../../redux/features/apiSlice";

export const chapterApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubjectChapters: build.query({
      query: ({ subjectId, published }) =>
        `chapters/${subjectId}?q=${published}`,
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
      invalidatesTags: (result, error, id) => (result ? ["Chapters"] : [""]),
    }),
    addSideChapter: build.mutation({
      query: (chapter) => ({
        url: "chapters/create-side-chapter",
        method: "POST",
        body: chapter,
      }),
      invalidatesTags: (result, error, id) => (result ? ["Chapters"] : [""]),
    }),
    updateChaptersContent: build.mutation({
      query: ({ chapterId, ...chapter }) => ({
        url: `chapters/chapter/${chapterId}`,
        method: "PATCH",
        body: chapter,
      }),
      invalidatesTags: (result, error, id) => (result ? ["Chapters"] : [""]),
    }),
    updateChaptersName: build.mutation({
      query: ({ subjectId, chapterId, ...chapter }) => ({
        url: `chapters/${subjectId}/chapter-name/${chapterId}`,
        method: "PATCH",
        body: chapter,
      }),
      invalidatesTags: (result, error, id) => (result ? ["Chapters"] : [""]),
    }),
    updateChapterPublished: build.mutation({
      query: ({ chapterId, ...chapter }) => ({
        url: `chapters/published/${chapterId}`,
        method: "PATCH",
        body: chapter,
      }),
      invalidatesTags: ["Chapters"],
    }),
    deleteChapter: build.mutation({
      query: ({ chapter_id, subject_id }) => ({
        url: `chapters/${subject_id}/delete-chapter/${chapter_id}`,
        method: "DELETE",
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
  useUpdateChaptersNameMutation,
  useUpdateChapterPublishedMutation,
  useDeleteChapterMutation,
} = chapterApi;
