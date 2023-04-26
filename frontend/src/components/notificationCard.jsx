import React from "react";
import Link from "next/link";
import Profile1 from "../assets/images/profile1.png";
import Image from "next/image";

export default function NotificationCard() {
  return (
    <div
      className="flex gap-2 items-center border-gray-200
    border-2 p-4 rounded text-center mb-2"
    >
      <div className="flex items-center gap-4">
        <Image src={Profile1} className="h-10 w-10" />
        <Link href="/jaso" className="text-label">
          @aisteve
        </Link>
      </div>
      <p className="text-sm text-dark-default/90">followed you</p>
      <p className="text-sm text-dark-default/70">2 mins ago</p>
    </div>
  );
}