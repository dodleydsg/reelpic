import ScrollCard from "../components/scrollCard";

import Post from "../components/post/post";

import NavbarTemplate from "../templates/template_with_navbar";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import Image from "next/image";
import { useState } from "react";
import { IoAdd, IoClose } from "react-icons/io5";
import AddPost from "../components/post/addPost";

export default function Home() {
  // trigger for opening and closing fields for adding posts
  const [addPost, toggleAddPost] = useState(true);

  return (
    <>
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Home"
      >
        <div className="space-y-4">
          <div className="mt-20 lg:mt-0">
            <h3 className="text-subheading mt-3">Trending catalogues</h3>
            <ScrollCard />
          </div>
          <div className="sticky h-auto top-0 z-[51] bg-white">
            <div className="lg:flex py-2  w-full justify-between hidden items-center ">
              <div className="flex items-center justify-between gap-4">
                <Image src={profile} height="40" width="40" alt="profile_pic" />
                <p className="text-dark-default/80">
                  {!addPost
                    ? "Never too late to share an experience"
                    : "Create Post"}
                </p>
              </div>
              <button
                onClick={() => {
                  toggleAddPost(!addPost);
                  let container = document.querySelector(
                    "#createPostContainer"
                  );
                  container.classList.toggle("scale-y-0");
                }}
                className="p-4 rounded border-primary-default/20 hover:bg-light-default flex border"
              >
                {!addPost ? (
                  <IoAdd className="w-6 h-auto text-primary-default" />
                ) : (
                  <IoClose className="w-6 h-auto text-danger-default" />
                )}
              </button>
            </div>
            <div
              id="createPostContainer"
              className="origin-top p-2 border border-gray-300 bg-inherit absolute inset-x-0 transition-all duration-300 hidden m-0 lg:block"
            >
              <AddPost />
            </div>
          </div>
          <div className="space-y-4">
            <Post />
            <Post />
          </div>
        </div>
      </NavbarTemplate>
    </>
  );
}
