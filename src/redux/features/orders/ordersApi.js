import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getbaseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getbaseUrl()}/api/orders`,
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

const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // Fetch User Orders
    fetchUserOrders: builder.query({
      query: () => "/my-orders",
      providesTags: ["Orders"],
    }),
    
    // Create Order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useFetchUserOrdersQuery,
  useCreateOrderMutation,
} = ordersApi;
export default ordersApi;