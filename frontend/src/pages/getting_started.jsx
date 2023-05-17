import Head from "next/head";
import { getUser } from "../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingScreen from "../components/loadingScreen";
import InitForm from "../components/forms/initForm";
import { useRouter } from "next/router";

export default function Reset() {
  const router = useRouter();
  const { pending, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (token && id) {
        dispatch(getUser({ token, id }));
      } else {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
  }, []);
  if (pending) {
    return <LoadingScreen />;
  }

  if (user.username) {
    router.push("/home");
  }

  return (
    <>
      <Head>
        <title>Getting started | Lets know more about you</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/Home_bg.webp')] bg-cover bg-blend-screen flex items-center">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-black to-[rgb(0,0,0,.5)] flex items-center"></div>
        <div className="p-2 w-full relative z-10">
          <div className="items-center bg-white min-h-[540px] max-w-xl lg:h-3/5 mx-auto my-auto rounded-xl px-[22px] lg:px-16 py-[35px] lg:py-[55px]">
            <div className="space-y-3 lg:space-y-7 sm:px-20">
              <div className="flex gap-3 items-center w-full justify-center">
                <h1 className="text-heading text-center font-logo text-logoBlue">
                  Reelpic
                </h1>
                <div>
                  <img
                    src="./logo/Logo_512x512.svg"
                    alt="Reelpic logo"
                    width="48"
                    height="48"
                  />
                </div>
              </div>

              <InitForm email={user.email} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
