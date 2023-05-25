import React from "react";
import food from "../assets/images/food.jpg";
import Image from "next/image";
import Link from "next/link";
import { IoPencil, IoTrash } from "react-icons/io5";

export default function CatalogueCard({ title, cover }) {
  return (
    <>
      <Link href="#" className="relative inset-0 shrink-0">
        <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
        <div className="absolute pb-2 sm:pb-4 z-10 px-4 inset-0 bg-none text-white flex items-end justify-between">
          <p className="text-body">{title}</p>
          <div className="flex gap-4 items-center ">
            <button className="p-2 rounded-sm bg-gray-100/50 hover:bg-gray-100 hover:text-danger-default/80 transition duration-200">
              <IoTrash />
            </button>
            <button className="p-2 rounded-sm bg-gray-100/50 hover:bg-gray-100 hover:text-primary-default/80 transition duration-200">
              <IoPencil />
            </button>
          </div>
        </div>
        {cover ? (
          <Image src={cover} className="h-full rounded-md w-auto mx-auto" />
        ) : (
          <Image src={food} className="h-full rounded-md w-auto mx-auto" />
        )}
      </Link>
    </>
  );
}
