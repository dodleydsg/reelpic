import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import placeHolderProfile from "../assets/images/placeholder_profile.png";
import NavBar from "../components/navBar";
import { MdOutlineNotifications, MdOutlineSettings } from "react-icons/md";
import Mask from "../components/mask";
import { useRouter } from "next/router";

export default function ({ children }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Reelpic | Home</title>
      </Head>

      <Mask />
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
              <MdOutlineNotifications
                onClick={() => router.push("/notifications")}
                className="text-dark-default/90 w-6 h-auto cursor-pointer "
              />

              <MdOutlineSettings
                onClick={() => router.push("/settings")}
                className="text-dark-default/90 cursor-pointer w-6 h-auto"
              />
            </div>
          </header>
        </div>
      </div>
    </>
  );
}
