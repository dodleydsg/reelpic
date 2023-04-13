import Link from "next/link";
import {
  MdHome,
  MdCompas,
  MdSettings,
  MdAdd,
  MdNotifications,
  MdOutlineSettings,
  MdOutlineDelete,
  MdOutlineDeleteOutline,
  MdOutlinePhotoLibrary,
  MdOutlineCompassCalibration,
  MdOutlineNavigation,
  MdOutlineExplore,
  MdHomeMax,
  MdDashboard,
  MdExplore,
  MdExitToApp,
  MdOutlineNotifications,
} from "react-icons/md";

import profileImg from "../assets/images/placeholder_profile1.png";
import Image from "next/image";
import { useState } from "react";

export default function NavBar() {
  return (
    <>
      {/* Mobile nav */}
      <div className="lg:hidden container px-4 mx-auto fixed flex z-[100]  inset-x-0 bottom-2 h-12 gap-4">
        <div
          id="mobileActionExpand"
          className="absolute scale-y-0 transition-transform ease-in-out origin-bottom duration-300 border-[#D2C4E9] border ml-4 left-0 bottom-16 text-primary-default/70 w-40 rounded bg-light-default flex justify-evenly flex-col text-base"
        >
          <p className="p-4 border-b border-[#D2C4E9] hover:bg-primary-default hover:text-light-default transition duration-300">
            Create Post
          </p>
          <p className="p-4 hover:bg-primary-default hover:text-light-default transition duration-300">
            Add Catalogue
          </p>
        </div>
        <button
          onClick={() => {
            let menu = document.getElementById("mobileActionExpand");
            menu.classList.toggle("scale-y-0");
          }}
          className="w-16 rounded flex items-center justify-center text-light-default bg-primary-default text-2xl"
        >
          <MdAdd />
        </button>
        <div className="w-full  bg-light-default shadow-lg rounded flex justify-around items-center text-dark-default text-2xl">
          <Link href="/home" className="target:text-primary-default">
            <MdDashboard />
          </Link>
          <Link href="/explore" className="target:text-primary-default">
            <MdOutlineExplore />
          </Link>
          <Link href="/catalogues" className="target:text-primary-default">
            <MdOutlinePhotoLibrary />
          </Link>
          <Link href="/trash" className="target:text-primary-default">
            <MdOutlineDeleteOutline />
          </Link>
        </div>
      </div>

      <div className="shadow-xl col-span-1 h-full py-12 px-4 lg:px-8 hidden lg:block  space-y-10 text-center rounded-2xl from-gray-200 to-gray-300/40 bg-gradient-to-tl ">
        <div className="flex items-center gap-4 justify-start">
          <Image src={profileImg} height={48} className="block" />
          <div>
            <p className="text-label">Stephen King</p>
            <p className="text-xs text-dark-default/70">@stephenking</p>
          </div>
        </div>
        <div className="2xl:grid grid-cols-3 hidden">
          <div className="space-y-2 flex-col text-left">
            <p>Posts</p>
            <p className="text-sm text-dark-default/70">675</p>
          </div>
          <div className="space-y-2 flex-col ">
            <p>Followers</p>
            <p className="text-sm text-dark-default/70">12k</p>
          </div>
          <div className="space-y-2 flex-col flex justify-center text-right">
            <p>Likes</p>
            <p className="text-sm text-dark-default/70">300k</p>
          </div>
        </div>
        <div className="space-y-8 text-dark-default/90">
          <Link
            href="/home"
            className="text-primary-default w-full gap-4 flex items-center"
          >
            <MdHome className="w-6 h-auto" />
            Home
          </Link>
          <Link href="/explore" className="w-full gap-4 flex items-center">
            <MdOutlineExplore className="w-6 h-auto" />
            Explore
          </Link>
          <Link href="/home" className="w-full gap-4 flex items-center">
            <MdOutlinePhotoLibrary className="w-6 h-auto" />
            Catalogues
          </Link>
          <Link href="/home" className="w-full gap-4 flex items-center">
            <MdOutlineNotifications className="w-6 h-auto" />
            Notifications
          </Link>
          <Link href="/home" className="w-full gap-4 flex items-center">
            <MdOutlineDelete className="w-6 h-auto" />
            Trash
          </Link>
          <Link href="/home" className="w-full gap-4 flex items-center">
            <MdOutlineSettings className="w-6 h-auto" />
            Settings
          </Link>
        </div>
        <div>
          <Link href="/home" className="w-full gap-4 flex items-center">
            <MdExitToApp className="w-6 h-auto text-danger-default" />
            Logout
          </Link>
        </div>
      </div>
    </>
  );
}
