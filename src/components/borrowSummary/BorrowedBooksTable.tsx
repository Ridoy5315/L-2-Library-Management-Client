import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Borrow = {
  book: {
     title: string;
     isbn: string;
  };
  totalQuantity: number;
};

interface BorrowedBooksTableProps {
  borrowedBooks: Borrow[];
  isLoading: boolean;
}
export default function BorrowedBooksTable({borrowedBooks, isLoading} :  BorrowedBooksTableProps) {
     console.log(borrowedBooks)
  return (
    <Table>
      <TableCaption>A list of books that have been borrowed</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-16 text-center">No.</TableHead>
          <TableHead className="w-64 text-center">Title</TableHead>
          <TableHead className="w-36 text-center">ISBN</TableHead>
          <TableHead className="w-20 text-center">Total Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading && borrowedBooks.map((borrowedBook, index) => (
          <TableRow key={index}>
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-center">{borrowedBook.book.title}</TableCell>
            <TableCell className="text-center">{borrowedBook.book.isbn}</TableCell>
            <TableCell className="text-center">{borrowedBook.totalQuantity}</TableCell>
            {/* <TableCell className="text-right">{book.totalAmount}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
