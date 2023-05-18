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

function Catalogue() {
  const dispatch = useDispatch();
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
            {/* <form className="mt-4 py-4">
              <label className="sr-only">Search catalogues</label>
              <InputElement
                type="text"
                placeholder="Search catalogues"
                className="lg:w-1/2 w-full"
              />
            </form> */}
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
              <div className="relative hover:cursor-pointer col-span-1  hover:scale-95 transition duration-300">
                <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
                <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
                  <p className="text-body">Family</p>
                </div>
                <Image
                  alt="jj"
                  src={template1}
                  className="h-[150px] object-cover rounded-md w-full"
                />
              </div>
              <div className="relative hover:cursor-pointer col-span-1  hover:scale-95 transition duration-300">
                <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
                <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
                  <p className="text-body">Design</p>
                </div>
                <Image
                  alt="jj"
                  src={template2}
                  className="h-[150px] object-cover rounded-md w-full"
                />
              </div>
              <div className="relative hover:cursor-pointer col-span-1  hover:scale-95 transition duration-300">
                <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
                <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
                  <p className="text-body">Nature</p>
                </div>
                <Image
                  alt="jj"
                  src={template3}
                  className="h-[150px] object-cover rounded-md w-full"
                />
              </div>
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
