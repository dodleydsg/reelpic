import NavbarTemplate from "../templates/template_with_navbar";

import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import Masonry from "../components/masonry/masonry";
import InputElement from "../components/forms/input";
import { useState } from "react";
import SearchInput from "../components/forms/searchInput";

export default function Explore() {
  const [searchChoice, setSearchChoice] = useState("all");
  // state is used for styling, options for input styling are uncontrollerd

  return (
    <>
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Explore"
        pageTitle="Explore | Dive into the community to find the best pics and stories"
      >
        <div className="space-y-4 px-1">
          <form className="grid bg-white sticky top-[72px] lg:top-0 py-4 grid-cols-2 gap-2">
            <div className="col-span-2 lg:col-span-1">
              <SearchInput placeholder="Search users or tags" />
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
                  id="catalogues"
                  name="searchChoice"
                  className="hidden"
                  aria-hidden="true"
                  type="radio"
                />
                <label
                  onClick={() => setSearchChoice("catalogues")}
                  htmlFor="catalogues"
                  className={`${
                    searchChoice === "catalogues"
                      ? "bg-primary-default/80 text-light-default"
                      : "bg-light-default hover:bg-primary-default/10 transition duration-150 "
                  } p-2 bg-light-default border-gray-300 border text-dark-default  min-w-[64px] rounded inline-block text-center cursor-pointer`}
                >
                  Catalogues
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
