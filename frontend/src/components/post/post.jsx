import React from "react";
import Carousel from "../carousel";
import profile1 from "../../assets/images/Profile1.png";
import Comment from "../comment";
import { useState } from "react";
import { MdLink } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import prettyTime from "pretty-time";
import { IoChatbox, IoHeart, IoTrendingUp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import postResolver from "../../presentation/resolvers/post.resolver";
import { setAlert, configureAlert } from "../../store/features/uiSlice";

export default function Post({
  _id,
  user,
  likes,
  views,
  created,
  tags,
  content,
}) {
  const [commentsShown, toggleComments] = useState(false);
  const updateComments = (arr) => {
    content.comments = arr;
  };
  const userLikes = useSelector((state) => state.user.likes) || [];
  const rejected = useSelector((state) => state.user.rejected);
  const dispatch = useDispatch();

  //userLikes is an array corresponding to the user's liked posts
  return (
    <div className="h-full">
      <div className="flex justify-between items-center border border-gray-100 p-2">
        <div className="flex gap-2 items-center relative">
          <Image
            alt="profile"
            src={user.photo || profile1}
            className="h-10 w-10"
          />
          <Link href={`/users/${user.username}`} className="text-label">
            @{user.username}
          </Link>
          <Link href="/as" className="text-primary-default text-sm">
            Follow
          </Link>
        </div>
        <MdLink
          className="h-18 w-auto pr-4 cursor-pointer"
          onClick={() => {
            navigator.clipboard.writeText(
              `${process.env.NEXT_PUBLIC_DOMAIN}/posts/${_id}`
            );
            console.log("Link copied to clipboard");
          }}
        />
      </div>
      <Carousel images={content.images} description={content.body} />
      <div className="border-gray-100 p-2 space-y-4">
        <div className="flex items-end justify-between">
          <div className="flex gap-4 mt-4 items-center">
            <div className="flex gap-2 items-center">
              <p className="flex items-center">
                <IoTrendingUp className="w-5 h-auto items-center cursor-pointer" />
              </p>
              <p className="text-sm">{views}</p>
            </div>
            <div className="flex gap-2 items-center">
              <p className="flex items-center">
                <IoHeart
                  onClick={async (e) => {
                    if (rejected) {
                      console.log(rejected);
                      dispatch(
                        configureAlert({
                          variant: "danger",
                          text: "Please login to interact with posts",
                          action: "login",
                        })
                      );
                      dispatch(setAlert(true));
                    }
                    e.target.classList.toggle("text-pink-500");
                    // await postResolver();
                  }}
                  className={`w-5 h-auto items-center cursor-pointer ${
                    userLikes.includes(_id) ? "text-pink-500" : ""
                  }`}
                />
              </p>
              <p className="text-sm">{likes}</p>
            </div>
            <div
              className="flex gap-2 items-center cursor-pointer"
              onClick={() => toggleComments((state) => !state)}
            >
              <p className="flex items-center">
                <IoChatbox className="w-5 h-auto" />
              </p>
              <p className="text-sm">{content.commentCount}</p>
            </div>
          </div>

          <p className="text-dark-default/70 text-sm font-light">
            {prettyTime(Date.parse(created))} ago
          </p>
        </div>
        {commentsShown ? (
          <Comment
            updateCommentIds={updateComments}
            commentIds={content.comments}
            postId={_id}
            toggleComments={toggleComments}
          />
        ) : null}
        <p className="text-dark-default/90">{content.body}</p>

        <div className="gap-2 flex">
          {tags.map((val, idx) => {
            return (
              <button
                key={idx}
                className="border rounded hover:text-primary-default/80 transition duration-200 border-primary-default/50 py-2 px-4"
              >
                {val}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
