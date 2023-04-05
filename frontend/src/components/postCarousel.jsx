import Image from "next/image";
import coverImg from "../assets/images/Home_bg.png";
import coverImg1 from "../assets/images/pattern_bg.png";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export default function Carousel() {
  return (
    <section className="bg-none h-[576px] w-full relative overflow-hidden">
      <button className="absolute z-20 bg-none border-0 text-3xl top-1/2 right-0 -translate-y-1/2">
        <MdOutlineArrowForwardIos />
      </button>
      <button
        onClick={() => {
          let cr = document.getElementById("carousel");
          let width = cr.dataset;

          cr.scroll({
            top: 0,
            left: width / 4,
          });
        }}
        className="absolute z-20 bg-none border-0 text-3xl top-1/2 -translate-y-1/2"
      >
        <MdOutlineArrowBackIos />
      </button>
      <ul
        id="carousel"
        className="absolute transition overflow-scroll duration-500 ease-in-out list-none flex gap-4 h-full "
      >
        <li className="shrink-0 w-full ">
          <Image
            src={coverImg}
            className="w-auto object-cover h-full mx-auto"
            alt="first_img"
          />
        </li>
        <li className="shrink-0">
          <Image src={coverImg1} className="w-auto h-full" alt="second_img" />
        </li>
      </ul>
    </section>
  );
}
