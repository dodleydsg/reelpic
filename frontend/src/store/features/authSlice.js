import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: true,
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, payload) => {
      state.loggedIn = payload;
    },
  },
});

export const { setLoggedIn } = authSlice.actions;

export default authSlice.reducer;
