import { useEffect, useState } from "react";
import Image from "next/image";
import { MdArrowBack, MdComment, MdThumbUp } from "react-icons/md";
import profile1 from "../assets/images/Profile1.png";
import {
  IoArrowBack,
  IoChatbox,
  IoClose,
  IoRefresh,
  IoSend,
  IoThumbsDownOutline,
  IoThumbsUp,
  IoThumbsUpOutline,
} from "react-icons/io5";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import commentActions from "../actions/comment.actions";
import commentResolver from "../resolvers/comment.resolver";
import { configureAlert, setAlert } from "../store/features/uiSlice";

export default function Comment({
  postId,
  commentIds,
  toggleComments,
  profileImg,
}) {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector((state) => state.auth);
  const [showReply, setReply] = useState(true);
  const [replyObj, setReplyObj] = useState({});
  const [comments, setComments] = useState([]);

  /*  const commentItem = {
    id: String,
    likes: Number,
    body: String,
    replies: Array[commentItem],
    created: Date,


  } */
  const addComment = async (e) => {
    e.preventDefault();
    let userId = localStorage.getItem("id");
    let token = localStorage.getItem("token");
    commentResolver(commentActions.CREATE_COMMENT, userId, token, {
      body: "This is a sample comment",
      postId: postId,
    })
      .then((data) => {
        console.log(data);
        dispatch(
          configureAlert({
            variant: "success",
            text: "Comment added successfully",
          })
        );
      })
      .catch((error) => {
        console.log(error);

        dispatch(
          configureAlert({
            variant: "danger",
            text: "Couldn't add comment, check connection",
          })
        );
      });

    alert(document.querySelector("#body").value);
    e.target.reset();

    dispatch(setAlert(true));
  };

  const CommentContainer = ({ children }) => {
    return (
      <div className="overflow-y-scroll max-h-[50vh] py-4 border divide-y-2 space-y-2 border-1 rounded-sm">
        {children}
      </div>
    );
  };

  const CommentHeader = () => {
    return (
      <div className="flex px-2 justify-between items-center">
        {showReply ? (
          <div className="flex items-center gap-2">
            <span
              onClick={() => setReply(false)}
              className="p-2 bg-light-default hover:bg-gray-200 cursor-pointer transition rounded-full"
            >
              <IoArrowBack className="w-5 h-auto" />
            </span>
            <h6 className="font-medium text-lg text-pink-500">Replies</h6>
          </div>
        ) : (
          <div className="flex items-center">
            <h6 className="font-medium text-lg text-pink-500">Comments</h6>
          </div>
        )}
        <div className="flex items-center gap">
          <span
            onClick={() => toggleComments()}
            className="p-2 bg-light-default hover:bg-gray-200 cursor-pointer transition rounded-full"
          >
            <IoRefresh className="w-5 h-auto" />
          </span>
          <span
            // onClick={() => toggleComments()}
            className="p-2 bg-light-default hover:bg-gray-200 cursor-pointer transition rounded-full"
          >
            <IoClose className="w-5 h-auto" />
          </span>{" "}
        </div>
      </div>
    );
  };

  const CommentForm = ({ reply, placeholder }) => {
    return (
      <div className="px-2 pt-2 flex gap-2 lg:gap-4 w-full">
        <Image
          src={profile1}
          className="w-auto h-8 lg:h-12 rounded-full"
          alt="profile picture"
        />
        <form
          className="gap-2 lg:gap-4 flex w-full"
          onSubmit={(e) => addComment(e)}
        >
          <textarea
            id="body"
            name="body"
            className="w-full text-sm lg:text-base placeholder:text-sm lg:placeholder:text-base border h-8 lg:h-12 max-h-36 py-2 resize-none px-2 lg:px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark"
            placeholder={placeholder}
          />
          <button
            type="submit"
            className="h-8 w-12 lg:h-12 lg:w-16 text-primary-default border border-primary-default hover:bg-light-default flex items-center justify-center rounded-sm"
          >
            <IoSend className="w-4 lg:w-6 h-auto" />
          </button>
        </form>
      </div>
    );
  };
  const CommentBody = ({ reply }) => {
    const CommentItem = () => {
      return (
        <div className="cursor-pointer  hover:bg-gray-100 p-2 flex gap-2 lg:gap-4 w-full">
          <Image
            src={profile1}
            className="w-auto h-8 lg:h-12 rounded-full"
            alt="profile picture"
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center text-dark-default/60 text-xs">
              <span>@malina</span>
              <span>.</span>
              <span>4d ago</span>
            </div>
            <p className="text-sm">
              This is not Asian food. This is a work of art.
            </p>
            <div className="flex gap-4">
              <IoThumbsUpOutline />
              <IoThumbsDownOutline />
              <IoChatbox />
            </div>
          </div>
        </div>
      );
    };
    if (replyObj && showReply) {
      return (
        <div className="px-2 pt-2">
          <CommentItem />
          <div className="ml-4">
            <CommentForm placeholder={"Add a reply..."} />
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <div onClick={() => setReply(true)}>
          <CommentItem />
        </div>
        <div onClick={() => setReply(true)}>
          <CommentItem />
        </div>
        <div onClick={() => setReply(true)}>
          <CommentItem />
        </div>
        <div onClick={() => setReply(true)}>
          <CommentItem />
        </div>
        <div onClick={() => setReply(true)}>
          <CommentItem />
        </div>
      </div>
    );
  };
  return (
    <CommentContainer>
      <CommentHeader />
      {!showReply ? <CommentForm placeholder={"Add a comment..."} /> : null}
      <CommentBody />
    </CommentContainer>
  );
}
