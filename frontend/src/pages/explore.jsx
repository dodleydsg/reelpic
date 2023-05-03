import NavbarTemplate from "../templates/template_with_navbar";

import Mask from "../components/mask";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import Masonry from "../components/masonry/masonry";
import InputElement from "../components/form/input";
import { useState } from "react";

export default function Explore() {
  const [searchChoice, setSearchChoice] = useState("all");
  // state is used for styling, options for input styling are uncontrollerd

  return (
    <>
      <Mask />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Explore"
        pageTitle="Explore | Dive into the community to find the best pics and stories"
      >
        <div className="space-y-4 px-1">
          <form className="grid py-4 top-0 grid-cols-2 gap-2">
            <div className="col-span-2 lg:col-span-1">
              <label className="sr-only" htmlFor="search">
                Search users or tags
              </label>
              <InputElement
                type="text"
                id="search"
                placeholder="Search users or tags"
                className="w-full"
              />
            </div>
            <div className="col-span-2 lg:col-span-1 flex items-center gap-2">
              <div>
                <InputElement
                  id="all"
                  name="searchChoice"
                  className="hidden"
                  aria-hidden="true"
                  type="radio"
                />
                <label
                  onClick={() => setSearchChoice("all")}
                  htmlFor="all"
                  className={`${
                    searchChoice === "all"
                      ? "bg-primary-default/80 text-light-default"
                      : "bg-light-default hover:bg-primary-default/10 transition duration-150 "
                  } p-2 bg-light-default border-gray-300 border text-dark-default  min-w-[64px] rounded text-center inline-block cursor-pointer`}
                >
                  All
                </label>
              </div>
              <div>
                <InputElement
                  id="people"
                  name="searchChoice"
                  className="hidden"
                  aria-hidden="true"
                  type="radio"
                />
                <label
                  onClick={() => setSearchChoice("people")}
                  htmlFor="people"
                  className={`${
                    searchChoice === "people"
                      ? "bg-primary-default/80 text-light-default"
                      : "bg-light-default hover:bg-primary-default/10 transition duration-150 "
                  } p-2 bg-light-default border-gray-300 border text-dark-default  min-w-[64px] rounded inline-block text-center cursor-pointer`}
                >
                  People
                </label>
              </div>
              <div>
                <InputElement
                  id="tags"
                  name="searchChoice"
                  className="hidden"
                  aria-hidden="true"
                  type="radio"
                />
                <label
                  onClick={() => setSearchChoice("tags")}
                  htmlFor="tags"
                  className={`${
                    searchChoice === "tags"
                      ? "bg-primary-default/80 text-light-default"
                      : "bg-light-default hover:bg-primary-default/10 transition duration-150 "
                  } p-2 bg-light-default border-gray-300 border text-dark-default  min-w-[64px] rounded text-center inline-block cursor-pointer`}
                >
                  Tags
                </label>
              </div>
            </div>
          </form>
          <Masonry />
        </div>
      </NavbarTemplate>
    </>
  );
}
