import { useState } from "react";
import Image from "next/image";
import { MdArrowBack, MdComment, MdThumbUp } from "react-icons/md";
import profile1 from "../assets/images/Profile1.png";
import { IoSend } from "react-icons/io5";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Comment() {
  const [comments, updateComments] = useState([{}]);
  const { loggedIn } = useSelector((state) => state.auth);
  const [showReply, toggleReply] = useState(false);

  const CommentBlock = () => {
    return (
      <div className="border-1 ">
        <div className="flex justify-start items-center gap-2">
          <Image className="w-6 h-6 rounded-[24px]" src={profile1} />
          <p className="text-sm text-dark-default/80">Walter White</p>
          <p className="text-xs text-dark-default/60">12h ago</p>
        </div>
        <div className="text-sm py-2 text-justify">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Odio itaque
          officiis animi culpa ab earum, aspernatur nobis, quae corporis ullam
          ipsum laborum eaque laudantium, veritatis dignissimos nam voluptates.
          Libero, possimus?
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-4 items-center justify-between">
            <div className="flex items-center gap-2">
              <MdThumbUp className="w-4 h-auto" />
              <span className="text-xs text-dark-default/75">1.2k</span>
            </div>
            <div className="flex  items-center gap-2">
              <MdComment className="w-4 h-auto" />
              <span className="text-xs text-dark-default/75">43</span>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    );
  };

  const Reply = () => {
    return (
      <div className="text-dark-default/75 ">
        <CommentBlock />
      </div>
    );
  };

  if (!loggedIn) {
    return (
      <div className="bg-white p-4">
        <p className="gap-2 flex">
          <Link className="link" href="/login">
            Login
          </Link>
          to comment
        </p>
      </div>
    );
  }

  if (showReply) {
    return (
      <div className="py-2">
        <div className="space-y-4 px-1 pb-10 overflow-y-scroll max-h-52">
          <div className="space-y-1 bg-light-default">
            <div className="flex gap-4 items-center">
              <MdArrowBack
                className="w-4 h-auto cursor-pointer"
                onClick={() => toggleReply(!showReply)}
              />
              <h3 className="text-subheading">Replies </h3>
            </div>
            <CommentBlock />
          </div>
          <div className="ml-12">
            <Reply />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="px-1 space-y-1 py-2">
        <div className="space-y-2 mb-4 overflow-y-scroll max-h-52">
          <h3 className="text-subheading">Comments</h3>
          <CommentBlock />
          <p
            className="text-sm cursor-pointer link"
            onClick={() => toggleReply(!showReply)}
          >
            Show replies
          </p>
        </div>
        <form action="#" className="flex gap-4 w-full">
          <textarea
            rows="1"
            placeholder="Add comment"
            className=" resize-none px-2 bg-gray-100 py-2 grow h-10 rounded focus:outline-0 focus:ring-2 focus:ring-primary-default/50"
          />
          <button className="h-full rounded-sm flex shrink-0 p-3 items-center justify-center  text-primary-default">
            <IoSend className="w-4 h-auto" />
          </button>
        </form>
      </div>
    );
  }
}
