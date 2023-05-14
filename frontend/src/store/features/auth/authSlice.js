import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: true,
};

export const getUser = createAsyncThunk("auth/getUser", () => {});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, payload) => {
      state.loggedIn = payload;
    },
  },
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state) => {
      state.catalogues = payload.catalogues;
    },
    [getUser.rejected]: (state) => {
      state.isLoading = false;
      state.message = "";
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
