import NavbarTemplate from "../templates/template_with_navbar";
import Image from "next/image";
import template1 from "../assets/images/1.png";
import template2 from "../assets/images/2.png";
import template3 from "../assets/images/3.png";
import Mask from "../components/mask";

export default function Explore() {
  return (
    <>
      <Mask />
      <NavbarTemplate>
        <div className="space-y-6">
          <div className="grid gap-4 grid-cols-3 lg:grid-cols-4 mt-20 sm:mt-0 grid-rows-2 xl:grid-rows-4 transition-all duration-1000">
            <div
              className="max-h-[240px]"
              onLoad={(e) => {
                let height = e.target.naturalHeight;
                let width = e.target.naturalWidth;
                let parent = e.target.parentElement;

                let ar = width / height;

                switch (true) {
                  case 1.2 < ar < 2:
                    parent.classList.add("col-span-1", "row-span-1");
                    console.log(e.target.classList.value);
                    break;

                  case ar < 0.8:
                    parent.classList.add("col-span-1", "col-span-2");
                    break;
                  default:
                    parent.classList.add("col-span-1");
                }
              }}
            >
              <Image
                src={template1}
                className="object-cover object-center rounded"
              />
            </div>
            <div
              onLoad={(e) => {
                let height = e.target.naturalHeight;
                let width = e.target.naturalWidth;
                let parent = e.target.parentElement;

                let ar = width / height;

                switch (true) {
                  case 1.2 < ar < 2:
                    parent.classList.add("col-span-1", "row-span-1");
                    console.log(e.target.classList.value);
                    break;

                  case ar < 0.8:
                    parent.classList.add("col-span-1", "col-span-2");
                    break;
                  default:
                    parent.classList.add("col-span-1");
                }
              }}
            >
              <Image
                src={template2}
                className="h-full object-cover object-center rounded"
              />
            </div>
            <div
              onLoad={(e) => {
                let height = e.target.naturalHeight;
                let width = e.target.naturalWidth;
                let parent = e.target.parentElement;

                let ar = width / height;

                switch (true) {
                  case 1.2 < ar < 2:
                    parent.classList.add("col-span-1", "row-span-1");
                    console.log(e.target.classList.value);
                    break;

                  case ar < 0.8:
                    parent.classList.add("col-span-1", "col-span-2");
                    break;
                  default:
                    parent.classList.add("col-span-1");
                }
              }}
            >
              <Image
                src={template2}
                className="h-full object-cover object-center rounded"
              />
            </div>
            <div
              onLoad={(e) => {
                let height = e.target.naturalHeight;
                let width = e.target.naturalWidth;
                let parent = e.target.parentElement;

                let ar = width / height;

                switch (true) {
                  case 1.2 < ar < 2:
                    parent.classList.add("col-span-1", "row-span-1");
                    console.log(e.target.classList.value);
                    break;

                  case ar < 0.8:
                    parent.classList.add("col-span-1", "col-span-2");
                    break;
                  default:
                    parent.classList.add("col-span-1");
                }
              }}
            >
              <Image
                src={template3}
                className="h-full object-cover object-center rounded"
              />
            </div>
          </div>
        </div>
      </NavbarTemplate>
    </>
  );
}
