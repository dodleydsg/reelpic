import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const setCredentials = createAsyncThunk("auth/setCredentials", () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});


export default authSlice.reducer;
