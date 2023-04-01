import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "ndidodley@gmail.com",
  password: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
});

export default authSlice.reducer;
