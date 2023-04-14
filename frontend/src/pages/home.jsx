import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import placeHolderProfile from "../assets/images/placeholder_profile.png";
import ScrollCard from "../components/scrollCard";
import NavBar from "../components/navBar";
import { MdOutlineNotifications, MdOutlineSettings } from "react-icons/md";
import Post from "../components/post";
import Mask from "../components/mask";
import MobileNotification from "../components/mobileNotification";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileNotifications } from "../store/features/uiSlice";

export default function () {
  const dispatch = useDispatch();
  const { ui } = useSelector((state) => state);
  return (
    <>
      <Head>
        <title>Reelpic | Home</title>
      </Head>
      <Mask />
      <MobileNotification />
      <div
        className={`w-screen h-screen relative container py-4 mx-auto px-4  gap-6 lg:grid lg:grid-cols-4 ${
          ui.mobileNav ? "overflow-hidden" : ""
        }`}
      >
        <NavBar />
        <div
          id="mainContent"
          className="lg:col-span-3 overflow-y-scroll pb-40  relative gap-4"
        >
          <div className="space-y-4">
            <div className="mt-20 lg:mt-0">
              <h3 className="text-subheading mt-3">Trending catalogues</h3>
              <ScrollCard />
            </div>
            <div className="space-y-4">
              <Post />
              <Post />
            </div>
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
              <MdOutlineNotifications
                onClick={() => dispatch(toggleMobileNotifications())}
                className="text-dark-default/90 w-5 h-auto cursor-pointer "
              />

              <MdOutlineSettings className="text-dark-default/90 w-5 h-auto cursor-pointer " />
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
