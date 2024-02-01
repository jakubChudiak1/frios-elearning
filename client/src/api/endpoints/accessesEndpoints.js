import { apiSlice } from "../../redux/features/apiSlice";

export const accessApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getAccessesList: build.query({
      query: () => "accesses",
      providesTags: ["Accesses"],
    }),
    getAccessStatus: build.query({
      query: (subjectId) => `accesses/access-status/${subjectId}`,
      providesTags: ["Accesses"],
    }),
    getUsersSubjectsByStatus: build.query({
      query: (status) => `accesses/users-subjects?status=${status}`,
      providesTags: ["Subjects", "Authentication", "Accesses"],
    }),
    getUsersRequests: build.query({
      query: () => "accesses/user-requests",
      providesTags: ["Accesses", "Authentication"],
    }),
    getEditableSubjects: build.query({
      query: () => "accesses/editable-subjects",
      providesTags: ["Accesses", "Subjects", "Authentication"],
    }),
    getIsSubjectEditable: build.query({
      query: (subjectId) => `/is-editable/${subjectId}`,
      providesTags: ["Accesses", "Subjects"],
    }),
    acceptStatus: build.mutation({
      query: (accessId) => ({
        url: `accesses/accept-status/${accessId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Accesses"],
    }),
    rejectStatus: build.mutation({
      query: (accessId) => ({
        url: `accesses/reject-status/${accessId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Accesses"],
    }),
    addAccess: build.mutation({
      query: (access) => ({
        url: "accesses/add-access",
        method: "POST",
        body: access,
      }),
      invalidatesTags: ["Accesses"],
    }),
    deleteAccess: build.mutation({
      query: (access_id) => ({
        url: `accesses/delete/${access_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Accesses"],
    }),
  }),
});

export const {
  useGetAccessesListQuery,
  useGetAccessStatusQuery,
  useGetEditableSubjectsQuery,
  useGetUsersSubjectsByStatusQuery,
  useGetUsersRequestsQuery,
  useAddAccessMutation,
  useGetIsSubjectEditableQuery,
  useAcceptStatusMutation,
  useRejectStatusMutation,
  useDeleteAccessMutation,
} = accessApi;
