import NavbarTemplate from "../templates/template_with_navbar";
import Image from "next/image";
import template1 from "../assets/images/1.png";
import template2 from "../assets/images/2.png";
import template3 from "../assets/images/3.png";
import InputElement from "../components/forms/input";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import AddCatalogueForm from "../components/forms/addCatalogueForm";
import CatalogueSearchModal from "../components/modal/catalogueSearchModal";
import { toggleCatalogueModal } from "../store/features/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { CompleteLogin } from "../components/requireLogin";
import catalogueResolver from "../resolvers/catalogue.resolver";
import catalogueActions from "../actions/catalogue.actions";
import { useEffect, useState } from "react";
import Link from "next/link";
import CatalogueCard from "../components/catalogueCard";

function Catalogue() {
  const { catalogueList } = useSelector((state) => state.user);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("id");
  const dispatch = useDispatch();
  const [catalogues, updateCatalogues] = useState([]);

  // useEffect(() => {
  //   catalogueList.map(async (val) => {
  //     let { data } = await catalogueResolver(
  //       catalogueActions.LIST_CATALOGUES,
  //       userId,
  //       token,
  //     );
  //     updateCatalogues(data)

  // }, [catalogueList])

  useEffect(() => {
    const getCatalogues = async () => {
      const holder = [];
      for (let i = 0; i < catalogueList.length; i++) {
        let { data } = await catalogueResolver(
          catalogueActions.READ_CATALOGUE,
          userId,
          token,
          { catalogueId: catalogueList[i] }
        );
        holder.push(data);
      }
      updateCatalogues(holder);
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
                type="button"
                className="px-4 rounded hidden lg:inline-block text-primary-default/60 border-gray-300 border py-2 hover:text-primary-default hover:bg-light-default transition my-5 cursor-pointer"
              >
                Create catalogue
              </button>
            </div>
            <h3 className="font-bold text-xl text-pink-500">My catalogues</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 ">
              {catalogues.map((val) => {
                return <CatalogueCard title={val.title} key={val._id} />;
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
