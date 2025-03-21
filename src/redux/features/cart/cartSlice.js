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
        // Use the newPrice that was calculated in the component
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
          newPrice: action.payload.newPrice || action.payload.price
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
      const item = state.cartItems.find(item => item._id === id);
      if (item) {
        item.quantity = quantity;
        // Update newPrice based on quantity
        const price = parseFloat(item.price.replace("$", ""));
        const discount = item.discount || 0;
        const singlePrice = price - (price * discount / 100);
        item.newPrice = singlePrice * quantity;
      }
    },

    // Clear the cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Export the actions
export const { addToCart, removeFromCart, clearCart, updateQuantity } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;
