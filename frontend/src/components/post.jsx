import React from "react";
import Carousel from "./postCarousel";
import profile1 from "../assets/images/profile1.png";
import {
  MdComment,
  MdIosShare,
  MdLink,
  MdMoreVert,
  MdOutlineHeartBroken,
  MdSend,
  MdShare,
  MdThumbUp,
  MdThumbUpAlt,
} from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { IoHeart } from "react-icons/io5";

export default function Post() {
  return (
    <div>
      <div className="flex justify-between items-center border border-gray-100 p-2">
        <div className="flex gap-2 items-center relative">
          <Image src={profile1} className="h-10 w-10" />
          <Link href="/a" className="text-label">
            @majorlazer
          </Link>
          <Link href="/as" className="text-primary-default text-sm">
            Follow
          </Link>
        </div>
        <MdLink className="h-18 w-auto pr-4" />
      </div>
      <Carousel />
      <div className="border-gray-100 p-2 space-y-2">
        <div className="flex gap-4 ">
          <div className="flex gap-2 items-center">
            <p>
              <IoHeart className="w-5 h-auto items-center" />
            </p>
            <p className="text-sm">403,120</p>
          </div>
          <div className="flex gap-2 items-center">
            <p>
              <MdComment className="w-5 h-auto" />
            </p>
            <p className="text-sm">1k</p>
          </div>
        </div>
        <p className="text-dark-default/70 text-sm font-light">4 hours ago</p>
        <p className="text-dark-default/90">
          After running expensive, computations for hundreds of hours, I present
          to you faces of the world powered by the latest algorithms in neural
          networks. Link in bio for complete list of images
        </p>
      </div>
    </div>
  );
}
