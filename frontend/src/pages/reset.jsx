import Head from "next/head";
import InputElement from "./components/formElements/Input";

export default function Register() {
  return (
    <>
      <Head>
        <title>Reset password</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/pattern_bg.png')] bg-cover">
        <div className="relative container mx-auto flex z-10 h-screen px-4">
          <div className="items-center bg-white max-w-[380px] w-full mx-auto my-auto rounded-xl px-[22px] lg:px-16 py-[35px] lg:py-[55px]">
            <div className="space-y-3 lg:space-y-7">
              <h1 className="text-heading text-center">Reelpic</h1>
              <p className="text-center text-subheading">Reset your password</p>
            </div>
            <div className="mt-7 w-full">
              {/* Form element and inputs */}
              <form className="w-full min-h-[280px]">
                <div className="space-y-4 mb-4">
                  <InputElement type="email" placeholder="Email" name="email" />
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
