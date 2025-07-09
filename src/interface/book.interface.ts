export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  copies: number;
  available?: boolean;
}

export interface GetAllBooksResponse {
  books: Book[];
  data: {
    total: number;
  };
}
