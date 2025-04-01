import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import getbaseUrl from "../../../utils/baseUrl";

// Async thunks for cart operations
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { items: [] };

      // Check if we already have cart items to avoid unnecessary fetches
      const { cart } = getState();
      if (cart.cartItems.length > 0 && !cart.needsSync) {
        return { items: cart.cartItems };
      }

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
      return data;
    } catch (error) {
      console.error("Cart fetch exception:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Optimize the syncCart function with debouncing
let syncTimeout = null;
export const syncCart = createAsyncThunk(
  "cart/syncCart",
  async (cartItems, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { items: cartItems };

      // Clear any existing timeout
      if (syncTimeout) {
        clearTimeout(syncTimeout);
      }

      // Set new timeout to debounce API calls
      return new Promise((resolve) => {
        syncTimeout = setTimeout(async () => {
          try {
            const response = await fetch(`${getbaseUrl()}/api/cart`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ items: cartItems }),
              credentials: "include",
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error("Cart sync error response:", errorData);
              throw new Error(errorData.message || "Failed to sync cart");
            }

            const data = await response.json();
            resolve(data);
          } catch (error) {
            console.error("Cart sync exception:", error);
            resolve(rejectWithValue(error.message));
          }
        }, 500);
      });
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
      const { _id } = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }

      // Mark that we need to sync
      state.needsSync = true;

      console.log("Cart after adding item:", state.cartItems);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      toast.error("Removed From Cart");

      // Sync with backend after removal
      const token = localStorage.getItem("token");
      if (token) {
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
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
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
          // Replace the entire cart with the server response
          state.cartItems = action.payload.items;
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
  updateQuantity,
  clearCart,
  setCartItems,
  initializeCartFromBackend,
} = cartSlice.actions;
export default cartSlice.reducer;
