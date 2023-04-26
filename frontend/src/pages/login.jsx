import Head from "next/head";
import InputElement from "../components/form/input";
import Link from "next/link";

export default function Reset() {
  return (
    <>
      <Head>
        <title>Reelpic | Login</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/pattern_bg.png')] bg-cover">
        <div className="relative container mx-auto flex z-10 h-screen px-4">
          <div className="items-center bg-white max-w-3xl mx-auto my-auto rounded-xl px-[22px] sm:px-16 py-[35px] sm:py-[55px]">
            <div className="space-y-3 sm:space-y-7">
              <h1 className="text-heading text-center">Reelpic</h1>
              <p className="text-center text-subheading">
                Login to access your account
              </p>
            </div>
            <div className="mt-7">
              {/* Form element and inputs */}
              <form className="w-full grid grid-cols-1 sm:grid-cols-2  sm:min-h-[280px] sm:divide-x-2 ">
                <div className="space-y-4 sm:pr-6 mb-4">
                  <InputElement
                    type="email"
                    className="w-full"
                    placeholder="Email"
                    name="email"
                  />
                  <InputElement
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="w-full"
                  />
                  <Link href="/home" className="block">
                    <button className="btn-primary hover:bg-[#4900EB]">
                      Login
                    </button>
                  </Link>

                  <Link href="./reset" className="text-center block link">
                    Forgot password
                  </Link>
                </div>
                <div className="space-y-4 sm:pl-6">
                  <button className="btn-google hover:bg-[#DA3925]">
                    Login with Google
                  </button>
                  <button className="btn-apple ">Login with Apple</button>
                </div>
              </form>
              <p className="text-sm text-center mt-7">
                Not yet a member ? <br />
              </p>
              <Link href="./register" className="block text-center mt-4 link">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
