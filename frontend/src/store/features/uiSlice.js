import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mask: false,
  addPost: false,
  addCatalogue: false,
  exploreModal: false,
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
    toggleExploreModal: (state) => {
      state.exploreModal = !state.exploreModal;
    },
  },
});

export const {
  toggleMask,
  setMask,
  toggleAddPost,
  toggleAddCatalogue,
  toggleExploreModal,
} = uiSlice.actions;

export default uiSlice.reducer;
