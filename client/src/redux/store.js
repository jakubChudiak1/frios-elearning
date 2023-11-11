import { configureStore } from "@reduxjs/toolkit";
import globalLoadingSlice from "./features/globalLoadingSlice";

const store = configureStore({
  reducer: {
    globalLoading: globalLoadingSlice,
  },
});

export default store;
