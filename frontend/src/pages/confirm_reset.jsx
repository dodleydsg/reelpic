import Head from "next/head";
import InputElement from "../components/forms/input";
import ConfirmResetForm from "../components/forms/confirmResetForm";

export default function ConfirmReset() {
  return (
    <>
      <Head>
        <title>Set new password</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/pattern_bg.webp')] flex items-center bg-cover">
        <div className="p-2 w-full">
          <div className=" items-center bg-white min-h-[50vh] max-w-xl mx-auto my-auto rounded-xl px-[22px] sm:px-16 py-[35px] sm:py-[55px] w-full">
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
              <p className="text-center text-subheading">
                Create a new password
              </p>
            </div>
            <div className="mt-7">
              <ConfirmResetForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
