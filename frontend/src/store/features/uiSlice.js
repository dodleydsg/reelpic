import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mask: false,
  addPost: false,
  addCatalogue: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMask: (state) => {
      state.mask = !state.mask;
    },
    setMask: (state, { payload }) => {
      state.mask = payload;
    },
    toggleAddPost: (state, { payload }) => {
      state.addPost = payload;
    },
    toggleAddCatalogue: (state, { payload }) => {
      state.addCatalogue = payload;
    },
  },
});

export const { toggleMask, setMask, toggleAddPost, toggleAddCatalogue } =
  uiSlice.actions;

export default uiSlice.reducer;
