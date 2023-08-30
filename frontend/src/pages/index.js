import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { readCookie } from "../utils/cookie";

export default function Home() {
const router = useRouter();
useEffect(() => {
  let token = readCookie("token");
  if (!token) {
    router.push("/login");
  } else {
    router.push("/home");
  }

  
  router.push("/login");
});

  return null;
}
