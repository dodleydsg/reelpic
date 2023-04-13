import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mask: false,
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
  },
});

export const { toggleMask, setMask } = uiSlice.actions;

export default uiSlice.reducer;
