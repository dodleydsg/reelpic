import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import placeHolderProfile from "../assets/images/placeholder_profile.png";
import ScrollCard from "../components/ScrollCard";
import NavBar from "../components/navBar";
import { MdOutlineNotifications, MdOutlineSettings } from "react-icons/md";
import NotificationCard from "../components/notificationCard";
import CatalogueCard from "../components/catalogueCard";

export default function () {
  return (
    <>
      <Head>
        <title>Reelpic | Home</title>
      </Head>

      <div className="w-screen h-screen elative container py-4 mx-auto px-4  gap-6 flex">
        <NavBar />
        <div
          id="mainContent"
          className="space-y-4 overflow-y-scroll sm:space-y-0  relative  lg:space-y-0 gap-4"
        >
          <div className="mt-20 sm:mt-0">
            <h3 className="text-subheading mt-3">Trending catalogues</h3>
            <ScrollCard />
          </div>
          <header className="p-4 shadow flex sm:hidden justify-between items-center fixed bg-white z-50 top-0 inset-x-0">
            <div className="flex gap-3 items-center">
              <Link href="/user/jaso">
                <Image
                  alt="profile_img"
                  height={40}
                  width={40}
                  src={placeHolderProfile}
                />
              </Link>
              <h2 className="font-bold text-2xl text-dark-default/90">Feed</h2>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/user/jaso/notifications" className="text-2xl">
                <MdOutlineNotifications className="text-dark-default/90 " />
              </Link>
              <Link href="/user/jaso/notifications" className="text-2xl">
                <MdOutlineSettings className="text-dark-default/90 " />
              </Link>
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
