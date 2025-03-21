import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getbaseUrl from "../../../utils/baseUrl";

const baseQuery = fetchBaseQuery({
  baseUrl: `${getbaseUrl()}/api/books`,
  credentials: "include",
  prepareHeaders: (Headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      Headers.set("Authorization", `Bearer ${token}`);
    }
    return Headers;
  },
});

const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery,
  tagTypes: ["Books"],
  endpoints: (builder) => ({
    // Fetch All Books
    fetchAllBooks: builder.query({
      query: () => "/",
      providesTags: ["Books"],
    }),

    // Fetch Book By Id
    fetchBookById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (results, error, id) => [{ type: "Books", id }],
    }),

    // Add Book
    addBook: builder.mutation({
      query: (newBook) => ({
        url: "/addbook",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),

    // Update Book
    updateBook: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/edit/${id}`,
        method: "PUT",
        body: rest,
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Books"],
    }),

    // Delete Book
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
  }),
});

export const {
  useFetchAllBooksQuery,
  useFetchBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;
export default booksApi;
