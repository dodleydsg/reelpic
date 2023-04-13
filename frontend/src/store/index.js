import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/features/authForm/authSlice";
import uiReducer from "../store/features/uiSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
  },
});
