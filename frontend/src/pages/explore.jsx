import NavbarTemplate from "../templates/template_with_navbar";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import Masonry from "../components/masonry/masonry";
import ExploreSearchModal from "../components/modal/exploreSearchModal";
import { toggleExploreModal } from "../store/features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { CompleteLogin } from "../components/requireLogin";
import { useState, useEffect } from "react";
import postResolver from "../presentation/resolvers/post.resolver";
import postActions from "../presentation/actions/post.actions";

function Explore() {
  const [exploreFeed, updateExploreFeed] = useState([]);
  const { stale } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  useEffect(() => {
    const explore = async () => {
      try {
        const userId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const { data } = await postResolver(postActions.EXPLORE, userId, token);
        updateExploreFeed(data);
      } catch (error) {
        console.log(error);
      }
    };

    explore();
  }, [stale]);

  return (
    <>
      <ExploreSearchModal />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Explore"
        pageTitle="Explore | Dive into the community to find the best pics and stories"
      >
        <div className="relative space-y-4 px-1 pt-4">
          <div className="py-4 bg-white sticky top-0 z-30">
            <div
              onClick={() => dispatch(toggleExploreModal())}
              className="w-full px-4 lg:w-1/2 h-12 border rounded-md cursor-pointer text-gray-600 flex items-center "
            >
              Search users, catalogues and tags
            </div>
          </div>
          <h3 className="font-bold text-xl text-pink-500">Explore</h3>
          <Masonry data={exploreFeed} />
        </div>
      </NavbarTemplate>
    </>
  );
}

export default () => (
  <CompleteLogin>
    <Explore />
  </CompleteLogin>
);
