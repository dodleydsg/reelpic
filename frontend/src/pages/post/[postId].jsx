import { useRouter } from "next/router";
import NavbarTemplate from "@/components/templates/template_with_navbar";
import NoNavbarTemplate from "@/components/templates/template";
import { useSelector } from "react-redux";
import BackButton from "@/components/components/backButton";
import Post from "@/components/components/post";

export default function CatalogueDetail() {
  const router = useRouter();
  const { catalogueId } = router.query;
  const { loggedIn } = useSelector((state) => state.auth); // if user is logged in

  if (loggedIn) {
    return (
      <>
        <NavbarTemplate
          headerText="Post details"
          HeaderAside={() => <BackButton clickCallback={router.back} />}
        >
          <div className="relative h-full">
            <div className="relative space-y-2">
              <Post />
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
            <Post />
          </div>
        </div>
      </NoNavbarTemplate>
    );
  }
}
