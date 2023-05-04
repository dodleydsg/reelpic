import Head from "next/head";
import InputElement from "../components/forms/input";

export default function Register() {
  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/pattern_bg.png')] bg-cover">
        <div className="relative container mx-auto flex z-10 h-screen px-4">
          <div className="items-center bg-white max-w-[380px] w-full mx-auto my-auto rounded-xl px-[22px] sm:px-16 py-[35px] sm:py-[55px]">
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
            <div className="mt-7 w-full">
              {/* Form element and inputs */}
              <form className="w-full min-h-[280px]">
                <div className="space-y-4 mb-4">
                  <InputElement
                    type="email"
                    className="w-full"
                    placeholder="Email"
                    name="email"
                  />
                  <button className="btn-primary hover:bg-[#4900EB]">
                    Reset password
                  </button>
                  <p className="text-center text-sm">
                    Please enter the email your registered with. <br />
                    More instructions would be sent there
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
