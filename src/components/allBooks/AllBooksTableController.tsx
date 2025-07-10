import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { goToPage, next, previous } from "@/redux/features/book/bookSlice";

import type { AppDispatch } from "@/redux/store";

interface AllBooksTableControllerProps {
  dispatch: AppDispatch;
  totalPages: number;
  currentPage: number;
  isLoading: boolean
}

export default function AllBooksTableController({ dispatch, totalPages, currentPage, isLoading }: AllBooksTableControllerProps) {

  return (
    isLoading ? (
      <p>Loading...</p>
    ) : (
      <Pagination className="justify-end mt-8 pr-8">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={currentPage === 1 ? undefined : () => dispatch(previous())}
              aria-disabled={currentPage === 1}
              className={currentPage === 1 ? "pointer-events-none opacity-50 lg:text-lg md:text-base text-sm" : "lg:text-lg md:text-base text-sm"}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                onClick={() => dispatch(goToPage(i + 1))}
                isActive={currentPage === i + 1}
                className="cursor-pointer lg:text-lg md:text-base text-xs"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext onClick={currentPage === totalPages ? undefined : () => dispatch(next())}
              aria-disabled={currentPage === totalPages}
              className={currentPage === totalPages ? "pointer-events-none opacity-50 lg:text-lg md:text-base text-sm" : "lg:text-lg md:text-base text-sm"} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  );
}
