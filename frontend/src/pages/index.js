import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
const router = useRouter();
useEffect(() => {


  const app = initializeApp(firebaseConfig);
  
  router.push("/register");
});

  return (
    <>
      <Head>
        <title>Reelpic | Register</title>
      </Head>
    </>
  );
}
