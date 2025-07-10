import { Link } from "react-router-dom";
import logo from "../../../assets/logo3-removebg-preview.png";
import AddBooks from "@/pages/addBooks/AddBooks";
import { FiMenu } from "react-icons/fi";
import { useState } from "react";
import { Command, CommandGroup, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [openAddBookModal, setOpenAddBookModal] = useState(false);
  return (
    <nav className="w-11/12 mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="lg:w-20 md:w-16 w-16">
          <img src={logo} alt="" />
        </div>
        <h3 className="text-[#59b6e8] font-bold text-2xl">Book Manager</h3>
      </div>
      <div className="flex gap-4 hidden lg:block md:block">
        <Link
          to="/"
          className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md"
        >
          All Books
        </Link>
        <AddBooks
        ></AddBooks>
        <Link
          to="/borrow-Summary"
          className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md"
        >
          Borrow Summary
        </Link>
      </div>

      {/* Responsive menu */}
      <div className="lg:hidden md:hidden block" onClick={() => setOpen(!open)}>
        <div>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FiMenu className="text-2xl"></FiMenu>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 border-none">
              <Command>
                <CommandList className="">
                  <CommandGroup className="bg-gray-100">
                    <ul className="flex flex-col gap-2 py-2 px-1 text-center text-sm">
                      <li>
                        <Link
                          to="/"
                          className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md"
                        >
                          All Books
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setOpen(false); // Close popover
                            setOpenAddBookModal(true); // Open dialog
                          }}
                          className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md w-full"
                        >
                          Add Book
                        </button>
                      </li>
                      <li>
                        <Link
                          to="/borrow-Summary"
                          className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md"
                        >
                          Borrow Summary
                        </Link>
                      </li>
                    </ul>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      {/* Add Book Modal */}
      <AddBooks
        openAddBookModal={openAddBookModal}
        setOpenAddBookModal={setOpenAddBookModal}
      />
    </nav>
  );
}
