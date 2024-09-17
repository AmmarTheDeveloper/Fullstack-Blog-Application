import { createSlice } from "@reduxjs/toolkit";
import { BlogType } from "@/models/Blog";

interface BlogState {
  blog: BlogType | null;
}

const initialState: BlogState = {
  blog: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog(state, action) {
      state.blog = action.payload;
    },
  },
});

export const { setBlog } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
