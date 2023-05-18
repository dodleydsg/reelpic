//Init does initial state checking and verifies if user is logged in.
// It also does proper routing in the any case of error

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../components/loadingScreen";
import { getUser } from "../store/features/userSlice";

export default function authLayout() {
  return function getLayout(page) {
    return <Init>{page}</Init>;
  };
}

export function Init({ children }) {
  const router = useRouter();
  const { pending, rejected, loggedIn } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const id = localStorage.getItem("id");
      if (token && id) {
        dispatch(getUser({ token, id }));
      } else {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
  }, [loggedIn]);

  if (pending) {
    return <LoadingScreen />;
  }
  // pending should be checked before rejection else, might result in cyclic login attempts
  if (rejected) {
    router.push("/login");
  }

  if()
  return <>{children}</>;
}
