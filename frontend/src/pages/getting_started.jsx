import Head from "next/head";
import InputElement from "./components/formElements/Input";
import Link from "next/link";

export default function Reset() {
  return (
    <>
      <Head>
        <title>Reelpic | Getting started</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/Home_bg.png')] bg-cover">
        <div className="absolute left-0 right-0 bottom-0 top-0 opacity-50 bg-gradient-to-b from-black to-[rgb(0,0,0,.5)]"></div>
        <div className="relative container mx-auto flex z-10 h-screen px-4">
          <div className="items-center bg-white max-w-3xl mx-auto my-auto rounded-xl px-[22px] lg:px-16 py-[35px] lg:py-[55px]">
            <div className="space-y-3 lg:space-y-7">
              <h1 className="text-heading text-center">Reelpic</h1>
              <p className="text-center text-subheading">
                What are you interested in ?
              </p>
            </div>
            <div className="mt-7">
              {/* Form element and inputs */}
              <form className="w-full grid grid-cols-1 lg:grid-cols-2  lg:min-h-[280px] lg:divide-x-2 "></form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
