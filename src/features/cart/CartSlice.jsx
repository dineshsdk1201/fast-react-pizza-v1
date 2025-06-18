import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload: newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      console.log(action.payload);
      //payload: pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;

      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      console.log(item);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    deleteCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  deleteCart,
} = CartSlice.actions;
export default CartSlice.reducer;
