import NavbarTemplate from "../templates/template_with_navbar";
import NotificationCard from "../components/notificationCard";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import { getUser } from "../store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/loadingScreen";

export default function Catalogue() {
  const { pending, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  if (pending) {
    <LoadingScreen />;
  }
  return (
    <>
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Alerts"
        pageTitle="Alerts | Find alerts for recent activity"
      >
        <div className="px-4 pt-6">
          <h2 className="font-medium text-xl ">Notifications</h2>
          <div className="space-y-2">
            <div>
              <p className="text-right text-sm text-dark-default/80">
                {new Date().toLocaleDateString()}
              </p>
              <hr className="mb-2" />
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
            </div>
            <div>
              <p className="text-right text-sm text-dark-default/80">
                {new Date(1223312131231).toLocaleDateString()}
              </p>
              <hr className="mb-2" />
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
              <NotificationCard />
            </div>
          </div>
        </div>
      </NavbarTemplate>
    </>
  );
}
