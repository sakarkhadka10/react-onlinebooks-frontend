import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item._id === action.payload._id
      );
      if (!existingItem) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          newPrice: action.payload.newPrice || action.payload.price,
        });
        toast.success("Added To Cart");
      }
    },

    // Remove an item from the cart
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      toast.error("Removed From Cart");
    },

    // Update quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item._id === id);
      if (item) {
        item.quantity = quantity;
        const price = item.price;
        const discount = item.discount || 0;
        const singleItemPrice = price - (price * discount) / 100;
        item.newPrice = singleItemPrice * quantity;
      }
    },

    // Clear the cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart, updateQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
