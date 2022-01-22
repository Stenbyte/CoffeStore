import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  switchCheck: false,
  notification: null,
  confirmPurchase: false,
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
    switchCheck: (state) => {
      state.switchCheck = !state.switchCheck;
    },
    confirm: (state) => {
      state.confirmPurchase = !state.confirmPurchase;
    },
  },
});
export const uiAction = uiSlice.actions;
export default uiSlice.reducer;
