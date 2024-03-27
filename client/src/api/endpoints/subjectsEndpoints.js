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
      providesTags: ["Subjects"],
    }),
    getSubjectByName: build.query({
      query: (subjectName) => `subjects/name?name=${subjectName}`,
      providesTags: ["Subjects"],
    }),
    getSubjectsByCreator: build.query({
      query: ({ userId, subjectId }) =>
        `subjects/creator?user_id=${userId}&subject_id=${subjectId}`,
      providesTags: ["Subjects"],
    }),
    getRecommendedSubjects: build.query({
      query: ({ categoryName, subjectId }) =>
        `subjects/recommended?category_name=${categoryName}&subject_id=${subjectId}`,
      providesTags: ["Subjects"],
    }),
    getSubjectsByCategory: build.query({
      query: (categoryName) =>
        `subjects/category?category_name=${categoryName}`,
      providesTags: ["Subjects"],
    }),
    getSubjectByString: build.query({
      query: (str) => `subjects/search?q=${str}`,
      providesTags: ["Subjects"],
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
        url: `subjects/update-subject/${subjectId}`,
        method: "PATCH",
        body: subject,
      }),
      invalidatesTags: ["Subjects", "Accesses"],
    }),
    updateDescription: build.mutation({
      query: ({ subjectId, ...subject }) => ({
        url: `subjects/update-description/${subjectId}`,
        method: "PATCH",
        body: subject,
      }),
      invalidatesTags: ["Subjects"],
    }),
    changeVisibility: build.mutation({
      query: ({ subjectId, ...subject }) => ({
        url: `subjects/change-visibility/${subjectId}`,
        method: "PATCH",
        body: subject,
      }),
      invalidatesTags: ["Subjects"],
    }),
    deleteSubject: build.mutation({
      query: (subjectId) => ({
        url: `subjects/delete-subject/${subjectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subjects"],
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
  useUpdateDescriptionMutation,
  useChangeVisibilityMutation,
  useDeleteSubjectMutation,
} = subjectsApi;
