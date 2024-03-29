import Head from "next/head";
import Link from "next/link";
import RegisterForm from "../components/forms/registerForm";

export default function Register() {
  return (
    <>
      <Head>
        <title>Reelpic | Complete to join the community</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/Home_bg.webp')] bg-cover flex items-center">
        <div className="p-2 w-full">
          <div className="bg-white max-w-3xl mx-auto my-auto rounded-xl px-[22px] sm:px-16 py-[35px] sm:py-[55px] w-full">
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
              <h3 className="text-lg text-center font-medium text-pink-500">
                Register and start sharing
              </h3>
            </div>
            <div className="mt-7">
              <RegisterForm />
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
