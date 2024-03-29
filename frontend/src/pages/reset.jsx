import Head from "next/head";
import InputElement from "../components/forms/input";
import authResolver from "../presentation/resolvers/auth.resolver";
import authActions from "../presentation/actions/auth.actions";
import { useState } from "react";

export default function Reset() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <Head>
        <title>Reset password</title>
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
                    src="./logo/Logo_512x512.svg"
                    alt="Reelpic logo"
                    width="48"
                    height="48"
                  />
                </div>
              </div>
              <p className="text-center text-subheading">Reset your password</p>
            </div>
            <div className="mt-7">
              {/* Form element and inputs */}
              <form
                className="w-full min-h-[280px]"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target.elements;
                  let email = form["email"].value;
                  authResolver(authActions.RESET, { email })
                    .then(() => {})
                    .catch(() => {});

                  setSent((prevState) => !prevState);
                }}
              >
                <div className="space-y-4 mb-4">
                  <input
                    placeholder="Email"
                    type="text"
                    id="email"
                    name="email"
                    className="h-12 w-full border px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark"
                  />
                  <button
                    type="submit"
                    className={` ${
                      sent
                        ? "block w-full mx-auto transition duration-200 py-[14px] rounded-md text-white text-lg bg-gray-300 cursor-not-allowed"
                        : "btn-primary hover:bg-[#4900EB]"
                    }`}
                    disabled={sent}
                  >
                    Reset password
                  </button>

                  {sent ? (
                    <p className="text-center text-sm font-bold">
                      Check your email on instructions for changing your
                      password
                    </p>
                  ) : (
                    <p className="text-center text-sm">
                      Please enter the email your registered with. <br />
                      More instructions would be sent there
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
