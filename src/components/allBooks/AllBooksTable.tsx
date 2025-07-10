import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { MdDeleteOutline } from "react-icons/md";
import type { Book } from "@/interface/book.interface";
import { EditBook } from "../editBook/EditBook";
import { useDeleteBookMutation } from "@/redux/api/baseApi";
import Swal from "sweetalert2";
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

  interface DeleteBook {
    _id: string;
    title: string;
  }

  const handleDelete = async (book: DeleteBook): Promise<void> => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${book.title} book?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
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
          console.error("Delete failed:", error);
        }
      }
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100 lg:text-base md:text-sm text-xs">
            <TableHead className=" text-center ">No.</TableHead>
            <TableHead className=" text-center">Title</TableHead>
            <TableHead className=" text-center lg:table-cell md:table-cell hidden">
              Author
            </TableHead>
            <TableHead className=" text-center  lg:table-cell hidden">
              Genre
            </TableHead>
            <TableHead className=" text-center  lg:table-cell hidden">
              ISBN
            </TableHead>
            <TableHead className=" text-center lg:table-cell md:table-cell hidden">
              Copies
            </TableHead>
            <TableHead className=" text-center">Availability</TableHead>
            <TableHead className="text-right pr-20">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          {!isLoading &&
            books.map((book, index) => (
              <TableRow
                key={book._id}
                className="even:bg-[#e9f2f7] hover:bg-[#d8f0fd] lg:text-sm md:text-xs text-[10px]"
              >
                <TableCell className="text-center">
                  {(currentPage - 1) * 10 + index + 1}
                </TableCell>
                <TableCell className="text-center">{book.title}</TableCell>
                <TableCell className="text-center lg:table-cell md:table-cell hidden">
                  {book.author}
                </TableCell>
                <TableCell className="text-center  lg:table-cell hidden">
                  {book.genre}
                </TableCell>
                <TableCell className="text-center  lg:table-cell hidden">
                  {book.isbn}
                </TableCell>
                <TableCell className="text-center lg:table-cell md:table-cell hidden">
                  {book.copies}
                </TableCell>
                <TableCell className="text-center">
                  {book.available ? `Yes` : `No`}
                </TableCell>
                <TableCell className="pr-14">
                  <div className="flex lg:gap-4 md:gap-3 gap-2 items-center justify-end">
                    <div>
                      <BookDetails book={book}></BookDetails>
                    </div>
                    <div>
                      <EditBook book={book}></EditBook>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button onClick={() => handleDelete(book)}>
                          <MdDeleteOutline className="lg:text-2xl md:text-xl text-sm text-[#59b6e8]"></MdDeleteOutline>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete</p>
                      </TooltipContent>
                    </Tooltip>

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
