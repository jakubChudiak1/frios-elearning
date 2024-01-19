import { createSlice } from "@reduxjs/toolkit";

export const chapterSlice = createSlice({
  name: "ChapterSidebar",
  initialState: {
    chapterSidebar: true,
  },
  reducers: {
    setChapterSidebar: (state, action) => {
      state.chapterSidebar = action.payload;
    },
  },
});

export const { setChapterSidebar } = chapterSlice.actions;

export default chapterSlice.reducer;
