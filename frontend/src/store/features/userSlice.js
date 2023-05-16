import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  pending: true,
  rejected: false,
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ token, id }, thunkAPI) => {
    try {
      let resp = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/user`,
        data: {
          userId: id,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("There was an error");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.pending = false;
        state.tried = true;
      })
      .addCase(getUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        console.log(action);
        state.pending = false;
        state.rejected = true;
      });
  },
});

export const { setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
