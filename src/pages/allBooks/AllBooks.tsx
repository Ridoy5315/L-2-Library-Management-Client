import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import AllBooksTable from "../../components/allBooks/AllBooksTable";
import AllBooksTableController from "@/components/allBooks/AllBooksTableController";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";
import LoadingSpinner from "@/components/loadingSpinner/LoadingSpinner";

export default function AllBooks() {

  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state: RootState) => state.book.currentPage);
  const { data, isLoading } = useGetAllBooksQuery( currentPage );

  const total = data?.data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="w-11/12 mx-auto">
      {isLoading ? <LoadingSpinner></LoadingSpinner> : (
        <>
        <div className="lg:w-6/12 md:w-7/12 w-9/12 mx-auto text-center lg:space-y-2 md:space-y-2 mb-8">
          <h3 className='lg:text-4xl md:text-3xl text-2xl text-gray-400 font-semibold'>Find Your Next Read</h3>
          <p className='text-[#59b6e8] lg:font-bold md:font-bold font-medium uppercase lg:text-base md:text-sm text-xs'>-- Dive into the full list of available books --</p>
        </div>
          <AllBooksTable
            books={data?.books ?? []}
            isLoading={isLoading}
            currentPage={currentPage}
          ></AllBooksTable>
          <div className="f">
            <AllBooksTableController
            totalPages={totalPages}
            dispatch={dispatch}
            currentPage={currentPage}
            isLoading={isLoading}
          ></AllBooksTableController>
          </div>
        </>
      )}
    </div>
  );
}
