import ScrollCard from "../components/scrollCard";
import Post from "../components/post/post";
import NavbarTemplate from "../templates/template_with_navbar";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import Image from "next/image";
import { IoAdd, IoClose } from "react-icons/io5";
import AddPostForm from "../components/forms/addPostForm";
import { useSelector, useDispatch } from "react-redux";
import { toggleAddPost } from "../store/features/uiSlice";
import { useRouter } from "next/router";
import { CompleteLogin } from "../components/requireLogin";
import BookmarkModal from "../components/modal/bookmarkModal";

function Home() {
  const router = useRouter();
  const { addPost } = useSelector((state) => state.ui);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <BookmarkModal />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Home"
        pageTitle="Home for all pics and stories"
      >
        <div className="space-y-4">
          <div className="mt-20 lg:mt-0">
            <h3 className="text-subheading mt-3">{user._id}</h3>
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
                  dispatch(toggleAddPost(!addPost));
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

export default () => (
  <CompleteLogin>
    <Home />
  </CompleteLogin>
);
