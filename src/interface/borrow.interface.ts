export interface BorrowedBook {
     // Add properties as per your BorrowedBook model
     id: string;
     bookId: string;
     userId: string;
     borrowedDate: string;
     // ...other properties
}

export interface GetBorrowedBooksResponse {
     borrowedBooks: BorrowedBook[];
     // ...other properties if any
}