import { IoImages } from "react-icons/io5";
import template from "../../assets/images/landscape.jpg";

export default function MasonryItem({ images }) {
  if (images.length > 2) {
    return (
      <div className=" shrink-0 last:grow relative">
        <div className="absolute w-full inset-0 flex items-end">
          <div className="w-full p-2  bg-dark-default/10">
            <IoImages className="w-4 text-white h-auto" />
          </div>
        </div>
        <img alt="item" src={images[0]} className="object-cover h-full" />
      </div>
    );
  }
  return (
    <div className=" shrink-0 last:grow">
      <img alt="item" src={images[0]} className="object-cover h-full" />
    </div>
  );
}
