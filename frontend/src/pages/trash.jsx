import NavbarTemplate from "../templates/template_with_navbar";
import Image from "next/image";
import template1 from "../assets/images/1.png";
import template2 from "../assets/images/2.png";
import template3 from "../assets/images/3.png";
import Mask from "../components/mask";
import InputElement from "../components/formElements/input";
import TrashCard from "../components/trashCard";

export default function Trash() {
  return (
    <>
      <Mask />
      <NavbarTemplate>
        <div className="px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <TrashCard />
          <TrashCard />
          <TrashCard />
        </div>
      </NavbarTemplate>
    </>
  );
}
