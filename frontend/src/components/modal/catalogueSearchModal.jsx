import SearchInput from "../forms/searchInput";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { toggleCatalogueModal } from "@/components/store/features/uiSlice";

export default function CatalogueSearchModal() {
  const { catalogueModal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const catalogueModalRef = useRef();

  useEffect(() => {
    catalogueModalRef.current.classList.toggle("translate-y-full");
  }, [catalogueModal]);

  return (
    <div
      ref={catalogueModalRef}
      className="-top-full origin-top transition ease-in-out duration-300 inset-0 bg-black/70 z-[53] backdrop-blur h-full flex items-center justify-center w-full p-4 lg:p-8 fixed"
    >
      <div className="w-full max-w-4xl h-4/5 bg-white p-4 rounded-lg">
        <div className="flex items-center justify-end">
          <IoClose
            onClick={() => dispatch(toggleCatalogueModal())}
            className="cursor-pointer text-xl text-danger-default/80 hover:text-danger-default transition duration-200"
          />
        </div>
        <div>
          <form className="bg-white py-4 gap-2">
            <div className="relative">
              <SearchInput placeholder="Find catalogues" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}