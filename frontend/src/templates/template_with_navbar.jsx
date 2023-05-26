import Head from "next/head";
import NavBar from "../components/navBar/navBar";
import Mask from "../components/mask";
import { useRouter } from "next/router";
import {
  IoNotifications,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoSettings,
  IoExitOutline,
} from "react-icons/io5";
import NavIcon from "../components/navBar/navIcon";
import { useSelector, useDispatch } from "react-redux";
import { setLoggedIn } from "../store/features/userSlice";
import authActions from "../actions/auth.actions";
import authResolver from "../resolvers/auth.resolver";
import SuccessModal from "../components/modal/successModal";
import AddPostModal from "../components/modal/addPostModal";
import AddCatalogueModal from "../components/modal/addCatalogueModal";

export default function ({ children, headerText, HeaderAside, pageTitle }) {
  const router = useRouter();
  const pathname = router.pathname;
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div>
        <Mask />
        <SuccessModal />
        <AddPostModal />
        <AddCatalogueModal />
        <div className="relative py-4 px-4 lg:py-0 mx-auto gap-6 lg:grid lg:grid-cols-4  max-w-[1536px]">
          <NavBar user={user} />
          <div id="mainContent" className="lg:col-span-3 pb-40  relative gap-4">
            <div className="space-y-4 ">
              <div className="space-y-4 mt-[56px] lg:mt-0">{children}</div>
            </div>
            <div className="fixed z-50 top-0 inset-x-0 shadow bg-white ">
              <header className="p-4 flex lg:hidden justify-between items-center bg-white ">
                <div className="flex gap-3 items-center">
                  {/* 
                
                HeaderAside is needed to properly render the appropriate Header for mobile
                
                */}
                  <HeaderAside />

                  <h2 className="text-medium text-2xl text-dark-default/90">
                    {headerText}
                  </h2>
                </div>
                <div className="flex items-center gap-4">
                  <NavIcon
                    href="/notifications"
                    SolidIcon={() => <IoNotifications />}
                    OutlineIcon={() => <IoNotificationsOutline />}
                    path={pathname}
                    display="Alerts"
                    clickCallback={() => router.push("/notifications")}
                  />
                  <NavIcon
                    href="/settings"
                    SolidIcon={() => <IoSettings />}
                    OutlineIcon={() => <IoSettingsOutline />}
                    path={pathname}
                    clickCallback={() => router.push("/settings")}
                    display="Settings"
                  />
                  <span
                    className="inline-block cursor-pointer text-danger-default/80"
                    onClick={() => {
                      authResolver(authActions.LOGOUT, {
                        data: {
                          userId: user._id,
                        },
                      });
                      dispatch(setLoggedIn(false));
                    }}
                  >
                    <IoExitOutline className="text-xl sm:text-2xl" />
                  </span>
                </div>
              </header>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
