import NavbarTemplate from "../templates/template_with_navbar";

import Mask from "../components/mask";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import Mansory from "../components/masonry/masonry";

export default function Explore() {
  return (
    <>
      <Mask />
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Explore"
      >
        <div className="space-y-6">
          <Mansory />
        </div>
      </NavbarTemplate>
    </>
  );
}
