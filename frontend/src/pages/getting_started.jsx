import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

export default function Reset() {
  const [interests, toggleInterests] = useState("reelpic");

  function _toggleInterests(e) {
    let items = interests;
    items = items.split(",");
    if (e.target.dataset["selected"] === "true") {
      e.target.classList.remove(
        "ring-primary-default",
        "ring-1",
        "ring-offset-2"
      );

      e.target.dataset["selected"] = "false";
      items = items.filter((val) => {
        if (val === e.target.dataset["value"] || val === "") {
          return false;
        }
        return true;
      });
      console.log(items);
      toggleInterests(items.join(","));
    } else {
      e.target.classList.add("ring-primary-default", "ring-1", "ring-offset-2");

      items.push(e.target.dataset["value"]);
      toggleInterests(items.join(","));
      e.target.dataset["selected"] = "true";
      console.log(items);
    }
  }

  return (
    <>
      <Head>
        <title>Reelpic | Getting started</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/Home_bg.png')] bg-cover bg-blend-screen">
        <div className="absolute left-0 right-0 bottom-0 top-0 opacity-50 bg-gradient-to-b from-black to-[rgb(0,0,0,.5)]"></div>
        <div className="relative container mx-auto flex z-10 h-screen px-4">
          <div className="items-center bg-white max-w-3xl mx-auto my-auto rounded-xl px-[22px] lg:px-16 py-[35px] lg:py-[55px]">
            <div className="space-y-3 lg:space-y-7 sm:px-20">
              <div className="flex gap-3 items-center w-full justify-center">
                <h1 className="text-heading text-center font-logo text-logoBlue">
                  Reelpic
                </h1>
                <div>
                  <img
                    src="./logo/Logo_512x512.svg"
                    alt="Reelpic logo"
                    width="48"
                    height="48"
                  />
                </div>
              </div>
              <p className="text-center text-subheading">
                What are you interested in ?
              </p>
              <ul
                className="list-none grid text-light-default font-light text-sm grid-cols-3 gap-2"
                data-items={interests}
              >
                <li
                  onClick={_toggleInterests}
                  data-selected="false"
                  data-value="photography"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-red-300 p-4"
                >
                  Photography
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="tech"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#2D0F75] p-4"
                >
                  Tech
                </li>{" "}
                <li
                  onClick={_toggleInterests}
                  data-value="design"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#3D367B] p-4"
                >
                  Design
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="architecture"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#6a83d0] p-4"
                >
                  Architecture
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="art"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#CF8E2E] p-4"
                >
                  Art
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="cinema"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#E33194] p-4"
                >
                  Cinema
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="landscapes"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#8B8110] p-4"
                >
                  Landscapes
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="cuisines"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#42A16B] p-4"
                >
                  Cuisines
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="AI"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#121283] p-4"
                >
                  AI
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="Nature"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#417E41] p-4"
                >
                  Nature
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="Automobiles"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#A2A3B8] p-4"
                >
                  Automobiles
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="Culture"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#909C22] p-4"
                >
                  Culture
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="people"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#128EED] p-4"
                >
                  People
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="Fashion"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#B2056C] p-4"
                >
                  Fashion
                </li>
                <li
                  onClick={_toggleInterests}
                  data-value="Hobbies"
                  data-selected="false"
                  className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#31DD32] p-4"
                >
                  Hobbies
                </li>
              </ul>
              <div className="grid grid-cols-2">
                <div className="col-span-1 flex items-center justify-start">
                  <Link href="/home" className="link">
                    Skip
                  </Link>
                </div>
                <Link
                  href="/home"
                  className="btn-primary text-center hover:bg-[#4900EB] col-span-1 block"
                >
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
