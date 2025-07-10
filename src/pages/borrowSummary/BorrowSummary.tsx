import { useGetBorrowedBooksQuery } from "@/redux/api/baseApi"
import BorrowedBooksTable from "../../components/borrowSummary/BorrowedBooksTable"
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner"

export default function BorrowSummary() {
   const {data : borrowedBooks, isLoading} = useGetBorrowedBooksQuery(undefined)

   if(isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }

  
    return (
      <div className="w-11/12 mx-auto">
        <div className="lg:w-6/12 md:w-7/12 w-9/12 mx-auto text-center lg:space-y-2 md:space-y-2 mb-8 lg:mt-16 md:mt-10 mt-8">
          <h3 className='lg:text-4xl md:text-3xl text-2xl text-gray-400 font-semibold'>Borrowed Books Overview</h3>
          <p className='text-[#59b6e8] lg:font-bold md:font-bold font-medium uppercase lg:text-base md:text-sm text-xs'>-- Keep track of borrowed items, quantities --</p>
        </div>
        <BorrowedBooksTable borrowedBooks={borrowedBooks?.borrowedBooks || []} isLoading={isLoading}></BorrowedBooksTable>
      </div>
    )
}
