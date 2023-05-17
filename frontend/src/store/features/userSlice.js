import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import userResolver from "../../resolvers/user.resolver";
import userRoutes from "../../actions/user.actions";

const initialState = {
  pending: true,
  rejected: true,
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ id, token }, thunkAPI) => {
    try {
      let resp = await userResolver(userRoutes.ALT_READ, {
        userId: id,
        token,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
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
        state.rejected = false;
      })
      .addCase(getUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        // console.log(action);
        state.pending = false;
        state.rejected = true;
      });
  },
});

export const { setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
