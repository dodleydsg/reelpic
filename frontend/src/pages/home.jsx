import ScrollCard from "../components/scrollCard";
import Post from "../components/post";
import NavbarTemplate from "../templates/template_with_navbar";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import { useSelector, useDispatch } from "react-redux";
import { CompleteLogin } from "../components/requireLogin";
import BookmarkModal from "../components/modal/bookmarkModal";
import { toggleAddPostModal } from "../store/features/uiSlice";
import { useEffect, useState } from "react";
import postActions from "../presentation/actions/post.actions";
import postResolver from "../presentation/resolvers/post.resolver";
import { readCookie } from "../utils/cookie";

function Home() {
  const [feed, updateFeed] = useState([]);
  let token = "";
  const dispatch = useDispatch();
  const { stale } = useSelector((state) => state.ui);
  const {user} = useSelector(state => state.user)

  useEffect(() => {
    const getFeed = async () => {
      try {
        token = readCookie("token");
        const { data } = await postResolver(postActions.FEED, token);
        updateFeed(data);
      } catch (error) {
        // console.log(error);
      }
    };

    getFeed();
  }, [stale]);

  return (
    <>
      <BookmarkModal />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile username={user.username} image={profile} />}
        headerText="Home"
        pageTitle="Home for all pics and stories"
      >
        <div className="space-y-4">
          {/* <div className="mt-20 lg:mt-0">
            <h3 className="text-lg font-medium">Trending catalogues</h3>
            <ScrollCard />
          </div> */}
          <div className="sticky h-auto top-0 z-[51] bg-white">
            <div className="lg:flex py-2  w-full justify-between hidden items-center ">
              <button
                onClick={() => {
                  dispatch(toggleAddPostModal());
                }}
                className="p-4 rounded bg-primary-default hover:bg-primary-default/80 text-white transition duration-300 flex border"
              >
                Create post
              </button>
              {/* <button
                onClick={() => {
                  dispatch(toggleAddCatalogueModal());
                }}
                className="p-4 rounded border-primary-default/20 hover:bg-light-default transition duration-300 flex border"
              >
                Create catalogue
              </button> */}
            </div>
          </div>
          <div className="space-y-4">
            {feed.map((val) => {
              return <Post key={val._id} {...val} postOwner={val.user} />;
            })}
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
