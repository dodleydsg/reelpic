import NavbarTemplate from "../templates/template_with_navbar";
import Image from "next/image";
import template1 from "../assets/images/1.png";
import template2 from "../assets/images/2.png";
import template3 from "../assets/images/3.png";
import InputElement from "../components/form/input";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";

export default function Catalogue() {
  return (
    <>
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Catalogues"
      >
        <div className="px-4 lg:grid lg:grid-cols-3 gap-4">
          <div className="col-span-2 space-y-6">
            <form className="mt-4">
              <label className="sr-only">Search catalogues</label>
              <InputElement
                type="text"
                placeholder="Search catalogues"
                className="lg:w-1/2"
              />
            </form>
            <h3 className="text-subheading">My catalogues</h3>
            <div className="grid grid-cols-2 gap-2 ">
              <div className="relative hover:cursor-pointer col-span-1  hover:scale-95 transition duration-300">
                <div className="absolute inset-0 from-black/30 rounded-md to-black/60 bg-gradient-to-b"></div>
                <div className="absolute pb-2 sm:pb-4 z-10 inset-0 bg-none text-white flex flex-col items-center justify-end">
                  <p className="text-body">Family</p>
                </div>
                <Image
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
                  src={template3}
                  className="h-[150px] object-cover rounded-md w-full"
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden lg:block ">
            <h3 className="text-subheading">Create new catalogue</h3>
            <form className="space-y-4">
              <label for="title" className="sr-only">
                Title
              </label>
              <InputElement type="text" placeholder="Title" name="title" />
              <label for="description" className="sr-only">
                Description
              </label>
              <textarea
                type="textarea"
                rows="5"
                placeholder="Description"
                name="description"
                className="border p-4 w-full rounded-md focus:outline-0 focus:ring-2 focus:ring-primary-default/50 text-dark "
              />
              <button className="btn-primary hover:bg-[#4900EB]">
                Confirm
              </button>
            </form>
          </div>
        </div>
      </NavbarTemplate>
    </>
  );
}
