import { useRouter } from "next/router";
import NavbarTemplate from "@/components/templates/template_with_navbar";
import { MdArrowBack, MdGrid4X4, MdList, MdUpload } from "react-icons/md";
import Image from "next/image";
import food from "../../assets/images/food.jpg";

export default function CatalogueDetail() {
  const UploadLabel = ({ mobile }) => {
    return (
      <label
        htmlFor="images"
        className={`${
          mobile ? "lg:hidden" : ""
        } px-4 rounded inline-block text-primary-default/60 border-gray-300 border py-2 hover:text-primary-default hover:bg-light-default transition cursor-pointer`}
      >
        Add image/s
      </label>
    );
  };

  const router = useRouter();
  const { catalogueId } = router.query;
  return (
    <>
      {/* input for uploading images to catalogue */}
      <input type="file" className="hidden" id="images" />
      <NavbarTemplate>
        <div className="lg:grid lg:grid-cols-3 lg:gap-6 relative h-full">
          <div className="lg:col-span-2 relative space-y-2">
            <div className="fixed lg:static bg-white inset-x-0 container mx-auto flex lg:block items-center justify-between">
              <MdArrowBack className="lg:ml- w-6 h-auto text-dark-default/80" />

              {/* Mobile upload button */}
              <UploadLabel mobile={true} />
            </div>
            <div className="flex items-center justify-between mt-12">
              <h2 className="text-subheading">Food</h2>
              <div className="flex gap-2">
                <button className="border rounded-sm p-2 border-gray-300">
                  <MdList className="w-6 h-auto text-dark-default/80" />
                </button>
                <button className="border rounded-sm p-2 border-gray-300">
                  <MdGrid4X4 className="w-6 h-auto text-dark-default/80" />
                </button>
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
          <div className="hidden lg:block col-span-1 space-y-6 ">
            <h2 className="text-subheading">Upload new images</h2>
            <UploadLabel />
            <div className="h-72 w-full bg-light-default border-gray-300 border-2 flex items-center justify-center">
              <div className="flex flex-col gap-2 items-center">
                <MdUpload className="w-16 h-auto" />
                <span>Drop image/s here</span>
              </div>
            </div>
          </div>
        </div>
      </NavbarTemplate>
    </>
  );
}
