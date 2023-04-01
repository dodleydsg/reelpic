import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/authForm/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
