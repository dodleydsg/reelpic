import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import uiReducer from "../store/features/uiSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});
