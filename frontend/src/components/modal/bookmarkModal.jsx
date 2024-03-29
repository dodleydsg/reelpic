import SearchInput from "../forms/searchInput";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { toggleBookmarkModal } from "@/components/store/features/uiSlice";

export default function BookmarkModal() {
  const { bookmarkModal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const bookmarkModalRef = useRef();
  const [searchResults, updateSearchResults] = useState([]);

  useEffect(() => {
    if (bookmarkModal) {
      bookmarkModalRef.current.classList.add("translate-y-full");
      bookmarkModalRef.current.classList.remove("opacity-0");

    }else{
      bookmarkModalRef.current.classList.remove("translate-y-full");
      bookmarkModalRef.current.classList.add("opacity-0");


    }
  }, [bookmarkModal]);

  return (
    <div
      ref={bookmarkModalRef}
      className="-top-full max-w-full origin-bottom transition ease-in-out duration-300 inset-0 bg-black/70 z-[53] backdrop-blur h-full flex items-center justify-center w-full p-4 lg:p-8 fixed"
    >
      <div className="w-full max-w-lg h-full overflow-y-scroll bg-white p-4 rounded-lg">
        <div className="flex items-center justify-end">
          <IoClose
            onClick={() => dispatch(toggleBookmarkModal())}
            className="cursor-pointer text-xl text-danger-default/80 hover:text-danger-default transition duration-200"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">Bookmark post</h3>
          <form className="bg-white py-4 gap-2">
            <div className="relative">
              <SearchInput placeholder="Search catalogues" />
            </div>
          </form>

          {/* Search results */}
          <div className="space-y-1 py-2">
            <h4 className="text-sm font-light">Search results</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <p className="border border-primary-default/80 rounded hover:scale-95 hover:text-white hover:bg-primary-default cursor-pointer transition duration-150 flex items-center p-4">
                Fashion
              </p>
              <p className="border border-primary-default/80 rounded  hover:scale-95 hover:text-white hover:bg-primary-default cursor-pointer transition duration-150 flex items-center p-4">
                Food
              </p>
              <p className="border border-primary-default/80 rounded  hover:scale-95 hover:text-white hover:bg-primary-default cursor-pointer transition duration-150 flex items-center p-4">
                Tech
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
