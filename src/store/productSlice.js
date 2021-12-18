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
      // If new product
      if (!existingProduct) {
        state.product.push({
          id: newProduct.id,
          name: newProduct.name,
          price: newProduct.price,
          qty: 1,
          img: newProduct.img,
          totalPrice: 0,
        });
      } else {
        // Updating existind product
        existingProduct.qty = existingProduct.qty + 1;
        existingProduct.totalPrice =
          existingProduct.totalPrice + existingProduct.price;
      }
      // Updating totalPrice & qty
      state.qty = state.qty + 1;
      state.totalPrice = state.totalPrice + newProduct.price;
    },
    removeProduct: (state, action) => {
      const id = action.payload;
      const existingProduct = state.product.find((prod) => prod.id === id);
      if (existingProduct.qty === 1) {
        state.product = state.product.filter((prod) => prod.id !== id);
      } else {
        // Updating existing qty & totalPrice
        existingProduct.qty = existingProduct.qty - 1;
        existingProduct.totalPrice =
          existingProduct.totalPrice - existingProduct.price;
      }
      // Updating total qty and totalPrice
      state.qty = state.qty - 1;
      state.totalPrice = state.totalPrice - existingProduct.price;
    },
  },
});
export const productAction = prooductSlice.actions;
export default prooductSlice.reducer;
