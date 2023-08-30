//Init does initial state checking and verifies if user is logged in.
// It also does proper routing in the any case of error

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "./loadingScreen";
import { getUser } from "../store/features/userSlice";
import { readCookie } from "../utils/cookie";

export function CompleteLogin({ children }) {
  //Complete Login means user has completed creating account and is loggedIn
  const router = useRouter();
  const { pending, rejected, loggedIn, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      const token = readCookie("token");
      if (token) {
        dispatch(getUser({ token }));
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log("Error here");
      router.push("/login");
    }
  }, [loggedIn]);

  if (pending) {
    return <LoadingScreen />;
  }
  // pending should be checked before rejection else, might result in cyclic login attempts
  else if (rejected) {
    router.push("/login");
  } else if (user.username.trim() === "") {
    router.push("/getting_started");
  } else {
    return <>{children}</>;
  }
}

export function PartialLogin({ children }) {
  //Complete Login means user has completed creating account and is loggedIn
  const router = useRouter();
  const { pending, rejected, loggedIn, user } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const token = readCookie("token");
      if (token) {
        dispatch(getUser({ token }));
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
  else if (rejected) {
    router.push("/login");
    // partial login doesn't check for email availability
  }else if (user.username.trim()) {
      router.push("/home");
    
  } else {
    return <>{children}</>;
  }
}
