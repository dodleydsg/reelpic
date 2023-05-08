import Head from "next/head";

import { useSelector } from "react-redux";

export default function ({ children, pageTitle }) {
  const { addPost, addCatalogue } = useSelector((state) => state.ui);

  // trigger for opening and closing fields for adding posts

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div
        className={`w-screen h-screen relative container p-4 max-w-full ${
          addPost || addCatalogue ? "overflow-hidden lg:overflow-auto" : ""
        }`}
      >
        <div
          id="mainContent"
          className="lg:col-span-3 overflow-y-visible lg:overflow-y-scroll pb-40  relative gap-4"
        >
          <div className="space-y-4 ">
            <div className="space-y-4 ">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
