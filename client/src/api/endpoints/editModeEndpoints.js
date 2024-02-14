import { apiSlice } from "../../redux/features/apiSlice";

export const editModeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    setEditMode: build.mutation({
      query: (editMode) => ({
        url: "edit-mode/set-mode",
        method: "PATCH",
        body: editMode,
      }),
      invalidatesTags: ["EditMode"],
    }),
  }),
});

export const { useSetEditModeMutation } = editModeApi;
