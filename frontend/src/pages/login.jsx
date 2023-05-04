import Head from "next/head";
import Link from "next/link";
import LoginForm from "../components/forms/loginForm";
import { useRouter } from "next/router";

export default function Reset() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Login | Welcome back to Reelpic</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/pattern_bg.png')] bg-cover">
        <div className="relative container mx-auto flex z-10 h-screen px-4">
          <div className="items-center bg-white max-w-3xl mx-auto my-auto rounded-xl px-[22px] sm:px-16 py-[35px] sm:py-[55px] w-full">
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
                Login to access your account
              </p>
            </div>
            <div className="mt-7">
              <LoginForm router={router} />
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
