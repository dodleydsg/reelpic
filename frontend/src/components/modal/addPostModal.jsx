import { IoClose } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { toggleAddPostModal } from "../../store/features/uiSlice";
import AddPostForm from "../forms/addPostForm";

export default function AddPostModal() {
  const { addPostModal } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const addPostModalRef = useRef();

  useEffect(() => {
    if (addPostModal) {
      addPostModalRef.current.classList.add("translate-y-full");
      addPostModalRef.current.classList.remove("opacity-0");

    } else {
      addPostModalRef.current.classList.remove("translate-y-full");
      addPostModalRef.current.classList.add("opacity-0");

      
    }
  }, [addPostModal]);

  return (
    <div
      ref={addPostModalRef}
      className="-top-full origin-top transition ease-in-out duration-300 inset-0 py-2 bg-black/70 z-[55] backdrop-blur h-full flex items-center justify-center w-full p-4 fixed "
    >
      <div className="w-full max-w-2xl space-y-4 h-full overflow-y-scroll bg-white p-9 rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-medium text-pink-500">New post</h2>
          <IoClose
            onClick={() => dispatch(toggleAddPostModal())}
            className="cursor-pointer text-xl text-danger-default/80 hover:text-danger-default transition duration-200"
          />
        </div>
        <AddPostForm />
      </div>
    </div>
  );
}
