import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mask: false,
  addPost: false,
  addCatalogue: false,
  exploreModal: false,
  catalogueModal: false,
  bookmarkModal: false,
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
    toggleCatalogueModal: (state) => {
      state.catalogueModal = !state.catalogueModal;
    },
    toggleBookmarkModal: (state) => {
      state.bookmarkModal = !state.bookmarkModal;
    },
  },
});

export const {
  toggleMask,
  setMask,
  toggleAddPost,
  toggleAddCatalogue,
  toggleExploreModal,
  toggleCatalogueModal,
  toggleBookmarkModal,
} = uiSlice.actions;

export default uiSlice.reducer;
