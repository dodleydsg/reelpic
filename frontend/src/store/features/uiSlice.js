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
  alertText: "Nothing to see here",
  alertVariant: "default",
  alertAction: "refresh",
  alert: true,
  stale: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleMask: (state) => {
      state.mask = !state.mask;
    },
    configureAlert: (state, { payload }) => {
      state.alertText = payload.text;
      state.alertVariant = payload.variant;
      state.alertAction = payload.action;
    },
    setAlert: (state, { payload }) => {
      state.alert = payload;
    },
    setMask: (state, { payload }) => {
      state.mask = payload;
    },
    setStale: (state, { payload }) => {
      state.stale = payload;
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
  setStale,
  setAlert,
  configureAlert,
  resetState,
  toggleAddPostModal,
  toggleAddCatalogueModal,
  toggleExploreModal,
  toggleCatalogueModal,
  toggleBookmarkModal,
  toggleSuccessModal,
} = uiSlice.actions;

export default uiSlice.reducer;
