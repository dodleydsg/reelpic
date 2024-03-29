import NavbarTemplate from "../templates/template_with_navbar";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import CatalogueSearchModal from "../components/modal/catalogueSearchModal";
import {
  toggleCatalogueModal,
  toggleAddCatalogueModal,
} from "../store/features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { CompleteLogin } from "../components/requireLogin";
import catalogueResolver from "../presentation/resolvers/catalogue.resolver";
import catalogueActions from "../presentation/actions/catalogue.actions";
import { useEffect, useState } from "react";
import CatalogueCard from "../components/catalogueCard";
import { readCookie } from "../utils/cookie";

function Catalogue() {
  const { catalogueList } = useSelector((state) => state.user);
  const token = readCookie("token");
  const dispatch = useDispatch();
  const [catalogues, updateCatalogues] = useState([]);

  useEffect(() => {
    const getCatalogues = async () => {
      let { data } = await catalogueResolver(
        catalogueActions.LIST_CATALOGUES,
        token
      );
      updateCatalogues(data);
    };

    getCatalogues();
  }, [catalogueList]);

  return (
    <>
      <CatalogueSearchModal />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Catalogues"
        pageTitle="Catalogues | Organise your posts into relatable groups"
      >
        <div className="px-4  gap-4">
          <div className="col-span-2 space-y-4 relative">
            <div className="flex items-center sticky top-0  z-30 bg-white">
              <form className="mt-4 grow py-4 relative">
                <div
                  onClick={() => dispatch(toggleCatalogueModal())}
                  className="w-full lg:w-1/2 h-12 border px-4 rounded-md cursor-pointer text-gray-600 flex items-center "
                >
                  Find my catalogues
                </div>
              </form>
              <button
                onClick={() => {
                  dispatch(toggleAddCatalogueModal());
                }}
                type="button"
                className="px-4 rounded hidden lg:inline-block text-primary-default/60 border-gray-300 border py-2 hover:text-primary-default hover:bg-light-default transition my-5 cursor-pointer"
              >
                Create catalogue
              </button>
            </div>
            <h3 className="font-bold text-xl text-pink-500">My catalogues</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
              {catalogues.map((val) => {
                return (
                  <CatalogueCard title={val.title} key={val._id} {...val} />
                );
              })}
            </div>
          </div>
        </div>
      </NavbarTemplate>
    </>
  );
}

export default () => (
  <CompleteLogin>
    <Catalogue />
  </CompleteLogin>
);
