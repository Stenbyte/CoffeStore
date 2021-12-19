import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  notification: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    errorNot: (state, action) => {
      state.notification = {
        status: action.payload.status,
        message: action.payload.message,
      };
    },
    showCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});
export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
