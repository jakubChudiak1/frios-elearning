import { createSlice } from "@reduxjs/toolkit";

export const editModeSlice = createSlice({
  name: "EditModeSlice",
  initialState: {
    editModeState: false,
  },
  reducers: {
    setEditModeSlice: (state, action) => {
      state.editModeState = action.payload;
    },
  },
});

export const { setEditModeSlice } = editModeSlice.actions;

export default editModeSlice.reducer;
