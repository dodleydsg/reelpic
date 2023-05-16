import Image from "next/image";
import InputElement from "../components/forms/input";
import NavbarTemplate from "../templates/template_with_navbar";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import UpdatePasswordForm from "../components/forms/updatePasswordForm";

const TABS = ["profile", "password", "display"];

export default function Settings() {
  const [activeTab, toggleTab] = useState("profile");
  const [interests, updateInterest] = useState([
    "cinema",
    "nature",
    "landscape",
    "people",
    "hobby",
    "culture",
    "scenery",
    "food",
  ]);

  const deleteInterest = (interest) => {
    updateInterest((interests) => {
      const updatedInterests = interests.filter((val) => val !== interest);
      return updatedInterests;
    });
  };

  const addInterest = (interest) => {
    if (interest === "") {
      return;
    }
    if (interests.includes(interest.toLowerCase())) {
      return interests;
    }
    updateInterest((interests) => {
      return [...interests, interest.toLocaleLowerCase()];
    });
  };
  const TopTab = () => (
    <div className="sticky top-[72px] lg:top-0 bg-white py-2">
      <div className="flex p-2 mx-auto justify-around items-center gap-4 bg-light-default border-2">
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

  const TabWrapper = ({ children }) => (
    <div className="py-6 border-2 h-full grow px-3 sm:px-6 lg:px-9 xl:px-12 2xl:px-24">
      {children}
    </div>
  );

  return (
    <>
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Settings"
        pageTitle="Settings | Configure the app to your liking"
      >
        <TopTab />
        {activeTab === TABS[0] ? (
          <TabWrapper>
            <h2 className="font-bold">Edit Profile</h2>
            <div className="flex flex-col items-center justify-start space-y-8 py-2">
              <div className="flex justify-center items-center flex-col">
                {/* Profile picture section */}

                <InputElement type="file" id="profileImg" className="hidden" />
                <label
                  htmlFor="profileImg"
                  className="flex items-center text-dark-default/80 text-sm cursor-pointer flex-col gap-2"
                >
                  <Image
                    alt="jj"
                    src={profile}
                    className="w-20 h-20 rounded-[40px]"
                  />
                  <span>Click to change profile</span>
                </label>
              </div>
              <div className=" flex gap-2 lg:gap-4 items-center">
                <label htmlFor="username" className="w-20 text-right">
                  Username
                </label>
                <InputElement
                  className="w-52 lg:w-72"
                  name="username"
                  type="text"
                />
              </div>
              <div className=" flex gap-2 lg:gap-4 items-center">
                <label htmlFor="bio" className="w-20 text-right">
                  Bio
                </label>
                <textarea
                  name="bio"
                  className="border w-52 lg:w-72 p-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark "
                  id=""
                  rows="5"
                ></textarea>
              </div>
              <div className="flex gap-2 lg:gap-4  items-center">
                <label htmlFor="interest" className="w-20 text-right">
                  Interests
                </label>
                <div className="w-52 lg:w-72 flex flex-wrap items-center gap-2">
                  <InputElement
                    name="interest"
                    id="interest"
                    type="text"
                    placeholder="Add another"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const interest =
                        e.target.parentNode.querySelector("input#interest") ||
                        document.getElementById("interest");
                      addInterest(interest.value);
                    }}
                    className="border block h-full px-4 py-2 rounded text-primary-default bg-light-default hover:text-dark-default transition"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-2 mt-4 flex-wrap">
                {interests.map((val) => {
                  return (
                    <div
                      key={val}
                      className="flex gap-1 items-center px-4 py-2 rounded border border-dark-default/60"
                    >
                      {val}
                      <MdClose
                        className="text-danger-default cursor-pointer"
                        onClick={() => deleteInterest(val)}
                      />
                    </div>
                  );
                })}
              </div>
              <button className="btn-primary w-40 hover:bg-primary-default/80 transition">
                Save Changes
              </button>
            </div>
          </TabWrapper>
        ) : null}
        {activeTab === TABS[1] ? (
          <TabWrapper>
            <h2 className="font-bold">Change Password</h2>
            <UpdatePasswordForm />
          </TabWrapper>
        ) : null}
        {activeTab === TABS[2] ? (
          <TabWrapper>
            <h2 className="font-bold">Display options</h2>
            <div className="flex flex-col items-center justify-start space-y-8">
              <div className="relative flex gap-2 lg:gap-4 items-center">
                <label htmlFor="language" className="w-20 text-right">
                  Language
                </label>
                <select
                  name="language"
                  className="w-52 lg:w-72 outline-none px-4 py-2 appearance-none border border-gray-300 rounded"
                >
                  <option value="English">English</option>
                </select>
              </div>
              <div className="relative flex gap-2 lg:gap-4 items-center">
                <label htmlFor="theme" className="w-20 text-right">
                  Theme
                </label>
                <select
                  name="theme"
                  className="w-52 lg:w-72 outline-none px-4 py-2 appearance-none border border-gray-300 rounded"
                >
                  <option value="system">System default</option>
                  <option value="dark">Dark</option>
                  <option value="light">Light</option>
                </select>
              </div>
            </div>

            <button className="mt-10  btn-primary w-40 hover:bg-primary-default/80 transition">
              Save Changes
            </button>
          </TabWrapper>
        ) : null}
      </NavbarTemplate>
    </>
  );
}
