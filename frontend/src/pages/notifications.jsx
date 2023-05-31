import NavbarTemplate from "../templates/template_with_navbar";
import NotificationCard from "../components/notificationCard";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import { CompleteLogin } from "../components/requireLogin";

function Notifications() {
  return (
    <>
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Alerts"
        pageTitle="Alerts | Find alerts for recent activity"
      >
        <div className="px-4 pt-6">
          <h3 className="font-bold text-xl text-pink-500">Notifications</h3>{" "}
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

export default () => (
  <CompleteLogin>
    <Notifications />
  </CompleteLogin>
);

