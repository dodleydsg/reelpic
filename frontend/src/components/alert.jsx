import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../store/features/uiSlice";
import { IoClose } from "react-icons/io5";

export default function Alert({ variant, text }) {
  const { alertText, alert } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const alertRef = useRef();

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }

    if (alert) {
      alertRef.current.classList.add("translate-y-full");
      alertRef.current.classList.remove("opacity-0");
    } else {
      alertRef.current.classList.remove("translate-y-full");
      alertRef.current.classList.add("opacity-0");
    }
  }, [alert]);
  if (variant === "danger") {
  }
  if (variant === "success") {
  }
  return (
    <div className="grid">
      <div
        ref={alertRef}
        className="max-w-lg duration-200 origin-top translate-full fixed z-[56]  rounded bg-light-default  border border-primary-default/40 p-4 justify-self-center text-dark-default text-sm gap-2 flex items-center"
      >
        <span>Post added successfully</span>
        <IoClose
          className="cursor-pointer"
          onClick={() => dispatch(setAlert(false))}
        />
      </div>
    </div>
  );
}
