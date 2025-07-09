import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import AddBooks from "@/pages/addBooks/AddBooks";
import { Link } from "react-router-dom";

export default function MobileMenu({ open }) {
  return (
    //     <div
    //       className={`${
    //         open ? "flex" : "hidden"
    //       } absolute top-16 left-0 w-full bg-white shadow-lg flex-col items-center gap-4 py-4 lg:hidden`}
    //     >
    //       <Link
    //         to="/"
    //         className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md"
    //       >
    //         All Books
    //       </Link>
    //       <AddBooks></AddBooks>
    //       <Link
    //         to="/borrow-Summary"
    //         className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md"
    //       >
    //         Borrow Summary
    //       </Link>
    //     </div>
    <div
      className={`${
        open ? "flex" : "hidden"
      } absolute top-16 left-0 w-full bg-white shadow-lg flex-col items-center gap-4 py-4 lg:hidden`}
    >
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link>Components</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link>Documentation</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link>Blocks</Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
