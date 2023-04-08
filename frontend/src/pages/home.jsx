import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import placeHolderProfile from "../assets/images/placeholder_profile.png";
import ScrollCard from "../components/ScrollCard";
import NavBar from "../components/navBar";
import { MdOutlineNotifications, MdOutlineSettings } from "react-icons/md";
import NotificationCard from "../components/notificationCard";
import CatalogueCard from "../components/catalogueCard";
import Carousel from "../components/postCarousel";
import Post from "../components/post";

export default function () {
  return (
    <>
      <Head>
        <title>Reelpic | Home</title>
      </Head>

      <div className="w-screen h-screen relative container py-4 mx-auto px-4  gap-6 sm:grid sm:grid-cols-4">
        <NavBar />
        <div
          id="mainContent"
          className="sm:col-span-3 overflow-y-scroll pb-40  relative gap-4"
        >
          <div className="space-y-4">
            <div className="mt-20 sm:mt-0">
              <h3 className="text-subheading mt-3">Trending catalogues</h3>
              <ScrollCard />
            </div>
            <div className="space-y-4">
              <Post />
              <Post />
            </div>
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
