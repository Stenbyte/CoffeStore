import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  load: true,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.token = action.payload.token;
      state.load = action.payload.load;
    },
    logOut: (state, action) => {
      state.token = action.payload.token;
      state.load = action.payload.load;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
