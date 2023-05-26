import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { toggleAddCatalogueModal } from "../../store/features/uiSlice";
import AddPostForm from "../forms/addPostForm";
import AddCatalogueForm from "../forms/addCatalogueForm";

export default function AddCatalogueModal() {
  const { addCatalogueModal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const addCatalogueModalRef = useRef();

  useEffect(() => {
    if (addCatalogueModal) {
      addCatalogueModalRef.current.classList.add("translate-y-full");
      addCatalogueModalRef.current.classList.remove("opacity-0");

    } else {
      addCatalogueModalRef.current.classList.remove("translate-y-full");
      addCatalogueModalRef.current.classList.add("opacity-0");

    }
  }, [addCatalogueModal]);

  return (
    <div
      ref={addCatalogueModalRef}
      className="-top-full origin-top transition ease-in-out duration-300 inset-0 bg-black/70 z-[53] backdrop-blur h-full flex items-center justify-center w-full p-4 fixed "
    >
      <div className="w-full max-w-2xl space-y-4 h-4/5 bg-white p-9 rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium">New catalogue</h2>
          <IoClose
            onClick={() => dispatch(toggleAddCatalogueModal())}
            className="cursor-pointer text-xl text-danger-default/80 hover:text-danger-default transition duration-200"
          />
        </div>
        <AddCatalogueForm />
      </div>
    </div>
  );
}
