import FireAndIce from "../assets/images/pattern_bg.png";
import FireAndIce1 from "../assets/images/Home_bg.png";
import Image from "next/image";
import food from "../assets/images/food.jpg";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const scrollX = (direction) => {
  let scrollCard = document.getElementById("scrollCard");
  let width = window.innerWidth;
  width = direction === "left" ? -width / 2.5 : width / 2.5;
  scrollCard.scrollBy({
    top: 0,
    left: width,
    behavior: "smooth",
  });
};

export default function ScrollCard() {
  return (
    <section id="scrollContainer" className="relative">
      <button
        className="absolute inset-y-0  z-30 w-8 hidden sm:flex justify-center items-center hover:bg-black/70 transition
      duration-300 rounded-l-lg"
        onClick={() => scrollX("left")}
      >
        <MdArrowBackIos className="text-white" />
      </button>
      <button
        className="absolute inset-y-0 right-0 z-30 w-8 hidden sm:flex justify-center items-center hover:bg-black/70 transition
      duration-300 rounded-r-lg"
        onClick={() => scrollX("right")}
      >
        <MdArrowForwardIos className="text-white " />
      </button>

      <div
        id="scrollCard"
        className="relative flex h-24 sm:h-40 gap-4 overflow-x-scroll"
      >
        <div className="relative w-[135px] sm:w-[225px] shrink-0 hover:scale-95 transition duration-300">
          <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
          <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
            <p className="text-body">Fire and Ice</p>
          </div>
          <Image
            src={FireAndIce}
            className="h-full rounded-md w-auto mx-auto"
          />
        </div>

        <div className="relative w-[135px] sm:w-[225px]  inset-0 shrink-0 hover:scale-95 transition duration-300">
          <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
          <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
            <p className="text-body">Fire and Ice</p>
          </div>
          <Image
            src={FireAndIce1}
            className="h-full rounded-md w-auto mx-auto"
          />
        </div>
        <div className="relative w-[135px] sm:w-[225px] inset-0 shrink-0 hover:scale-95 transition duration-300">
          <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
          <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
            <p className="text-body">Food</p>
          </div>
          <Image src={food} className="h-full rounded-md w-auto mx-auto" />
        </div>
        <div className="relative w-[135px] sm:w-[225px] inset-0 shrink-0 hover:scale-95 transition duration-300">
          <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
          <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
            <p className="text-body">Fire and Ice</p>
          </div>
          <Image
            src={FireAndIce}
            className="h-full rounded-md w-auto mx-auto"
          />
        </div>
      </div>
    </section>
  );
}
