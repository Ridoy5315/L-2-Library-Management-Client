import App from "@/App";
import { createBrowserRouter } from "react-router-dom";
import AllBooks from "@/pages/allBooks/AllBooks"
import borrowSummary from "@/pages/borrowSummary/BorrowSummary"

const router = createBrowserRouter([
     {
          path: "/",
          Component: App,
          children: [
               {
                    index: true,
                    Component: AllBooks,
               },
               {
                    path: "allBooks",
                    Component: AllBooks,
               },
               {
                    path: "borrow-Summary",
                    Component: borrowSummary,
               },
          ]
     }
])

export default router;