import NavbarTemplate from "../templates/template_with_navbar";
import Image from "next/image";
import template1 from "../assets/images/1.png";
import template2 from "../assets/images/2.png";
import template3 from "../assets/images/3.png";
import Mask from "../components/mask";
import Mansory from "../components/masonry/masonry";

export default function Explore() {
  return (
    <>
      <Mask />
      <NavbarTemplate>
        <div className="space-y-6">
          <Mansory />
        </div>
      </NavbarTemplate>
    </>
  );
}
