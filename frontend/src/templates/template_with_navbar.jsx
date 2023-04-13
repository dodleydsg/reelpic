import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import placeHolderProfile from "../assets/images/placeholder_profile.png";
import ScrollCard from "../components/scrollCard";
import NavBar from "../components/navBar";
import { MdOutlineNotifications, MdOutlineSettings } from "react-icons/md";

export default function ({ children }) {
  return (
    <>
      <Head>
        <title>Reelpic | Home</title>
      </Head>

      <div className="w-screen h-screen relative container py-4 mx-auto px-4  gap-6 lg:grid lg:grid-cols-4">
        <NavBar />
        <div
          id="mainContent"
          className="lg:col-span-3 overflow-y-scroll pb-40  relative gap-4"
        >
          <div className="space-y-4">
            <div className="space-y-4 mt-20 lg:mt-0">{children}</div>
          </div>
          <header className="p-4 shadow flex lg:hidden justify-between items-center fixed bg-white z-50 top-0 inset-x-0">
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
