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
        <div className="px-4 lg:grid lg:grid-cols-3 gap-4">
          <div className="col-span-2 space-y-4">
            <form className="mt-4 py-4 relative">
              <div
                onClick={() => dispatch(toggleCatalogueModal())}
                className="w-full lg:w-1/2 h-12 border px-4 rounded-md cursor-pointer text-gray-600 flex items-center "
              >
                Find my catalogues
              </div>
            </form>
            <h3 className="font-bold text-xl">My catalogues</h3>
            <div className="grid grid-cols-2 gap-2 ">
              {catalogues.map((val) => {
                return (
                  <Link
                    href={`/catalogue/${val._id}`}
                    key={val._id}
                    className="p-4 hover:bg-primary-default/80 hover:text-white transition bg-light-default border border-primary-default/25 rounded"
                  >
                    {val.title}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="col-span-1 hidden lg:block space-y-2">
            <h3 className="font-bold text-xl">Create new catalogue</h3>
            <AddCatalogueForm />
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
