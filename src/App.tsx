import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/shared/navbar/Navbar";
import Footer from "./components/shared/footer/Footer";
import Banner from "./components/banner/Banner";

function App() {
  const location = useLocation();
  const noBanner = location.pathname.includes('/borrow-Summary')
  return (
    <>
      <section className="w-full py-2 fixed z-10 bg-gray-100 bg-opacity-85 left-0 right-0 shadow-lg">
        <Navbar></Navbar>
      </section>
      {!noBanner && (
        <section className="w-full">
          <Banner></Banner>
        </section>
      )}
      <section className="pt-20 lg:pb-24 md:pb-20 pb-16">
        <Outlet></Outlet>
      </section>
      <section className="bg-gray-50 bg-opacity-85">
        <Footer></Footer>
      </section>
    </>
  );
}

export default App;
