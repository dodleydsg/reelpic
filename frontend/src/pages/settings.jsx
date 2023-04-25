import Image from "next/image";
import InputElement from "../components/formElements/input";
import NavbarTemplate from "../templates/template_with_navbar";

export default function Catalogue() {
  return (
    <>
      <NavbarTemplate>
        <div className="hidden lg:grid p-6 justify-items-center grid-cols-3 gap-4">
          <div className="col-span-1">
            <p>Profile</p>
          </div>
          <div className="col-span-1">
            <p>Change password</p>
          </div>
          <div className="col-span-1">
            <p>Display</p>
          </div>

          {/* Settings section */}
          <div className="col-span-3"></div>
        </div>
      </NavbarTemplate>
    </>
  );
}
