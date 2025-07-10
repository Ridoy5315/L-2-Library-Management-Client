export interface BorrowedBook {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
}

export interface GetBorrowedBooksResponse {
  borrowedBooks: BorrowedBook[];
  // ...other properties if any
}
