import { useGetBorrowedBooksQuery } from "@/redux/api/baseApi"
import BorrowedBooksTable from "../../components/borrowSummary/BorrowedBooksTable"

export default function BorrowSummary() {
   const {data : borrowedBooks, isLoading} = useGetBorrowedBooksQuery(undefined)
   
   if(isLoading) {
    return <p>Loading...</p>
  }

  
    return (
      <div className="w-11/12 mx-auto">
        <BorrowedBooksTable borrowedBooks={borrowedBooks.data} isLoading={isLoading}></BorrowedBooksTable>
      </div>
    )
}
