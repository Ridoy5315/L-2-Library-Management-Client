import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { MdDeleteOutline } from "react-icons/md";
import type { Book } from "@/interface/book.interface";
import { EditBook } from "../editBook/EditBook";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import Swal from 'sweetalert2'
import BorrowBook from "../borrowBook/BorrowBook";
import { BookDetails } from "../bookDetails/BookDetails";


interface AllBooksTableProps {
  books: Book[];
  isLoading: boolean;
  currentPage: number;
}

export default function AllBooksTable({
  books,
  isLoading,
  currentPage,
}: AllBooksTableProps) {
  
  const [deleteBook] = useDeleteBookMutation();

  interface DeleteBook  {
    _id: string;
    title: string;  
  }

  const handleDelete = async (book : DeleteBook): Promise<void> => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${book.title} book?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          await deleteBook(book._id).unwrap();
          Swal.fire({
          title: "Deleted!",
          text: `${book.title} book has been deleted.`,
          icon: "success",
        });
        } catch (error) {
          Swal.fire({
          title: "Oops...",
          text: `Deleting ${book.title} book failed.`,
          icon: "error",
        });
        console.error('Delete failed:', error);
        }
        
      }
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16 text-center">No.</TableHead>
            <TableHead className="w-64 text-center">Title</TableHead>
            <TableHead className="w-40 text-center">Author</TableHead>
            <TableHead className="w-36 text-center">Genre</TableHead>
            <TableHead className="w-36 text-center">ISBN</TableHead>
            <TableHead className="w-20 text-center">Copies</TableHead>
            <TableHead className="w-36 text-center">Availability</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isLoading &&
            books.map((book, index) => (
              <TableRow key={book._id}>
                <TableCell className="text-center">
                  {(currentPage - 1) * 10 + index + 1}
                </TableCell>
                <TableCell className="text-center">{book.title}</TableCell>
                <TableCell className="text-center">{book.author}</TableCell>
                <TableCell className="text-center">{book.genre}</TableCell>
                <TableCell className="text-center">{book.isbn}</TableCell>
                <TableCell className="text-center">{book.copies}</TableCell>
                <TableCell className="text-center">
                  {book.available ? `Yes` : `No`}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex gap-2">
                    <div>
                      <BookDetails book={book}></BookDetails>
                    </div>
                    <div>
                      <EditBook book={book}></EditBook>
                    </div>
                    <Button onClick={() => handleDelete(book)} variant="outline">
                      <MdDeleteOutline></MdDeleteOutline>
                    </Button>
                    <div>
                      <BorrowBook book={book}></BorrowBook>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
}
