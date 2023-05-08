import SearchInput from "../forms/searchInput";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { toggleAddToCatalogueModal } from "@/components/store/features/uiSlice";
import InputElement from "../forms/input";

export default function AddToCatalogueModal() {
  const { addToCatalogueModal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const addToCatalogueModalRef = useRef();

  useEffect(() => {
    addToCatalogueModalRef.current.classList.toggle("translate-y-full");
  }, [addToCatalogueModal]);

  return (
    <div
      ref={addToCatalogueModalRef}
      className="-top-full max-w-full origin-top transition ease-in-out duration-150 inset-0 bg-black/70 z-[53] backdrop-blur h-full flex items-center justify-center w-full p-4 lg:p-8 fixed"
    >
      <div className="w-full max-w-4xl h-4/5 bg-white p-4 rounded-lg">
        <div className="flex items-center justify-end">
          <IoClose
            onClick={() => dispatch(toggleAddToCatalogueModal())}
            className="cursor-pointer text-xl text-danger-default/80 hover:text-danger-default transition duration-200"
          />
        </div>
        <div className="space-y-2">
          <form className="bg-white py-4 gap-2">
            <div className="relative">
              <SearchInput placeholder="Find catalogues" />
            </div>
          </form>
          <div className="space-y-1">
            <div className="scale-y-0 origin-top duration-300 w-full   bg-white overflow-clip rounded border space-y-2 border-gray-200">
              <p className="font-bold text-sm px-2 pt-4">Bookmark</p>
              <div className="space-y-1">
                <p className="text-sm text-dark-default/80 px-2">
                  Choose a catalogue
                </p>

                <p className="py-2 cursor-pointer text-sm px-2 hover:bg-primary-default/50 hover:text-white transition">
                  Fashion
                </p>
                <p className="py-2 cursor-pointer text-sm px-2 hover:bg-primary-default/50 hover:text-white transition">
                  Food
                </p>
                <p className="py-2 cursor-pointer text-sm px-2 hover:bg-primary-default/50 hover:text-white transition">
                  Tech
                </p>
                <form className="px-2 pb-4">
                  <InputElement
                    className="w-full text-xs h-9 pl-1 rounded-sm"
                    placeholder="Search catalogues"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
