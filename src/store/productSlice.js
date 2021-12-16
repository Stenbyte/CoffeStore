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
        });
      } else {
        // Updating existind product
        existingProduct.qty = existingProduct.qty + 1;
        existingProduct.price = existingProduct.price + newProduct.price;
      }
      // Updating totalPrice & qty
      state.qty = state.qty + 1;
      state.totalPrice = state.totalPrice + newProduct.price;
    },
    removeProduct: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.product.find(
        (prod) => prod.id === newProduct.id
      );
      if (existingProduct.qty > 1) {
        existingProduct.qty = existingProduct.qty - 1;
        existingProduct.price = existingProduct.price - newProduct.price;
        state.qty = state.qty - 1;
        state.totalPrice = state.totalPrice - newProduct.price;
      } else {
        state.product.filter((product) => product.id !== newProduct.id);
      }
    },
  },
});
export const productAction = prooductSlice.actions;
export default prooductSlice.reducer;
