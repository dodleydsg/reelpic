import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mask: false,
  mobileNav: false,
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
    toggleMobileNotifications: (state) => {
      state.mobileNav = !state.mobileNav;
    },
  },
});

export const { toggleMask, setMask, toggleMobileNotifications } =
  uiSlice.actions;

export default uiSlice.reducer;
