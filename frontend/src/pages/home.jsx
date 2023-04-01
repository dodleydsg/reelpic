import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import placeHolderProfile from "../assets/images/placeholder_profile.png";
import ScrollCard from "../components/ScrollCard";

export default function () {
  return (
    <>
      <Head>
        <title>Reelpic | Home</title>
      </Head>
      <div className="container mx-auto px-4 py-6 space-y-6">
        <header className="flex justify-between items-center">
          <h1 className="text-heading">Reelpic</h1>
          <div>
            <Link href="/user/jaso">
              <Image
                alt="profile_img"
                height={40}
                width={40}
                src={placeHolderProfile}
              />
            </Link>
          </div>
        </header>
        {/* <section className="space-y-4">
          <h3 className="text-body">Trending catalogues</h3>
          <div className="scroll-y scroll-m-0.5 flex flex-shrink-0 space-x-2.5 ">
            <ScrollCard />
            <ScrollCard />
            <ScrollCard />
            <ScrollCard />
          </div>
        </section> */}
      </div>
    </>
  );
}
