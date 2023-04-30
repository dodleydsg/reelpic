import NavbarTemplate from "../templates/template_with_navbar";
import TrashCard from "../components/trashCard";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";

export default function Trash() {
  return (
    <>
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Trash"
      >
        <div className="px-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <TrashCard />
          <TrashCard />
          <TrashCard />
        </div>
      </NavbarTemplate>
    </>
  );
}
