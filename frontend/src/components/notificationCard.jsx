import React from "react";
import Link from "next/link";
import Profile1 from "../assets/images/profile1.png";
import Image from "next/image";

export default function NotificationCard() {
  return (
    <div className="flex gap-2 items-center text-center mb-2">
      <Link href="/jaso" className="text-label">
        @aisteve
      </Link>
      <p className="text-sm text-dark-default/90">followed you</p>
      <p className="text-sm text-dark-default/70">2 mins ago</p>
    </div>
  );
}
