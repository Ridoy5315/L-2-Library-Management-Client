import bannerPhoto from "../../assets/banner1.avif";
import { Typewriter } from "react-simple-typewriter";

export default function Banner() {
  return (
    <div className="overflow-hidden w-full relative ">
      <div>
        <img
          className="w-full lg:max-h-screen h-auto"
          src={bannerPhoto}
          alt=""
        />
      </div>
      <div className="absolute z-10 text-gray-300  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="lg:text-5xl md:text-3xl text-lg text-center lg:leading-snug leading-normal font-medium whitespace-nowrap">
          <span className="">Turn the Page on </span>
          <span className="text-[#59b6e8] lg:text-6xl md:text-4xl text-xl">
            Book Manager
          </span>
        </h1>

        <div className="flex gap-2 overflow-hidden justify-center lg:mt-8 md:mt-6 mt-2 lg:text-4xl md:text-xl text-xs">
          <h1 className="text-[#59b6e8]">
            <Typewriter
              words={["Track", "Borrow", "Return"]}
              loop={false}
              cursor
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1000}
            ></Typewriter>
            <span className="text-gray-300">– All in One Place</span>
          </h1>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/65 to-black/45"></div>
    </div>
  );
}
