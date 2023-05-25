import { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function FormCarousel({ images }) {
  const dispatch = useDispatch();
  const [activeCarousel, setActiveCarousel] = useState(1);
  const CONTENT_LENGTH = images.length;

  const navigateCarousel = (direction) => {
    let carousel = document.querySelector("#carousel");
    let width = carousel.getBoundingClientRect().width;
    width = direction === "right" ? width : -width;
    carousel.scrollBy({
      left: width,
      top: 0,
      behavior: "instant",
    });
    if (direction === "right") {
      if (activeCarousel < CONTENT_LENGTH) {
        setActiveCarousel(activeCarousel + 1);
      }
    } else {
      if (activeCarousel > 1) {
        setActiveCarousel(activeCarousel - 1);
      }
    }
  };

  if (CONTENT_LENGTH === 0) {
    return (
      <section className="bg-none  py-5 w-full relative overflow-hidden flex p-4 bg-gray-100 min-h-[60%]"></section>
    );
  }

  return (
    <>
      <section className="bg-none py-5 w-full relative overflow-hidden flex bg-gray-100 min-h-[60%]">
        <button
          type="button"
          onClick={(e) => {
            navigateCarousel(e, "left");
          }}
          className="absolute border border-gray-200 bg-primary-default/10 top-1/2 left-0 z-[50] mx-2 p-4 rounded-full text-dark-default hover:bg-gray-500/50 hover:text-white transition duration-150"
        >
          <IoChevronBack className="text-xl" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            navigateCarousel("right");
          }}
          className="absolute border border-gray-200 top-1/2 right-0 z-[50]  mx-2 p-4 rounded-full text-dark-default hover:bg-gray-500/50 hover:text-white transition duration-150"
        >
          <IoChevronForward className="text-xl" />
        </button>
        <div
          id="carousel"
          className="absolute inset-0 flex mx-auto carousel overflow-x-scroll no-scrollBar"
          data-current="0"
        >
          {images.map((val, idx) => {
            return (
              <img
                alt={`postPreview${idx}`}
                src={val}
                key={idx}
                className="h-auto my-auto w-full 
                mx-auto transition-transform duration-500 object-contain"
              />
            );
          })}
        </div>
      </section>
      <div className="flex flex-col justify-center gap-4 items-center self-end w-full bottom-10 sm:bottom-4 inset-x-0 mt-4">
        <div className="mx-auto flex gap-2">
          {images.map((val, idx) => {
            return (
              <div
                className={`h-2 w-2 rounded-xl ${
                  activeCarousel === idx + 1
                    ? " bg-primary-default/50"
                    : " bg-dark-default/50"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    </>
  );
}
