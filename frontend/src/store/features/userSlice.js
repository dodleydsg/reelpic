import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userResolver from "../../resolvers/user.resolver";
import userRoutes from "../../actions/user.actions";

const initialState = {
  pending: true,
  rejected: true,
  loggedIn: false,
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
  reducers: {
    setLoggedIn: (state, { payload }) => {
      state.loggedIn = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.pending = false;
        state.rejected = false;
        state.loggedIn = true;
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
