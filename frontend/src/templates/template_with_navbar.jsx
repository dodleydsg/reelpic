import Head from "next/head";
import NavBar from "../components/navBar/navBar";
import Mask from "../components/mask";
import { useRouter } from "next/router";
import {
  IoNotifications,
  IoNotificationsOutline,
  IoSettingsOutline,
  IoSettings,
} from "react-icons/io5";
import NavIcon from "../components/navBar/navIcon";

export default function ({ children, headerText, HeaderAside }) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <>
      <Head>
        <title>Reelpic | Home</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Mask />
      <div className="w-screen h-screen relative container p-4 mx-auto gap-6 lg:grid lg:grid-cols-4">
        <NavBar />
        <div
          id="mainContent"
          className="lg:col-span-3 overflow-y-scroll pb-40  relative gap-4"
        >
          <div className="space-y-4">
            <div className="space-y-4 mt-[56px] lg:mt-0">{children}</div>
          </div>
          <div className="fixed z-50 top-0 inset-x-0 shadow ">
            <header className="p-4 flex lg:hidden justify-between items-center  container mx-auto bg-white ">
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
              </div>
            </header>
          </div>
        </div>
      </div>
    </>
  );
}
