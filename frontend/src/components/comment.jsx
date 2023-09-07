import { useEffect, useRef, useState } from "react";
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
import commentActions from "../presentation/actions/comment.actions";
import commentResolver from "../presentation/resolvers/comment.resolver";
import { configureAlert, setAlert } from "../store/features/uiSlice";
import { readCookie } from "../utils/cookie";

const COMMENT_REQUEST_LENGTH = 5;

export default function Comment({ postId, commentIds, toggleComments }) {
  const dispatch = useDispatch();
  const [showReply, setReply] = useState(false);
  const [replyObj, setReplyObj] = useState({});
  const [comments, setComments] = useState([]);
  const LoaderRef = useRef();

  const token = readCookie("token");
  const VIEWED_COMMENTS_REF = useRef([]);
  const COMMENT_IDS_REF = useRef([...commentIds]);

  useEffect(() => {
    getComments();
  }, []);

  /*  const commentItem = {
    id: String,
    likes: Number,
    body: String,
    replies: Array[commentItem],
    created: Date,


  } */

  const getComments = async () => {
    const ids = COMMENT_IDS_REF.current.slice(
      comments.length,
      comments.length + COMMENT_REQUEST_LENGTH
    );
    ids.length > 0
      ? commentResolver(commentActions.DETAIL_COMMENTS, token, { ids })
          .then((resp) => {
            setComments([...comments, ...resp.data]);
          })
          .catch((error) => {
            // console.log(error);
          })
      : null;
  };

  const addComment = async (e) => {
    e.preventDefault();
    const body = document.querySelector("#body").value;
    if (!body) {
      dispatch(
        configureAlert({
          variant: "danger",
          text: "Comment must have a body",
        })
      );
      dispatch(setAlert(true));
      return 0;
    }
    commentResolver(commentActions.CREATE_COMMENT, token, {
      body,
      postId: postId,
    })
      .then(({ data }) => {
        dispatch(
          configureAlert({
            variant: "success",
            text: "Comment added successfully",
          })
        );
        setComments((comments) => {
          return comments.fill(data, 0, 0);
        });
        VIEWED_COMMENTS_REF.current.push(data._id);
      })
      .catch((error) => {
        // console.log(error);
        dispatch(
          configureAlert({
            variant: "danger",
            text: "Couldn't add comment, check connection",
          })
        );
      });

    e.target.reset();

    dispatch(setAlert(true));
  };

  const CommentContainer = ({ children }) => {
    return (
      <div
        style={{ maxHeight: "40vh" }}
        className="overflow-y-scroll  py-4 border divide-y-2 space-y-2 border-1 rounded-sm"
      >
        {children}
      </div>
    );
  };

  function Loader() {
    return (
      <p
        onClick={async (e) => {
          await getComments();
        }}
        className="text-center cursor-pointer text-sm text-pink-500"
        id="commentLoader"
      >
        Load more
      </p>
    );
  }

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
          <span className="p-2 bg-light-default hover:bg-gray-200 cursor-pointer transition rounded-full">
            <IoRefresh className="w-5 h-auto" />
          </span>
          <span
            onClick={() => toggleComments()}
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
            className="w-full no-scrollBar text-sm lg:text-base placeholder:text-sm lg:placeholder:text-base border h-8 lg:h-12 max-h-36 py-2 resize-none px-2 lg:px-4 rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark"
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
  const CommentBody = ({ reply, body }) => {
    // if (comments.length === 0) {
    //   return <h5 className="text-center font-medium pt-4">No Comments</h5>;
    // }
    const CommentItem = ({ created, body, author }) => {
      return (
        <div className="cursor-pointer  hover:bg-gray-100 p-2 flex gap-2 lg:gap-4 w-full">
          <Image
            src={profile1}
            className="w-auto h-8 lg:h-12 rounded-full"
            alt="profile picture"
          />
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 items-center text-dark-default/60 text-xs">
              <span>{author.username || "[Deleted]"}</span>
              <span>.</span>
              <span>{new Date(created).getFullYear()}</span>
            </div>
            <p className="text-sm">{body}</p>
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
      <div
        className="space-y-2 me"
        onLoad={(e) => {
          // console.log("Done");
        }}
      >
        {comments.length > 0 ? (
          comments.map((val) => {
            return (
              <div key={val._id} onClick={() => setReply(true)}>
                <CommentItem
                  body={val.body}
                  created={val.created}
                  author={val.author}
                />
              </div>
            );
          })
        ) : (
          <p className="text-center">No comments</p>
        )}
      </div>
    );
  };

  return (
    <CommentContainer>
      {/* <CommentHeader />
      {!showReply ? <CommentForm placeholder={"Add a comment..."} /> : null}
      <CommentBody />
      <Loader /> */}
      <p className="px-2">Comments coming soon</p>
    </CommentContainer>
  );
}
