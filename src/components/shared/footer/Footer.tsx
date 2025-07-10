import logo from "../../../assets/logo3-removebg-preview.png";
export default function Footer() {
     const currentYear = new Date().getFullYear();
  return (
    <div className="w-10/12 mx-auto pt-12 pb-6">
      <div className="grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 mb-10">
        <div className="flex items-center lg:gap-6 md:gap-3 hidden lg:block md:block">
          <div className="lg:w-28 md:w-20 w-16">
            <img src={logo} alt="" />
          </div>
          <h3 className="text-[#59b6e8] font-bold lg:text-2xl text-xl">Book Manager</h3>
        </div>
        <div className="ml-8">
          <h3 className="text-[#59b6e8] inline-block font-semibold lg:text-2xl md:text-xl text-lg border-b border-gray-300 pb-3">LINKS</h3>
          <ul className="list-none mt-3 space-y-2 lg:text-lg text-sm">
            <li className="text-gray-400">All Books</li>
            <li className="text-gray-400">Add Book</li>
            <li className="text-gray-400">Borrow Summary</li>
            <li className="text-gray-400">Event</li>
            <li className="text-gray-400">Store</li>
          </ul>
        </div>
        
        <div className="">
          <h3 className="text-[#59b6e8] inline-block font-semibold lg:text-2xl md:text-xl text-lg border-b border-gray-300 pb-3">GET IN TOUCH</h3>
          <div className="text-gray-400 space-y-4 mt-3 lg:text-lg text-sm">
               <p>China - 5/132 Guangfulin, Songjiang District, Shanghai City</p>
               <p className="border-b border-gray-300 inline-block pb-1">ridoy.st99@gmail.com</p>
               <p className="text-[#59b6e8]">+86 13120738728</p>
          </div>
        </div>
      </div>
      <div>
          <p className="text-gray-400 text-center lg:text-base text-xs">
            Copyright ©{currentYear} Book Manager. All rights reserved. <span className="text-gray-500">Developed by Md Mahbubul Islam Ridoy</span>
          </p>
        </div>
    </div>
  );
}
