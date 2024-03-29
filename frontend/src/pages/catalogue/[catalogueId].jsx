import { useRouter } from "next/router";
import NavbarTemplate from "@/components/templates/template_with_navbar";
import NoNavbarTemplate from "@/components/templates/template";

import { MdArrowBack, MdGrid4X4, MdList, MdUpload } from "react-icons/md";
import Image from "next/image";
import food from "../../assets/images/food.jpg";
import BackButton from "@/components/components/backButton";
import { useSelector } from "react-redux";

export default function CatalogueDetail() {
  let id;
  let token;
  try {
    id = localStorage.getItem(id);
    token = localStorage.getItem(token);
  } catch (error) {}
  const router = useRouter();
  const { catalogueId } = router.query;

  if (id) {
    return (
      <>
        <NavbarTemplate
          headerText="Food"
          HeaderAside={() => <BackButton clickCallback={router.back} />}
        >
          <div className="relative h-full mt-32 lg:mt-0">
            <div className="relative space-y-2">
              <div className="fixed lg:static bg-white p-4 top-16 inset-x-0  flex lg:block items-center justify-between">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MdArrowBack
                      onClick={router.back}
                      className="hidden lg:inline-block w-6 text-dark-default/80 h-auto cursor-pointer"
                    />
                    <h3 className="text-subheading hidden lg:inline-block">
                      Food
                    </h3>
                  </div>
                  <div className="flex gap-2">
                    <button className="border rounded-sm p-2 border-gray-300">
                      <MdList className="w-6 h-auto text-dark-default/80" />
                    </button>
                    <button className="border rounded-sm p-2 border-gray-300">
                      <MdGrid4X4 className="w-6 h-auto text-dark-default/80" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <p className="text-right text-sm text-dark-default/80">
                    12/15/12
                  </p>
                  <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
                    <Image src={food} />
                    <Image src={food} />
                    <Image src={food} />
                    <Image src={food} />
                    <Image src={food} />
                    <Image src={food} />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-right text-sm text-dark-default/80">
                    12/15/12
                  </p>
                  <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
                    <Image src={food} />
                    <Image src={food} />
                    <Image src={food} />
                    <Image src={food} />
                    <Image src={food} />
                    <Image src={food} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </NavbarTemplate>
      </>
    );
  } else {
    return (
      <NoNavbarTemplate>
        <div className="relative h-full">
          <div className="relative space-y-2">
            <div className="fixed top-0 bg-white p-4 inset-x-0 container mx-auto flex lg:block items-center justify-between">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-xl inline-block">Food</h3>
                </div>
                <div className="flex gap-2">
                  <button className="border rounded-sm p-2 border-gray-300">
                    <MdList className="w-6 h-auto text-dark-default/80" />
                  </button>
                  <button className="border rounded-sm p-2 border-gray-300">
                    <MdGrid4X4 className="w-6 h-auto text-dark-default/80" />
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-[72px]">
              <div className="space-y-1">
                <p className="text-right text-sm text-dark-default/80">
                  12/15/12
                </p>
                <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
                  <Image src={food} />
                  <Image src={food} />
                  <Image src={food} />
                  <Image src={food} />
                  <Image src={food} />
                  <Image src={food} />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-right text-sm text-dark-default/80">
                  12/15/12
                </p>
                <div className="grid gap-2 grid-cols-2 lg:grid-cols-3">
                  <Image src={food} />
                  <Image src={food} />
                  <Image src={food} />
                  <Image src={food} />
                  <Image src={food} />
                  <Image src={food} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </NoNavbarTemplate>
    );
  }
}
