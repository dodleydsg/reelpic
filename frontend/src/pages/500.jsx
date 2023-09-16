import Link from "next/link";
import Head from 'next/head'
export default function(){
    return  <>
    <Head>
      <title>Page doesn't exist</title>
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
          </div>
         <div className="text-center my-8 space-y-4">
         <p className="text-xl">The page you requested for doesn't exists 😞😞</p>         
          <p>Please visit <Link className="link" href='/home'>home</Link> to continue your exploration</p>
         </div>
        </div>
      </div>
    </div>
  </>
}
