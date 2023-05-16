import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
const router = useRouter();
useEffect(() => {
  let token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
  } else {
    router.push("/home");
  }

  
  router.push("/login");
});

  return null;
}
