import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: [],
};

export const prooductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const status = state.product.find((pro) => pro.id === newProduct.id);
      console.log(newProduct);
      if (!status) {
        state.product.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          qty: action.payload.qty,
          img: action.payload.img,
        });
      }
    },
  },
});
export const productAction = prooductSlice.actions;
export default prooductSlice.reducer;
