import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import getbaseUrl from "../../../utils/baseUrl";

// Async thunks for cart operations
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { items: [] };

      const response = await fetch(`${getbaseUrl()}/api/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "auth-token": token,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cart fetch error:", errorData);
        throw new Error(errorData.message || "Failed to fetch cart");
      }

      const data = await response.json();
      console.log("Cart fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Cart fetch exception:", error);
      return rejectWithValue(error.message);
    }
  }
);

export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (cartItems, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        return { items: [] };
      }

      // Ensure cartItems is an array
      if (!Array.isArray(cartItems)) {
        console.error("Invalid cartItems format:", cartItems);
        return rejectWithValue("Invalid cart items format");
      }

      const response = await fetch(`${getbaseUrl()}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "auth-token": token,
        },
        body: JSON.stringify({ items: cartItems }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cart sync error:", errorData);
        throw new Error(errorData.message || "Failed to sync cart");
      }

      const data = await response.json();
      console.log("Cart sync successful:", data);
      return data;
    } catch (error) {
      console.error("Cart sync exception:", error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
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
        const newItem = {
          ...action.payload,
          quantity: 1,
          newPrice: action.payload.newPrice || action.payload.price,
        };
        state.cartItems.push(newItem);
        toast.success("Added To Cart");

        // We'll handle the sync in the component
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      toast.error("Removed From Cart");
      
      // Sync with backend after removal
      const token = localStorage.getItem("token");
      if (token) {
        const updatedCartItems = state.cartItems;
        // We need to dispatch the syncCart action, but we can't do it directly in a reducer
        // Instead, we'll set a flag to indicate that sync is needed
        state.needsSync = true;
      }
    },
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
    clearCart: (state) => {
      state.cartItems = [];
    },
    initializeCartFromBackend: (state, action) => {
      if (action.payload && action.payload.items) {
        state.cartItems = action.payload.items;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        if (
          action.payload &&
          action.payload.items &&
          action.payload.items.length > 0
        ) {
          console.log("Setting cart items from backend:", action.payload.items);
          state.cartItems = action.payload.items;
        }
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(syncCart.fulfilled, (state, action) => {
        if (action.payload && action.payload.items) {
          console.log("Cart synced successfully:", action.payload.items);
        }
      })
      .addCase(syncCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateQuantity,
  initializeCartFromBackend,
} = cartSlice.actions;
export default cartSlice.reducer;
