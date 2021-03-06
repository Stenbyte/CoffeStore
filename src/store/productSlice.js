import { createSlice } from "@reduxjs/toolkit";
import { uiAction } from "./uiSlice";
const initialState = {
  product: [],
  qty: 0,
  totalPrice: 0,
  QtyError: false,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    closeErr: (state) => {
      state.QtyError = !state.QtyError;
    },
    replaceCart: (state, action) => {
      state.product = action.payload.product;
      state.qty = action.payload.qty;
      state.totalPrice = action.payload.totalPrice;
    },
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
          totalPrice: newProduct.price,
          Quantity: newProduct.Quantity,
        });
      } else {
        if (existingProduct?.Quantity <= existingProduct?.qty) {
          state.QtyError = true;
          return;
        }
        // Updating existind product
        existingProduct.qty = existingProduct?.qty + 1;
        existingProduct.totalPrice =
          existingProduct?.totalPrice + existingProduct?.price;
      }
      // Updating totalPrice & qty
      state.QtyError = false;
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
      state.QtyError = false;
      state.totalPrice = state.totalPrice - existingProduct.price;
    },
  },
});

// Sendind productdata to firebase
export const sendProductData = (data) => {
  return async (dispatch) => {
    dispatch(
      uiAction.errorNot({
        status: "ok",
        message: "",
      })
    );
    const sendData = async () => {
      const response = await fetch(
        "https://coffeestore-2ff4a-default-rtdb.europe-west1.firebasedatabase.app/data.json",
        {
          method: "PUT",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        // If response not ok
        dispatch(
          uiAction.errorNot({
            status: response.status,
            message: response.statusText,
          })
        );
      }
    };
    try {
      await sendData();
    } catch (err) {
      // Handling errors
      dispatch(
        uiAction.errorNot({
          status: "",
          message: err.message,
        })
      );
    }
  };
};

// Fetching data
export const fetchProductData = () => {
  return async (dispatch) => {
    dispatch(
      uiAction.errorNot({
        status: null,
        message: null,
      })
    );
    const fetchData = async () => {
      const response = await fetch(
        "https://coffeestore-2ff4a-default-rtdb.europe-west1.firebasedatabase.app/data.json"
      );

      if (!response.ok) {
        // If response not ok
        dispatch(
          uiAction.errorNot({
            status: response.status,
            message: response.statusText,
          })
        );
      }
      const productData = await response.json();
      return productData;
    };
    try {
      const Data = await fetchData();
      dispatch(
        productAction.replaceCart({
          product: Data.product || [],
          qty: Data.qty,
          totalPrice: Data.totalPrice,
        })
      );
    } catch (err) {
      // Handling errors
      dispatch(
        uiAction.errorNot({
          status: "",
          message: err.message,
        })
      );
    }
  };
};

export const productAction = productSlice.actions;
export default productSlice.reducer;
