import Image from "next/image";
import coverImg from "../assets/images/Home_bg.png";
import coverImg1 from "../assets/images/pattern_bg.png";
import food from "../assets/images/food.jpg";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

const navigateCarousel = (e, direction) => {
  let carousel = e.currentTarget.parentNode.querySelector(".carousel");
  let activeItem = parseInt(carousel.dataset.current);
  if (direction === "right") {
    if (activeItem !== carousel.children.length - 1) {
      // Check if active item is currently the last

      carousel.children[activeItem].classList.add("z-50", "origin-left");
      carousel.children[activeItem + 1].classList.remove(
        "delay-300",
        "scale-x-0"
      );
      carousel.children[activeItem].classList.add("scale-x-0", "delay-300");
      carousel.dataset.current = `${activeItem + 1}`;
    }
  } else {
    if (activeItem) {
      // Checks if activeItem isn't the first element i.e activeItem:0
      carousel.children[activeItem].classList.add("z-50", "origin-right");
      carousel.children[activeItem - 1].classList.remove(
        "delay-300",
        "scale-x-0"
      );
      carousel.children[activeItem].classList.add("scale-x-0", "delay-300");
      carousel.dataset.current = `${activeItem - 1}`;
    }
  }
};

export default function Carousel() {
  return (
    <section className="bg-none h-[60vh] py-5 w-full relative overflow-hidden flex p-4 bg-gray-100 ">
      <button
        onClick={(e) => {
          navigateCarousel(e, "left");
        }}
        className="absolute top-1/2 left-0 z-[100] mx-2 p-4 rounded-3xl text-dark-default hover:bg-gray-500/50 hover:text-white transition duration-150"
      >
        <MdOutlineArrowBackIos />
      </button>{" "}
      <button
        onClick={(e) => {
          navigateCarousel(e, "right");
        }}
        className="absolute top-1/2 right-0 z-[100]  mx-2 p-4 rounded-3xl text-dark-default hover:bg-gray-500/50 hover:text-white transition duration-150"
      >
        <MdOutlineArrowForwardIos />
      </button>
      <div className="flex absolute bottom-2 inset-x-0">
        <div className="mx-auto flex gap-2">
          <div className="h-2 w-2 rounded-xl bg-black"></div>
          <div className="h-2 w-2 rounded-xl bg-black"></div>
        </div>
      </div>
      <div className="absolute flex inset-0 mx-auto carousel" data-current="0">
        <Image
          src={coverImg}
          className="h-full w-auto absolute inset-0 py-5  object-contain shrink-0 mx-auto transition-transform duration-300"
        />
        <Image
          src={coverImg1}
          className="h-full w-auto absolute inset-0  py-5  object-contain shrink-0 mx-auto transition-transform duration-300 scale-x-0"
        />
        <Image
          src={food}
          className="h-full w-auto absolute inset-0  py-5  object-contain shrink-0 mx-auto transition-transform duration-300 scale-x-0"
        />
      </div>
    </section>
  );
}
