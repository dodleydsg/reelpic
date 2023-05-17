import NavbarTemplate from "../templates/template_with_navbar";
import template1 from "../assets/images/1.png";
import template2 from "../assets/images/2.png";
import template3 from "../assets/images/3.png";
import Mask from "../components/mask";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import { useRouter } from "next/router";
import { IoChevronBack } from "react-icons/io5";
import { useState } from "react";
import food from "../assets/images/food.jpg";
import Image from "next/image";
import { getUser } from "../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/loadingScreen";
import { useEffect } from "react";

const TABS = ["posts", "catalogues"];

export default function Profile() {
  const { pending, rejected, user } = useSelector((state) => state.user);
  const [activeTab, toggleTab] = useState("posts");
  const router = useRouter();
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
  }, []);
  /// User hasn't completed the registration process

  const TopTab = () => (
    <div className="sticky z-20 top-[72px] lg:top-0  py-4 bg-white">
      <div className="flex  p-2 mx-auto justify-around items-center gap-4 bg-light-default border-2">
        {TABS.map((val, idx) => {
          let classes = "px-4 py-2 rounded cursor-pointer";
          if (val === activeTab) {
            classes += " bg-gray-300";
          }
          return (
            <p key={idx} className={classes} onClick={() => toggleTab(val)}>
              {val.charAt(0).toLocaleUpperCase() + val.substring(1)}
            </p>
          );
        })}
      </div>
    </div>
  );
  if (pending || rejected) {
    return <LoadingScreen />;
  }
  return (
    <>
      <Mask />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Profile"
        pageTitle="My profile"
      >
        <div className="space-y-4 py-4 relative">
          <IoChevronBack
            onClick={() => router.back()}
            className="cursor-pointer text-dark-default text-lg lg:text-2xl"
          />

          <div className="flex flex-col justify-center space-y-4">
            <div className="gap-2 self-center flex flex-col items-center">
              <NavbarProfile image={profile} />
              <p className="text-sm text-medium text-dark-default">
                Stephen King
              </p>
              <p className="text-xs text-dark-default/80">@{user.username}</p>
            </div>
            <div className="flex max-w-lg self-center justify-between gap-12 px-6">
              <div className="flex gap-4 flex-col items-center">
                <p>Followers</p>
                <p className="text-sm text-dark-default/80">12k</p>
              </div>
              <div className="flex gap-4 flex-col items-center">
                <p>Following</p>
                <p className="text-sm text-dark-default/80">673</p>
              </div>
            </div>
            <p className="max-w-sm self-center text-justify text-dark-default/90 text-sm text-dark">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis,
              ea dolor deleniti excepturi culpa consectetur debitis earum
              aperiam accusantium veniam aut, illum sunt totam? Ad vel
              repudiandae ut aperiam distinctio.
            </p>
          </div>
          <TopTab />
          {activeTab === "posts" ? (
            <div>
              <div className="grid grid-cols-2 gap-2 lg:gap-4 lg:grid-cols-4">
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
                <Image src={food} alt="food" />
              </div>
            </div>
          ) : null}
          {activeTab === "catalogues" ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 ">
              <div className="relative hover:cursor-pointer col-span-1  hover:scale-95 transition duration-300">
                <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
                <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
                  <p className="text-body">Family</p>
                </div>
                <Image
                  src={template1}
                  className="h-[150px] object-cover rounded-md w-full"
                />
              </div>
              <div className="relative hover:cursor-pointer col-span-1  hover:scale-95 transition duration-300">
                <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
                <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
                  <p className="text-body">Design</p>
                </div>
                <Image
                  src={template2}
                  className="h-[150px] object-cover rounded-md w-full"
                />
              </div>
              <div className="relative hover:cursor-pointer col-span-1  hover:scale-95 transition duration-300">
                <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
                <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
                  <p className="text-body">Nature</p>
                </div>
                <Image
                  src={template3}
                  className="h-[150px] object-cover rounded-md w-full"
                />
              </div>
            </div>
          ) : null}
        </div>
      </NavbarTemplate>
    </>
  );
}
