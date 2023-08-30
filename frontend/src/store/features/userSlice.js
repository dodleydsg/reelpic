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
      
      thunkAPI.abort("User not found or token unvavailable");
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
    updateUser: (state, { payload }) => {
      state.user = { ...state.user, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loggedIn = true;
        state.catalogueList = state.user.catalogues;
        state.notifications = state.user.notifications;
        state.posts = state.user.posts;
        state.likes = state.user.likes;
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

export const { setLoggedIn, updateCatalogueList, updateUser } =
  userSlice.actions;

export default userSlice.reducer;
