import Head from "next/head";
import InputElement from "./components/formElements/Input";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <Head>
        <title>Register to continue</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/Home_bg.png')] bg-cover">
        <div className="absolute left-0 right-0 bottom-0 top-0 opacity-50 bg-gradient-to-b from-black to-[rgb(0,0,0,.5)]"></div>
        <div className="relative container mx-auto flex z-10 h-screen">
          <div className="items-center bg-white max-w-3xl mx-4 sm:mx-auto  my-auto rounded-xl px-[22px] lg:px-16 py-[35px] lg:py-[55px]">
            <div className="space-y-3 lg:space-y-7">
              <h1 className="text-heading text-center">Reelpic</h1>
              <p className="font-semibold hidden lg:block text-center text-subheading">
                Join us to share your moments
              </p>
              <p className="font-semibold text-center text-label lg:hidden">
                Login to access your account
              </p>
            </div>
            <div className="mt-7">
              {/* Form element and inputs */}
              <form className="w-full grid grid-cols-1 lg:grid-cols-2  lg:min-h-[280px] lg:divide-x-2 ">
                <div className="space-y-4 lg:pr-6 mb-4">
                  <InputElement type="email" placeholder="Email" name="email" />
                  <InputElement
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                  <button className="btn-primary hover:bg-[#4900EB]">
                    Get started
                  </button>
                  <Link href="./reset" className="text-center block link">
                    Forgot password
                  </Link>
                </div>
                <div className="space-y-4 lg:pl-6">
                  <button className="btn-google hover:bg-[#DA3925]">
                    Sign up with Google
                  </button>
                  <button className="btn-apple ">Sign up with Apple</button>
                </div>
              </form>
              <p className="text-sm text-center mt-7">
                {" "}
                Already have an account ? <br />
              </p>
              <Link href="./login" className="block text-center mt-4 link">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
