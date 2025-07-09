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
            <TableHead className=" text-center">No.</TableHead>
            <TableHead className=" text-center">Title</TableHead>
            <TableHead className=" text-center">Author</TableHead>
            <TableHead className=" text-center">Genre</TableHead>
            <TableHead className=" text-center">ISBN</TableHead>
            <TableHead className=" text-center">Copies</TableHead>
            <TableHead className=" text-center">Availability</TableHead>
            <TableHead className="text-right pr-20">Actions</TableHead>
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
                <TableCell className="">
                  <div className="flex gap-2 items-center justify-end">
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
