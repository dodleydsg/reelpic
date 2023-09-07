import React from "react";
import Link from "next/link";
import Profile1 from "../assets/images/Profile1.png";
import Image from "next/image";
import prettyTime from "pretty-time";
import GenerateProfile from "./generateProfile";

export default function NotificationCard({ linkedTo, created, description }) {
  const createdTime = new Date(created).valueOf();
  // console.log(linkedTo)
  const currentTime = Date.now();
  return (
    <div
      className="flex gap-2 items-center border-gray-200
    border-2 p-4 rounded text-center mb-2"
    >
      <div className="flex items-center gap-4">
        {linkedTo.photo?<Image src={linkedTo.photo || Profile1} className="h-10 w-10" /> :<GenerateProfile username={linkedTo.username}/>}
        
        <Link href="/jaso" className="text-label">
          {linkedTo.username}
        </Link>
      </div>

      <p className="text-sm text-dark-default/90">{description}</p>
      <p className="text-sm text-dark-default/70">
        {prettyTime([(currentTime - createdTime) / 1000, 0])} ago
      </p>
    </div>
  );
}
