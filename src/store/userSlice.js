import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  load: false,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.token = "";
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
