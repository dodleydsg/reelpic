import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import uiReducer from "../store/features/uiSlice";
import userReducer from "../store/features/userSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    user: userReducer,
  },
});
