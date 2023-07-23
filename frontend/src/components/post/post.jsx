import React from "react";
import Carousel from "../carousel";
import profile1 from "../../assets/images/Profile1.png";
import template from "../../assets/images/food.jpg";
import Comment from "../comment";
import { useState } from "react";
import { MdLink } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import prettyTime from "pretty-time";
import {
  IoChatbox,
  IoEye,
  IoEyeOutline,
  IoHeart,
  IoTrendingUp,
} from "react-icons/io5";
import { useSelector } from "react-redux";

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
  const userLikes = useSelector((state) => state.user.likes);
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
        <MdLink className="h-18 w-auto pr-4" />
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
                  className={`w-5 h-auto items-center cursor-pointer ${userLikes.includes(
                    _id
                  )}`}
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
