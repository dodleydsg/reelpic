import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userResolver from "../../presentation/resolvers/user.resolver";
import userRoutes from "../../presentation/actions/user.actions";

const initialState = {
  pending: true,
  rejected: true,
  loggedIn: false,
};

export const getUser = createAsyncThunk(
  "user/getUser",
  async ({ token }, thunkAPI) => {
    try {
      let resp = await userResolver(userRoutes.ALT_READ, token);
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
    updateCatalogueList: (state, { payload }) => {
      state.catalogueList = [...state.catalogueList, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loggedIn = true;
        state.catalogueList = payload.catalogues;
        state.notifications = payload.notifications;
        state.posts = payload.posts;
        state.likes = payload.likes;
        state.pending = false;
        state.rejected = false;
        state.loggedIn = true;
      })
      .addCase(getUser.pending, (state) => {
        state.pending = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.pending = false;
        state.rejected = true;
      });
  },
});

export const { setLoggedIn, updateCatalogueList } = userSlice.actions;

export default userSlice.reducer;
