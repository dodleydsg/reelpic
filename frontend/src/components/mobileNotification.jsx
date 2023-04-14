import NotificationCard from "./notificationCard";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toggleMobileNotifications } from "../store/features/uiSlice";

export default function MobileNotification() {
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);
  let classes =
    "px-4 gap-4 lg:hidden bg-white fixed z-[56] inset-0 origin-top overflow-y-scroll transition duration-300 space-y-4 pt-12";
  if (!ui.mobileNav) {
    classes += " scale-y-0";
  }

  return (
    <div id="mobileNotifications" className={classes}>
      <div className="flex justify-end bg-white fixed shadow p-4 top-0 inset-x-0">
        <MdClose
          onClick={() => dispatch(toggleMobileNotifications())}
          className="cursor-pointer w-5 h-auto"
        />
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-right text-sm text-dark-default/80">
            {new Date().toLocaleDateString()}
          </p>
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </div>
        <div>
          <p className="text-right text-sm text-dark-default/80">
            {new Date(1223312131231).toLocaleDateString()}
          </p>
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </div>
      </div>
    </div>
  );
}
