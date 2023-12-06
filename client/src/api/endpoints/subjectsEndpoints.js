import { apiSlice } from "../../redux/features/apiSlice";

export const subjectsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getSubjectsList: build.query({
      query: () => "subjects",
      providesTags: ["Subjects"],
    }),
    getSubjectsByStatus: build.query({
      query: (status) => `subjects/status?is_public=${status}`,
      providesTags: ["Subjects"],
    }),
    getSubjectById: build.query({
      query: (subjectId) => `subjects/${subjectId}`,
    }),
    getSubjectByName: build.query({
      query: (subjectName) => `subjects/name?name=${subjectName}`,
    }),
    getSubjectsByCreator: build.query({
      query: ({ userId, subjectId }) =>
        `subjects/creator?user_id=${userId}&subject_id=${subjectId}`,
    }),
    getRecommendedSubjects: build.query({
      query: ({ categoryName, subjectId }) =>
        `subjects/recommended?category_name=${categoryName}&subject_id=${subjectId}`,
    }),
    getSubjectsByCategory: build.query({
      query: (categoryName) =>
        `subjects/category?category_name=${categoryName}`,
    }),
    getSubjectByString: build.query({
      query: (str) => `subjects/search?q=${str}`,
    }),
    addSubject: build.mutation({
      query: (subject) => ({
        url: "subjects/add-subject",
        method: "POST",
        body: subject,
      }),
      invalidatesTags: ["Subjects"],
    }),
    updateSubject: build.mutation({
      query: ({ subjectId, ...subject }) => ({
        url: `/subjects/update-subject/${subjectId}`,
        method: "PATCH",
        body: subject,
      }),
    }),
    deleteSubject: build.mutation({
      query: (subjectId) => ({
        url: `/subjects/delete-subject/${subjectId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetSubjectsListQuery,
  useGetSubjectsByStatusQuery,
  useGetRecommendedSubjectsQuery,
  useGetSubjectByIdQuery,
  useGetSubjectByNameQuery,
  useGetSubjectByStringQuery,
  useGetSubjectsByCreatorQuery,
  useGetSubjectsByCategoryQuery,
  useAddSubjectMutation,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectsApi;
