import NavbarTemplate from "../templates/template_with_navbar";

import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import Masonry from "../components/masonry/masonry";
import ExploreSearchModal from "../components/modal/exploreSearchModal";
import { toggleExploreModal } from "../store/features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { CompleteLogin } from "../components/requireLogin";

function Explore() {
  const dispatch = useDispatch();

  return (
    <>
      <ExploreSearchModal />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Explore"
        pageTitle="Explore | Dive into the community to find the best pics and stories"
      >
        <div className="space-y-4 px-1 pt-4">
          <div
            onClick={() => dispatch(toggleExploreModal())}
            className="w-full lg:w-1/2 h-12 border px-4 rounded-md cursor-pointer text-gray-600 flex items-center "
          >
            Search users, catalogues and tags
          </div>
          <Masonry />
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

