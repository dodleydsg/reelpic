import { debounce } from "lodash";
import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function FormCarousel({ images }) {
  const dispatch = useDispatch();
  const [activeCarousel, setActiveCarousel] = useState(0);
  const CONTENT_LENGTH = images.length;

  const carouselRef = useRef();

  const checkNavigation = () => {};

  let touchstartX = 0;
  let touchendX = 0;
  // debounce(swipe, 250);

  const swipe = (e) => {
    // console.log(e.changedTouches);
    if (e.type === "touchstart") {
      touchstartX = e.changedTouches[0].screenX;
    }
    if (e.type === "touchend") {
      touchendX = e.changedTouches[0].screenX;
      checkDirection();
    }
    function checkDirection() {
      if (touchendX > touchstartX) {
        navigateCarousel("left");
      }
      if (touchendX < touchstartX) {
        navigateCarousel("right");
      }
      touchendX = 0;
      touchstartX = 0;
    }
  };

  const navigateCarousel = (direction) => {
    const carousel = carouselRef.current;
    if (direction === "left") {
      if (activeCarousel > 0) {
        carousel.style.translate = `-${activeCarousel * 100 - 100}% 0`;
        setActiveCarousel(activeCarousel - 1);
        // console.log("Did it left");
      }
    } else if (direction === "right") {
      if (activeCarousel < CONTENT_LENGTH - 1) {
        carousel.style.translate = `-${100 + activeCarousel * 100}% 0`;
        setActiveCarousel(activeCarousel + 1);
        // console.log("Did it right");
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
            navigateCarousel("left");
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
          onTouchStart={(e) => swipe(e)}
          onTouchEnd={(e) => swipe(e)}
          id="carousel"
          ref={carouselRef}
          className="absolute transition-all ease-in-out duration-300 translate-x-0 inset-0 flex mx-auto carousel overflow-x-visible no-scrollBar"
          data-current="0"
        >
          {images.map((val, idx) => {
            return (
              <div className="min-w-full h-auto inline-flex">
                <Image
                  key={val}
                  alt={`postPreview${idx}`}
                  width={1200}
                  height={800}
                  unoptimized={true}
                  loader={({ src, height, width }) => src}
                  src={val}
                  className="max-h-full my-auto w-auto mx-auto duration-150"
                />
              </div>
            );
          })}
        </div>
      </section>
      <div className="flex flex-col justify-center gap-4 items-center self-end w-full bottom-10 sm:bottom-4 inset-x-0 mt-4">
        <div className="mx-auto flex gap-2">
          {images.map((val, idx) => {
            return (
              <div
                key={idx}
                className={`h-2 w-2 rounded-xl ${
                  activeCarousel === idx
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
