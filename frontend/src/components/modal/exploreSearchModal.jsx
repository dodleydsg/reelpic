import SearchInput from "../forms/searchInput";
import InputElement from "../forms/input";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { toggleExploreModal } from "@/components/store/features/uiSlice";

export default function ExploreSearchModal({ hidden }) {
  const [searchChoice, setSearchChoice] = useState("all");
  // state is used for styling, options for input styling are uncontrolled
  const { exploreModal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const exploreModalRef = useRef();

  useEffect(() => {
    exploreModalRef.current.classList.toggle("translate-y-full");
  }, [exploreModal]);

  return (
    <div
      ref={exploreModalRef}
      className="-top-full origin-top transition ease-in-out duration-300 inset-0 bg-black/70 z-[53] backdrop-blur h-full flex items-center justify-center w-full p-4 lg:p-8 fixed"
    >
      <div className="w-full max-w-4xl h-4/5 bg-white p-4 rounded-lg">
        <div className="flex items-center justify-end">
          <IoClose
            onClick={() => dispatch(toggleExploreModal())}
            className="cursor-pointer text-xl text-danger-default/80 hover:text-danger-default transition duration-200"
          />
        </div>
        <div>
          <form className="grid bg-white sticky top-[72px] lg:top-0 py-4 grid-cols-2 gap-2">
            <div className="col-span-2 lg:col-span-1 relative">
              <SearchInput placeholder="Search users or tags" />
            </div>
            <div className="col-span-2 lg:col-span-1 flex items-center flex-wrap gap-2">
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
        </div>
      </div>
    </div>
  );
}
