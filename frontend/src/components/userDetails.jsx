import { useRouter } from "next/router";
import { useState } from "react";
import { IoChevronBack, IoImages, IoPencil, IoTrash } from "react-icons/io5";
import NavbarProfile from "./navBar/navBarProfile";
import Image from "next/image";
import Link from "next/link";
import UserCard from "../components/userCard";
import userResolver from "../presentation/resolvers/user.resolver";
import userActions from "../presentation/actions/user.actions";
import { readCookie } from "../utils/cookie";

let followers = [
  {
    _id: 1,
    followers: [1, 2, 3],
    following: [1, 2, 3, 3, 4, 3, 21],
    username: "dodley",
    photo: "",
  },
  {
    _id: 1,
    followers: [1, 2, 3.1, 2, 1, 2, 1],
    following: [1, 2, 3],
    username: "dodley",
    photo: "",
  },
  {
    _id: 1,
    followers: [1, 2, 3, 1],
    following: [1, 2, 3, 1, 2, 12, 2, 1, 21, 122],
    username: "dodley",
    photo: "",
  },
  {
    _id: 1,
    followers: [1, 2, 3],
    following: [1, 2, 3],
    username: "dodley",
    photo: "",
  },
];

const TABS = ["posts", "followers", "following"];

function UserDetails({ authUser, user }) {
  const [activeTab, toggleTab] = useState("posts");
  const router = useRouter();

  const follow = async (follow) => {
    userResolver(userActions.FOLLOW, readCookie("token"), {
      target: user._id,
      _id: authUser._id,
      action: follow ? "follow" : "unfollow",
    })
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  
  const FollowButton = ({ authUser, user }) => {
    if (authUser) {
      if (authUser._id === user._id) {
        return null;
      }
      if (authUser.followers.includes(user._id)) {
        return (
          <div className="text-center">
            <span>Follows you</span>
            <button
              onClick={() => follow(true)}
              className="btn-primary hover:bg-[#4900EB]"
            >
              Follow back
            </button>
          </div>
        );
      }
      
      for(let i=0; i<user.followers.length; i++){
        if(user.followers[i]._id === authUser._id){
          return <button
          onClick={() => follow(false)}
          className="btn-primary max-w-sm hover:bg-[#4900EB]"
        >
          Unfollow
        </button>
        }
      }
      return (
        <button
        onClick={()=> follow(true)}
        className="btn-primary max-w-sm inline-block hover:bg-[#4900EB]">
          Follow
        </button>
      );
    } else {
      return null;
    }
  };

  const TopTab = () => (
    <div className="sticky z-20 lg:top-0 top-0  py-4 bg-white">
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
      <div className="space-y-4 py-4 relative">
        <IoChevronBack
          onClick={() => router.back()}
          className="cursor-pointer text-dark-default text-lg lg:text-2xl"
        />

        <div className="flex flex-col justify-center space-y-4">
          <div className="gap-2 self-center flex flex-col items-center">
            <NavbarProfile image={user.photo} />

            <p className="text-xs text-dark-default/80">@{user.username}</p>
          </div>
          <div className="flex max-w-lg self-center justify-between gap-12 px-6">
            <div className="flex gap-4 flex-col items-center">
              <p>Followers</p>
              <p className="text-sm text-dark-default/80">
                {user.followers.length}
              </p>
            </div>
            <div className="flex gap-4 flex-col items-center">
              <p>Following</p>
              <p className="text-sm text-dark-default/80">
                {user.following.length}
              </p>
            </div>
          </div>
          <FollowButton authUser={authUser} user={user} />
          <p className="max-w-sm self-center text-justify text-dark-default/90 text-sm text-dark">
            {user.bio}
          </p>
        </div>
        <TopTab />
        {activeTab === "posts" ? (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 lg:grid-cols-4">
              {user.posts.map((val) => {
                return (
                  <>
                    {val.content.images.length > 1 &&
                    authUser._id === user._id ? (
                      <Link
                        key={val._id}
                        href={`/post/${val._id}`}
                        className="relative"
                      >
                        <div className="absolute inset-0 flex items-end">
                          <div className="p-2 w-full bg-dark-default/80 flex justify-between">
                            <IoImages className="h-auto w-8 text-white" />
                            <div className="flex gap-2">
                              <button className="p-2 rounded-sm bg-gray-100/50 hover:bg-gray-100 hover:text-danger-default/80 transition duration-200">
                                <IoTrash />
                              </button>
                              <button className="p-2 rounded-sm bg-gray-100/50 hover:bg-gray-100 hover:text-primary-default/80 transition duration-200">
                                <IoPencil />
                              </button>
                            </div>
                          </div>
                        </div>
                        <Image
                          width="500"
                          height="300"
                          src={val.content.images[0]}
                        />
                      </Link>
                    ) : (
                      <Link key={val._id} href={`/post/${val._id}`}>
                        <Image
                          width="500"
                          height="300"
                          src={val.content.images[0]}
                        />
                      </Link>
                    )}
                  </>
                );
              })}
              {user.posts.length === 0 ? (
                <h1 className="text-center">You have no posts</h1>
              ) : null}
            </div>
          </div>
        ) : null}
        {activeTab === "followers" ? (
          <>
            <h1 className="text-center ">Following</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {followers.map((val) => {
                return <UserCard {...val} />;
              })}
            </div>
          </>
        ) : null}
        {activeTab === "following" ? (
          <h1 className="text-center">Here lies ur followers</h1>
        ) : null}
      </div>
    </>
  );
}



export default UserDetails;
