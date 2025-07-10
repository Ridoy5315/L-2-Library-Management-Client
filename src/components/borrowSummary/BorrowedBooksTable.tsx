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
      <TableHeader>
        <TableRow className="text-xs lg:text-base md:text-sm bg-gray-100">
          <TableHead className=" text-center">No.</TableHead>
          <TableHead className=" text-center">Title</TableHead>
          <TableHead className=" text-center">ISBN</TableHead>
          <TableHead className="text-right lg:pr-28 md:pr-20 ">Total Quantity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading && borrowedBooks.map((borrowedBook, index) => (
          <TableRow key={index} className="text-xs lg:text-sm md:text-sm even:bg-[#e9f2f7] hover:bg-[#d8f0fd]">
            <TableCell className="text-center">{index + 1}</TableCell>
            <TableCell className="text-center">{borrowedBook.book.title}</TableCell>
            <TableCell className="text-center">{borrowedBook.book.isbn}</TableCell>
            <TableCell className="text-right lg:pr-36 md:pr-28 pr-10">{borrowedBook.totalQuantity}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
