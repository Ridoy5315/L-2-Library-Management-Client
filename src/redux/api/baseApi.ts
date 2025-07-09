import type { GetAllBooksResponse } from "@/interface/book.interface";
import type { GetBorrowedBooksResponse } from "@/interface/borrow.interface";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["books", "borrows"],
  endpoints: (builder) => ({
    // Endpoints for books
    createBook: builder.mutation({
      query: (bookInfo) => ({
        url: "/books",
        method: "POST",
        body: bookInfo,
      }),
      invalidatesTags: ["books"],
    }),
    getAllBooks: builder.query<GetAllBooksResponse, number>({
      query: (page = 1) => `/books?page=${page}`,
      providesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: ({ id, updateBookInfo }) => ({
        url: `/books/edit-book/${id}`,
        method: "PATCH",
        body: updateBookInfo,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/delete-book/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["books"],
    }),
    createBorrowBook: builder.mutation({
      query: (borrowBookInfo) => ({
        url: "/borrow",
        method: "POST",
        body: borrowBookInfo,
      }),
      invalidatesTags: ["books", "borrows"],
    }),
    getBorrowedBooks: builder.query<GetBorrowedBooksResponse, void>({
      query: () => "/borrow-summary",
      providesTags: ["borrows"],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useGetBorrowedBooksQuery,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateBorrowBookMutation,
} = baseApi;
