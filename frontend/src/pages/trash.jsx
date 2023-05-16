import NavbarTemplate from "../templates/template_with_navbar";
import TrashCard from "../components/trashCard";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import { getUser } from "../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/loadingScreen";
import { useEffect } from "react";

export default function Trash() {
  const { pending, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  if (pending) {
    return <LoadingScreen />;
  }
  return (
    <>
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Trash"
        pageTitle="Trash | Restore any trashed photos"
      >
        <div className="py-4 px-2 space-y-2">
          <h2 className="font-medium text-xl hidden lg:block my-2">Trash</h2>
          <p className="text-dark-default/80 ">
            Delete permanently or retrieve
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <TrashCard />
            <TrashCard />
            <TrashCard />
          </div>
        </div>
      </NavbarTemplate>
    </>
  );
}
