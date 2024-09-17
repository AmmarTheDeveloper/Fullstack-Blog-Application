import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/authSlice";
import { blogReducer } from "./features/blog/blogSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      blog: blogReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
