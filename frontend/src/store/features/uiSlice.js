import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mask: false,
  addPostModal: false,
  addCatalogueModal: false,
  exploreModal: false,
  successModal: false,
  failureModal: false,
  catalogueModal: false,
  bookmarkModal: false,
  alertText: "",
  alert: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMask: (state) => {
      state.mask = !state.mask;
    },
    setAlertText: (state, { payload }) => {
      state.alertText = payload;
    },
    setAlert: (state, { payload }) => {
      state.alert = payload;
    },
    setMask: (state, { payload }) => {
      state.mask = payload;
    },
    resetState: (state) => {
      state = initialState;
    },
    toggleAddPostModal: (state) => {
      state.addPostModal = !state.addPostModal;
    },
    toggleAddCatalogueModal: (state, { payload }) => {
      state.addCatalogueModal = !state.addCatalogueModal;
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
    toggleSuccessModal: (state) => {
      state.successModal = !state.successModal;
    },
  },
});

export const {
  toggleMask,
  setMask,
  setAlert,
  setAlertText,
  resetState,
  toggleAddPostModal,
  toggleAddCatalogueModal,
  toggleExploreModal,
  toggleCatalogueModal,
  toggleBookmarkModal,
  toggleSuccessModal,
} = uiSlice.actions;

export default uiSlice.reducer;
