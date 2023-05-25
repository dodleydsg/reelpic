import SearchInput from "../forms/searchInput";
import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { toggleCatalogueModal } from "../../store/features/uiSlice";

export default function CatalogueSearchModal() {
  const { catalogueModal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const catalogueModalRef = useRef();

  useEffect(() => {
    if (catalogueModal) {
      catalogueModalRef.current.classList.toggle("translate-y-full");
    }
  }, [catalogueModal]);

  return (
    <div
      ref={catalogueModalRef}
      className="-top-full origin-top transition ease-in-out duration-300 inset-0 bg-black/70 z-[53] backdrop-blur h-full flex items-center justify-center w-full p-4 lg:p-8 fixed"
    >
      <div className="w-full max-w-2xl h-4/5 bg-white p-4 rounded-lg">
        <div className="flex items-center justify-end">
          <IoClose
            onClick={() => dispatch(toggleCatalogueModal())}
            className="cursor-pointer text-xl text-danger-default/80 hover:text-danger-default transition duration-200"
          />
        </div>
        <div className="space-y-2">
          <form className="bg-white py-4 gap-2">
            <div className="relative">
              <SearchInput placeholder="Find catalogues" />
            </div>
          </form>
          <div className="space-y-1 py-2">
            <h4 className="text-sm font-light">Search results</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4">
              <div className="border border-gray-100 hover:scale-95 cursor-pointer transition duration-150 flex items-center p-4">
                <p>Fashion</p>
              </div>
              <div className="border border-gray-100 hover:scale-95 cursor-pointer transition duration-150 flex items-center p-4">
                <p>Food</p>
              </div>
              <div className="border border-gray-100 hover:scale-95 cursor-pointer transition duration-150 flex items-center p-4">
                <p>Tech</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
