import { useState } from "react";
import Image from "next/image";
import { MdArrowBack, MdComment, MdThumbUp } from "react-icons/md";
import profile1 from "../assets/images/Profile1.png";

export default function Comment() {
  const [comments, updateComments] = useState([{}]);
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
      <div className="text-dark-default/75">
        <CommentBlock />
      </div>
    );
  };

  if (showReply) {
    return (
      <div className="space-y-4">
        <div className="space-y-1 bg-gray-200 p-4">
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
    );
  } else {
    return (
      <div className="space-y-2 p-4">
        <h3 className="text-subheading">Comments</h3>
        <CommentBlock />
        <p
          className="text-sm cursor-pointer link"
          onClick={() => toggleReply(!showReply)}
        >
          Show replies
        </p>
      </div>
    );
  }
}
