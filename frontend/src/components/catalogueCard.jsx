import React from "react";
import food from "../assets/images/food.jpg";
import Image from "next/image";

export default function CatalogueCard() {
  return (
    <>
      <div className="relative inset-0 shrink-0 hover:scale-95 transition duration-300">
        <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
        <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
          <p className="text-body">Fire and Ice</p>
        </div>
        <Image src={food} className="h-full rounded-md w-auto mx-auto" />
      </div>
    </>
  );
}
