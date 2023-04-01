import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearForm: (state) => {
      return (state = initialState);
    },
    updatePassword: (state, { payload }) => {
      state.password = payload;
    },
    updateEmail: (state, { payload }) => {
      state.email = payload;
    },
  },
});

export const setCredentials = createAsyncThunk("auth/setCredentials", () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});

export const { clearForm, updatePassword, updateEmail } = authSlice.actions;

export default authSlice.reducer;
