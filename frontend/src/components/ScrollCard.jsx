import FireAndIce from "../assets/images/fire_and_ice.png";
import Image from "next/image";
export default function ScrollCard() {
  return (
    <div className="relative hover:scale-105 transition-transform duration-200">
      <Image src={FireAndIce} height={90} width={150} className="relative" />
      <div className="absolute inset-y-0 inset-x-0 bg-gradient-to-t from-black/80 to-black/30 flex flex-col items-center justify-end rounded-lg text-light-default font-light text-sm">
        <p className="text-body block">Fire and Ice</p>
        <p className="text-body block">@laurafisher</p>
      </div>
    </div>
  );
}
