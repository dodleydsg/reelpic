import LoadingScreen from "@/components/components/loadingScreen";
import authActions from "@/components/presentation/actions/auth.actions";
import authResolver from "@/components/presentation/resolvers/auth.resolver";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function () {
  const router = useRouter();
  const { token, userId } = router.query;
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    if (userId && token) {
      console.log(token, userId);
      authResolver(authActions.RESET_CONFIRM, { userId, token })
        .then(() => {
          setAllowed(true);
        })
        .catch(() => {
          setAllowed(false);
        });
    }
  }, [router]);

  if (!(token && userId)) {
    return <LoadingScreen />;
  }
  if (!allowed) {
    return (
      <>
        <Head>
          <title>Error changing password</title>
        </Head>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="text-center font-bold text-xl text-danger-default">
            Error changing password
          </h2>
          <Link href="/reset" className="link">
            Try again
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Enter new password</title>
        </Head>
        <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/pattern_bg.webp')] flex items-center bg-cover">
          <div className="p-2 w-full">
            <div className=" items-center bg-white max-w-xl mx-auto my-auto rounded-xl px-[22px] sm:px-16 py-[35px] sm:py-[55px] w-full">
              <div className="space-y-3 sm:space-y-7">
                <div className="flex gap-3 items-center w-full justify-center">
                  <h1 className="text-heading text-center font-logo text-logoBlue">
                    Reelpic
                  </h1>
                  <div>
                    <img
                      src="../../logo/Logo_512x512.svg"
                      alt="Reelpic logo"
                      width="48"
                      height="48"
                    />
                  </div>
                </div>
                <p className="text-center text-subheading">
                  Enter a new password
                </p>
              </div>
              <div className="mt-7">
                {/* Form element and inputs */}
                <form
                  className="w-full min-h-[280px]"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target.elements;
                    let password = form["password"].value;
                  }}
                >
                  <div className="space-y-4 mb-4">
                    <input
                      placeholder="Enter password"
                      type="password"
                      id="password"
                      name="password"
                      className="h-12 w-full border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark"
                    />
                    <button
                      type="submit"
                      //   className={`block w-full mx-auto transition duration-200 py-[14px] rounded-md text-white text-lg bg-gray-300 cursor-not-allowed"
                      //       : "btn-primary hover:bg-[#4900EB]"

                      className="btn-primary hover:bg-[#4900EB]"
                    >
                      Change password
                    </button>

                    {/* {sent ? (
                      <p className="text-center text-sm font-bold">
                        Check your email on instructions for changing your
                        password
                      </p>
                    ) : (
                      <p className="text-center text-sm">
                        Please enter the email your registered with. <br />
                        More instructions would be sent there
                      </p>
                    )} */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
