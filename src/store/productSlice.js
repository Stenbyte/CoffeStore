import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  product: [],
  qty: 0,
  totalPrice: 0,
};

export const prooductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.product.find(
        (pro) => pro.id === newProduct.id
      );

      if (!existingProduct) {
        state.product.push({
          id: newProduct.id,
          name: newProduct.name,
          price: +newProduct.price,
          qty: 1,
          img: newProduct.img,
        });
      } else {
        existingProduct.qty = existingProduct.qty + 1;
        existingProduct.price = existingProduct.price + newProduct.price;
      }
      state.qty = state.qty + 1;
      state.totalPrice = state.totalPrice + newProduct.price;
    },
  },
});
export const productAction = prooductSlice.actions;
export default prooductSlice.reducer;
