import { Link } from "react-router-dom";
import logo from "../../../assets/logo3-removebg-preview.png";
import AddBooks from "@/pages/addBooks/AddBooks";

export default function Navbar() {
  return (
    <nav className="w-11/12 mx-auto flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="lg:w-20 md:w-16 w-20">
          <img src={logo} alt="" />
        </div>
        <h3 className="text-[#59b6e8] font-bold text-2xl">Book Manager</h3>
      </div>
      <div className="flex gap-4">
        <Link className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md">All Books</Link>
        <AddBooks></AddBooks>
        <Link className="hover:bg-[#d8f0fd] border-2 border-transparent hover:border-[#389acf] transition-all text-[#389acf] font-semibold py-1 px-3 rounded-md">Borrow Summary</Link>
      </div>
    </nav>
  );
}
