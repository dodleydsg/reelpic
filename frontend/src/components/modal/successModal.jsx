import { useRef } from "react";
import { toggleSuccessModal } from "@/components/store/features/uiSlice";
import { useDispatch } from "react-redux";
import { IoCheckmarkDone } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function SuccessModal() {
  const dispatch = useDispatch();
  const { successModal } = useSelector((state) => state.ui);
  const successModalRef = useRef();

  useEffect(() => {
    if (successModal) {
      successModalRef.current.classList.add("translate-x-full");
    } else {
      successModalRef.current.classList.remove("translate-x-full");
    }
  }, [successModal]);

  return (
    <div
      ref={successModalRef}
      className="-left-full max-w-full origin-left transition ease-in-out duration-500 inset-0 bg-black/70 z-[55] backdrop-blur h-full flex items-center justify-center w-full p-4 lg:p-8 fixed"
    >
      <div className="h-80 w-80 bg-white p-4 rounded-lg">
        <div className="h-full flex items-center justify-center">
          <div className="space-y-2">
            <div className="flex justify-center">
              <IoCheckmarkDone className="text-[80px] text-green-500" />
            </div>
            <p className="text-sm text-green-500">
              Action completed successfully
            </p>
            <button
              onClick={() => dispatch(toggleSuccessModal())}
              type="button"
              className="px-4 py-2 mx-auto block text-danger-default bg-default-white border border-danger-default/30 rounded hover:bg-danger-default/10"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
