import NavbarTemplate from "../templates/template_with_navbar";
import Mask from "../components/mask";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import { useRouter } from "next/router";
import { IoChevronBack } from "react-icons/io5";
import { useState } from "react";
import food from "../assets/images/food.jpg";
import Image from "next/image";
import { useSelector } from "react-redux";
import { CompleteLogin } from "../components/requireLogin";
import postResolver from "../presentation/resolvers/post.resolver";
import postActions from "../presentation/actions/post.actions";
import { readCookie } from "../utils/cookie";
import { useEffect } from "react";

const TABS = ["posts", "catalogues"];

function Profile() {
  const { user } = useSelector((state) => state.user);
  const [activeTab, toggleTab] = useState("posts");
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const token = readCookie("token");
    const getPosts = async () => {
      postResolver(postActions.LIST_POSTS, token)
        .then(({ data }) => {
          setPosts(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getPosts();
  }, []);

  const TopTab = () => (
    <div className="sticky z-20 lg:top-0 top-[72px]  py-4 bg-white">
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
                <p className="text-sm text-dark-default/80">{user.followers}</p>
              </div>
              <div className="flex gap-4 flex-col items-center">
                <p>Following</p>
                <p className="text-sm text-dark-default/80">{user.following}</p>
              </div>
            </div>
            <p className="max-w-sm self-center text-justify text-dark-default/90 text-sm text-dark">
              {user.bio}
            </p>
          </div>
          <TopTab />
          {activeTab === "posts" ? (
            <div>
              <div className="grid grid-cols-2 gap-2 lg:gap-4 lg:grid-cols-4">
                {posts.map((val) => {
                  return (
                    <Image
                      width="500"
                      height="300"
                      src={val.content.images[0]}
                    />
                  );
                })}
                {posts.length === 0 ? (
                  <h1 className="text-center">You have no posts</h1>
                ) : null}
              </div>
            </div>
          ) : null}
          {activeTab === "catalogues" ? (
            <h1 className="text-center ">Coming Soon !!!</h1>
          ) : null}
        </div>
      </NavbarTemplate>
    </>
  );
}

export default () => (
  <CompleteLogin>
    <Profile />
  </CompleteLogin>
);
