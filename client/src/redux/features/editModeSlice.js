import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

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
