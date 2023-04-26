import Image from "next/image";
import coverImg from "../assets/images/Home_bg.png";
import coverImg1 from "../assets/images/pattern_bg.png";
import food from "../assets/images/food.jpg";
import landscape from "../assets/images/landscape.jpg";
import potrait from "../assets/images/2.png";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
  MdSave,
  MdSaveAlt,
} from "react-icons/md";

import { useState } from "react";

export default function Carousel() {
  const [activeCarousel, setActiveCarousel] = useState();

  const navigateCarousel = (e, direction) => {
    let carousel = e.currentTarget.parentNode.querySelector(".carousel");
    let activeItem = parseInt(carousel.dataset.current);
    if (direction === "right") {
      if (activeItem !== carousel.children.length - 1) {
        // Check if active item is currently the last

        carousel.children[activeItem].classList.add("z-50", "origin-left");
        carousel.children[activeItem + 1].classList.remove(
          "scale-0",
          "opacity-0",
          "origin-right"
        );
        carousel.children[activeItem].classList.add("scale-0");
        carousel.children[activeItem + 1].classList.remove("opacity-0");
        carousel.dataset.current = `${activeItem + 1}`;
      }
    } else {
      if (activeItem) {
        // Checks if activeItem isn't the first element i.e activeItem:0
        carousel.children[activeItem].classList.add("z-50", "origin-right");
        carousel.children[activeItem - 1].classList.remove(
          "scale-0",
          "opacity-0",
          "origin-left"
        );
        carousel.children[activeItem].classList.add("scale-0");
        carousel.children[activeItem - 1].classList.remove("opacity-0");

        carousel.dataset.current = `${activeItem - 1}`;
      }
    }
  };

  return (
    <section className="bg-none h-[60vh] py-5 w-full relative overflow-hidden flex p-4 bg-gray-100 ">
      <button
        onClick={(e) => {
          navigateCarousel(e, "left");
        }}
        className="absolute top-1/2 left-0 z-[51] mx-2 p-4 rounded-3xl text-dark-default hover:bg-gray-500/50 hover:text-white transition duration-150"
      >
        <MdOutlineArrowBackIos />
      </button>{" "}
      <button
        onClick={(e) => {
          navigateCarousel(e, "right");
        }}
        className="absolute top-1/2 right-0 z-[52]  mx-2 p-4 rounded-3xl text-dark-default hover:bg-gray-500/50 hover:text-white transition duration-150"
      >
        <MdOutlineArrowForwardIos />
      </button>
      <div className="absolute flex inset-0 mx-auto carousel" data-current="0">
        <Image
          src={potrait}
          data-active="true"
          className="object-contain h-full w-auto absolute inset-0 py-10  shrink-0 mx-auto transition-transform duration-500"
        />
        <Image
          src={coverImg1}
          className="h-full w-auto absolute inset-0  py-10  object-contain shrink-0 mx-auto transition-transform duration-500 scale-0"
        />
        <Image
          src={food}
          className="h-full w-auto absolute inset-0  py-10 object-contain shrink-0 mx-auto transition-transform duration-500 scale-0"
        />
        <Image
          src={landscape}
          className="h-full w-auto absolute inset-0  py-10 object-contain shrink-0 mx-auto transition-transform duration-500 scale-0"
        />
      </div>
      <div className="flex self-end w-full bottom-10 sm:bottom-4 inset-x-0">
        <div className="mx-auto flex gap-2">
          <div className="h-2 w-2 rounded-xl bg-black"></div>
          <div className="h-2 w-2 rounded-xl bg-black"></div>
          <div className="h-2 w-2 rounded-xl bg-black"></div>
        </div>
      </div>
    </section>
  );
}