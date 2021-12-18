import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import productReducer from "./productSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    ui: uiReducer,
  },
});
