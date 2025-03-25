import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getbaseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getbaseUrl()}/api/cart`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
      Headers.set("auth-token", token);
    }
    return Headers;
  },
});

const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // Fetch User Cart
    fetchUserCart: builder.query({
      query: () => "/",
      providesTags: ["Cart"],
    }),
    
    // Update Cart
    updateCart: builder.mutation({
      query: (cartData) => ({
        url: "/",
        method: "POST",
        body: cartData,
      }),
      invalidatesTags: ["Cart"],
    }),
    
    // Clear Cart
    clearCart: builder.mutation({
      query: () => ({
        url: "/",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useFetchUserCartQuery,
  useUpdateCartMutation,
  useClearCartMutation,
} = cartApi;
export default cartApi;


