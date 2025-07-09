import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import AllBooksTable from "../../components/allBooks/AllBooksTable";
import AllBooksTableController from "@/components/allBooks/AllBooksTableController";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import type { RootState } from "@/redux/store";

export default function AllBooks() {

  const dispatch = useAppDispatch()
  const currentPage = useAppSelector((state: RootState) => state.book.currentPage);
  const { data, isLoading } = useGetAllBooksQuery( currentPage );

  const total = data?.data?.total || 0;
  const totalPages = Math.ceil(total / 10);


  console.log(total, totalPages);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-11/12 mx-auto">
      {isLoading ? <p>Loading...</p> : (
        <>
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
