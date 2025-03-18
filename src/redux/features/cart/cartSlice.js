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
        state.cartItems.push(action.payload);
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

    // Clear the cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Export the actions
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
