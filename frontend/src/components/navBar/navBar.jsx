import Link from "next/link";
import { useRouter } from "next/router";
import profileImg from "../../assets/images/placeholder_profile1.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import {
  toggleMask,
  setMask,
  toggleAddCatalogueModal,
  toggleAddPostModal,
} from "../../store/features/uiSlice";
import { useEffect, useRef } from "react";
import {
  IoHome,
  IoAdd,
  IoHomeOutline,
  IoCompass,
  IoCompassOutline,
  IoImages,
  IoImagesOutline,
  IoSettings,
  IoSettingsOutline,
  IoNotifications,
  IoNotificationsOutline,
  IoExitOutline,
} from "react-icons/io5";

import NavIcon from "./navIcon";
import NavbarProfile from "./navBarProfile";
import profile from "../../assets/images/Profile1.png";
import authActions from "../../presentation/actions/auth.actions";
import authResolver from "../../presentation/resolvers/auth.resolver";
import { setLoggedIn } from "../../store/features/userSlice";
import GenerateProfile from "../generateProfile";

export default function NavBar({ user }) {
  const mobileActionExpandRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    dispatch(setMask(false));
  }, []);

  return (
    <>
      {/* Mobile nav */}
      <div className="lg:hidden  px-4  fixed flex z-[54]  inset-x-0 bottom-2 h-12 gap-4">
        {/* <div
          ref={mobileActionExpandRef}
          className="absolute z-[55] scale-y-0 transition-transform ease-in-out origin-bottom duration-300 border-[#D2C4E9] border ml-4 left-0 bottom-16 text-primary-default/70 w-40 rounded bg-light-default flex justify-evenly flex-col text-base"
        >
          <p
            onClick={() => {
              dispatch(toggleAddPostModal());
              mobileActionExpandRef.current.classList.toggle("scale-y-0");
              dispatch(setMask(false));
            }}
            className="p-4 border-b border-[#D2C4E9] hover:bg-primary-default hover:cursor-pointer hover:text-light-default transition duration-300"
          >
            Create Post
          </p>
          <p
            onClick={() => {
              dispatch(toggleAddCatalogueModal());
              mobileActionExpandRef.current.classList.toggle("scale-y-0");
              dispatch(setMask(false));
            }}
            className="p-4 hover:bg-primary-default hover:text-light-default hover:cursor-pointer transition duration-300"
          >
            Add Catalogue
          </p>
        </div> */}
        <button
          onClick={() => {

            // let menu = mobileActionExpandRef.current;
            // menu.classList.toggle("scale-y-0");
            dispatch(toggleAddPostModal())
            dispatch(setMask(false));
            // dispatch(toggleMask());
          }}
          className="w-16 rounded flex items-center justify-center text-light-default bg-primary-default text-2xl"
        >
          <IoAdd />
        </button>
        <div className="w-full bg-light-default shadow-lg rounded flex justify-around items-center text-dark-default text-2xl">
          <NavIcon
            href="/home"
            SolidIcon={(props) => <IoHome {...props} />}
            OutlineIcon={(props) => <IoHomeOutline {...props} />}
            path={pathname}
          />
          <NavIcon
            href="/explore"
            SolidIcon={(props) => <IoCompass {...props} />}
            OutlineIcon={(props) => <IoCompassOutline {...props} />}
            path={pathname}
          />
          <NavIcon
            href="/notifications"
            SolidIcon={() => <IoNotifications />}
            OutlineIcon={() => <IoNotificationsOutline />}
            path={pathname}
          />
          {/* <NavIcon
            href="/catalogues"
            SolidIcon={(props) => <IoImages {...props} />}
            OutlineIcon={(props) => <IoImagesOutline {...props} />}
            path={pathname}
          /> */}
        </div>
      </div>

      {/* Mobile Nav end */}

      <div className="shadow-xl sticky top-0 h-screen col-span-1 py-12 px-4 lg:px-8 hidden lg:block  space-y-10 text-center  from-gray-200 to-gray-300/40 bg-gradient-to-tl ">
        <div className="flex items-center gap-2 justify-start">
          {user.photo ? (
            <NavbarProfile image={user.photo} />
          ) : (
            <GenerateProfile username={user.username} />
          )}
          <div>
            <p className="text-sm text-dark-default/70">@{user.username}</p>
          </div>
        </div>
        <div className="2xl:grid grid-cols-3 hidden">
          <div className="space-y-2 flex-col text-left">
            <p>Posts</p>
            <p className="text-sm text-dark-default/70">675</p>
          </div>
          <div className="space-y-2 flex-col ">
            <p>Followers</p>
            <p className="text-sm text-dark-default/70">12k</p>
          </div>
          <div className="space-y-2 flex-col flex justify-center text-right">
            <p>Likes</p>
            <p className="text-sm text-dark-default/70">300k</p>
          </div>
        </div>
        <div className="space-y-8 text-dark-default/90">
          <NavIcon
            href="/home"
            SolidIcon={(props) => <IoHome {...props} />}
            OutlineIcon={(props) => <IoHomeOutline {...props} />}
            path={pathname}
            display="Home"
          />

          <NavIcon
            href="/explore"
            SolidIcon={(props) => <IoCompass {...props} />}
            OutlineIcon={(props) => <IoCompassOutline {...props} />}
            path={pathname}
            display="Explore"
          />

          {/* <NavIcon
            href="/catalogues"
            SolidIcon={(props) => <IoImages {...props} />}
            OutlineIcon={(props) => <IoImagesOutline {...props} />}
            path={pathname}
            display="Catalogues"
          /> */}
          <NavIcon
            href="/notifications"
            SolidIcon={(props) => <IoNotifications {...props} />}
            OutlineIcon={(props) => <IoNotificationsOutline {...props} />}
            path={pathname}
            display="Alerts"
          />

          <NavIcon
            href="/settings"
            SolidIcon={(props) => <IoSettings {...props} />}
            OutlineIcon={(props) => <IoSettingsOutline {...props} />}
            path={pathname}
            display="Settings"
          />
        </div>
        <div>
          <span
            onClick={() => {
              authResolver(authActions.LOGOUT);
              dispatch(setLoggedIn(false));
            }}
            className="cursor-pointer flex justify-center lg:justify-start items-start gap-2 w-full text-lg text-danger-default font-medium"
          >
            <IoExitOutline className="text-2xl" />
            <p className="text-xl hidden lg:block text-dark-default">Logout</p>
          </span>
        </div>
      </div>
    </>
  );
}
