import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../store/features/uiSlice";
import {
  IoCheckmarkDoneCircle,
  IoClose,
  IoInformationCircleOutline,
  IoWarningOutline,
} from "react-icons/io5";
import _ from "lodash";
import { setStale } from "../store/features/uiSlice";
import Link from "next/link";

export default function Alert() {
  const { alertText, alertAction, alertVariant, alert } = useSelector(
    (state) => state.ui
  );
  const dispatch = useDispatch();
  const alertRef = useRef();

  if (alert) {
    _.delay(() => dispatch(setAlert(false)), 5000);
  }

  useEffect(() => {
    if (alert) {
      alertRef.current.classList.remove("-translate-y-full");
      alertRef.current.classList.remove("opacity-0");
    } else {
      alertRef.current.classList.add("-translate-y-full");
      alertRef.current.classList.add("opacity-0");
    }
  }, [alert]);
  if (alertVariant === "danger") {
    return (
      <div className="grid">
        <div
          ref={alertRef}
          className="max-w-lg w-full lg:max-w-2xl duration-200 origin-top -translate-y-full fixed z-[56]  rounded bg-blue-100  p-4 justify-self-center text-danger-default/80  flex items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2">
            <IoWarningOutline className="text-danger-default/80 w-6 h-auto" />
            <span className="text-sm">{alertText}</span>
          </div>
          <div className="flex items-center gap-4">
            {alertAction === "refresh" ? (
              <span
                className="text-danger-default/80 font-bold p-2 cursor-pointer"
                onClick={() => dispatch(setStale(true))}
              >
                Refresh
              </span>
            ) : null}

            <IoClose
              className="cursor-pointer"
              onClick={() => dispatch(setAlert(false))}
            />
          </div>
        </div>
      </div>
    );
  }
  if (alertVariant === "info") {
    return (
      <div className="grid">
        <div
          ref={alertRef}
          className="max-w-lg w-full lg:max-w-2xl duration-200 origin-top -translate-y-full fixed z-[56]  rounded bg-blue-100 p-4 justify-self-center text-blue-600  flex items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2">
            <IoInformationCircleOutline className="w-6 h-auto" />
            <span className="text-sm text-blue-900">{alertText}</span>
          </div>
          <div className="flex items-center gap-4">
            {alertAction === "refresh" ? (
              <span
                className="text-blue-900 font-bold p-2 cursor-pointer"
                onClick={() => dispatch(setStale(true))}
              >
                Refresh
              </span>
            ) : null}
            {alertAction === "login" ? (
              <span className="text-danger-default/80 font-bold p-2 cursor-pointer">
                <Link href="/login">Login</Link>
              </span>
            ) : null}
            <IoClose
              className="cursor-pointer"
              onClick={() => dispatch(setAlert(false))}
            />
          </div>
        </div>
      </div>
    );
  }
  if (alertVariant === "success") {
    return (
      <div className="grid">
        <div
          ref={alertRef}
          className="max-w-lg w-full lg:max-w-2xl duration-200 origin-top -translate-y-full fixed z-[56]  rounded bg-blue-100 p-4 justify-self-center text-green-600  flex items-center justify-between gap-6"
        >
          <div className="flex items-center gap-2">
            <IoCheckmarkDoneCircle className="w-6 h-auto" />
            <span className="text-sm text-green-900">{alertText}</span>
          </div>
          <div className="flex items-center gap-4">
            {alertAction === "refresh" ? (
              <span
                className="text-green-900 font-bold p-2 cursor-pointer"
                onClick={() => dispatch(setStale(true))}
              >
                Refresh
              </span>
            ) : null}
            <IoClose
              className="cursor-pointer"
              onClick={() => dispatch(setAlert(false))}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="grid">
      <div
        ref={alertRef}
        className="max-w-lg w-full lg:max-w-2xl duration-200 origin-top -translate-y-full fixed z-[56]  rounded bg-blue-100 p-4 justify-self-center text-dark-default  flex items-center justify-between gap-6"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm text-dark-default">{alertText}</span>
        </div>
        <div className="flex items-center gap-4">
          {alertAction === "refresh" ? (
            <span
              className="text-dark-default font-bold p-2 cursor-pointer"
              onClick={() => dispatch(setStale(true))}
            >
              Refresh
            </span>
          ) : null}
          <IoClose
            className="cursor-pointer"
            onClick={() => dispatch(setAlert(false))}
          />
        </div>
      </div>
    </div>
  );
}
