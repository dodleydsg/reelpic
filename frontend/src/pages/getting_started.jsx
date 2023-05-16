import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, use } from "react";
import InputElement from "../components/forms/input";
import { useRouter } from "next/router";
import { getUser, setToken } from "../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const MAX_STEP = 2;

export default function Reset() {
  const { email } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [interests, toggleInterests] = useState("reelpic");
  const [step, updateStep] = useState(1);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    } catch {
      router.push("/login");
    }
    dispatch(getUser(token));
  });

  const formSubmit = async (e) => {
    let token = null;
    try {
      token = localStorage.getItem("token");
    } catch (error) {
      // console.log(error)
    }
    const resp = await axios({
      method: "post",
      url: `${process.env.BACKEND_DOMAIN}/api/user/`,
      data: {
        email: email,
        interests: interests,
        username: e.target.username,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    switch (resp.status) {
      case "404":
        ///do something
        break;
      case "401":
      //do something

      case "200":
        router.push("/home");
      // navigate home

      default:
        console.log("sad");
    }
  };

  function _updateStep(direction) {
    if (direction === "forward") {
      if (step < MAX_STEP) {
        updateStep(step + 1);
      }
    } else {
      if (step > 1) {
        updateStep(step - 1);
      }
    }
  }

  function _toggleInterests(e) {
    let items = interests;
    items = items.split(",");
    if (e.target.dataset["selected"] === "true") {
      e.target.classList.remove(
        "ring-primary-default",
        "ring-1",
        "ring-offset-2"
      );

      e.target.dataset["selected"] = "false";
      items = items.filter((val) => {
        if (val === e.target.dataset["value"] || val === "") {
          return false;
        }
        return true;
      });
      toggleInterests(items.join(","));
    } else {
      e.target.classList.add("ring-primary-default", "ring-1", "ring-offset-2");

      items.push(e.target.dataset["value"]);
      toggleInterests(items.join(","));
      e.target.dataset["selected"] = "true";
    }
  }

  return (
    <>
      <Head>
        <title>Getting started | Lets know more about you</title>
      </Head>
      <div className="relative font-sans mx-auto min-h-screen bg-[url('../assets/images/Home_bg.webp')] bg-cover bg-blend-screen flex items-center">
        <div className="absolute inset-0 opacity-50 bg-gradient-to-b from-black to-[rgb(0,0,0,.5)] flex items-center"></div>
        <div className="p-2 w-full relative z-10">
          <div className="items-center bg-white min-h-[540px] max-w-xl lg:h-3/5 mx-auto my-auto rounded-xl px-[22px] lg:px-16 py-[35px] lg:py-[55px]">
            <div className="space-y-3 lg:space-y-7 sm:px-20">
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

              {step === 1 ? (
                <div className="space-y-2">
                  <p className="text-center text-subheading">
                    Choose a username
                  </p>
                  <form className="h-auto  flex gap-4 flex-col items-center">
                    <label htmlFor="username" className="sr-only">
                      Choose a username
                    </label>
                    <InputElement
                      className="w-full"
                      id="username"
                      type="text"
                      placeholder="Username"
                    />
                    <span className="text-xs font-light text-dark-default">
                      This is what is going to be used as your main handle, but
                      it can be changed later
                    </span>
                  </form>
                </div>
              ) : null}
              {step === 2 ? (
                <div className="lg:space-y-4 space-y-2">
                  <p className="text-center text-subheading">
                    What are you interested in ?
                  </p>
                  <ul
                    className="list-none grid text-light-default font-light text-sm grid-cols-3 gap-2"
                    data-items={interests}
                  >
                    <li
                      onClick={_toggleInterests}
                      data-selected="false"
                      data-value="photography"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-red-300 p-4"
                    >
                      Photography
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="tech"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#2D0F75] p-4"
                    >
                      Tech
                    </li>{" "}
                    <li
                      onClick={_toggleInterests}
                      data-value="design"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#3D367B] p-4"
                    >
                      Design
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="architecture"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#6a83d0] p-4"
                    >
                      Architecture
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="art"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#CF8E2E] p-4"
                    >
                      Art
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="cinema"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#E33194] p-4"
                    >
                      Cinema
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="landscapes"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#8B8110] p-4"
                    >
                      Landscapes
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="cuisines"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#42A16B] p-4"
                    >
                      Cuisines
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="AI"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#121283] p-4"
                    >
                      AI
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="Nature"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#417E41] p-4"
                    >
                      Nature
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="Automobiles"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#A2A3B8] p-4"
                    >
                      Automobiles
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="Culture"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#909C22] p-4"
                    >
                      Culture
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="people"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#128EED] p-4"
                    >
                      People
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="Fashion"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#B2056C] p-4"
                    >
                      Fashion
                    </li>
                    <li
                      onClick={_toggleInterests}
                      data-value="Hobbies"
                      data-selected="false"
                      className="cursor-pointer hover:contrast-150 transition duration-300 flex items-center justify-center rounded col-span-1 bg-[#31DD32] p-4"
                    >
                      Hobbies
                    </li>
                  </ul>
                </div>
              ) : null}
              <div
                className={`flex items-center gap-2 ${
                  step === 1 ? "justify-center" : "justify-between"
                }`}
              >
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    _updateStep("backward");
                  }}
                  href="#"
                  className={`link pl-4 w-full block items-center col-span-1 justify-start ${
                    step === 1 ? "hidden" : ""
                  }`}
                >
                  Back
                </Link>
                <Link
                  href="#"
                  onClick={(e) => {
                    if (step === MAX_STEP) {
                      //validate data, submite to database and send to home
                      router.push("/home");
                    } else {
                      e.preventDefault();
                      _updateStep("forward");
                    }
                  }}
                  className="btn-primary col-span-1 block text-center justify-self-end hover:bg-[#4900EB] w-full px-6 mx-0 col-offset-1"
                >
                  {step === MAX_STEP ? "Get started" : "Next"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
