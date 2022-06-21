import { configureStore } from "@reduxjs/toolkit";
import ISMS_Reducer from "./ISMS_Slice";

export default configureStore({
  reducer: {
    ISMS: ISMS_Reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
