import NavbarTemplate from "../templates/template_with_navbar";
import NotificationCard from "../components/notificationCard";
import NavbarProfile from "../components/navBar/navBarProfile";
import profile from "../assets/images/Profile1.png";
import { CompleteLogin } from "../components/requireLogin";
import { useEffect, useState } from "react";
import notificationResolver from "../presentation/resolvers/notifications.resolver";
import notificationActions from "../presentation/actions/notification.actions";
import { readCookie } from "../utils/cookie";


function Notifications() {
  const token = readCookie("token");
  const [alerts, setAlerts] = useState([]);
  useEffect(() => {
    const getAlerts = async () => {
      let { data } = await notificationResolver(
        notificationActions.LIST_ALERTS,
        token
      );
      setAlerts(data);
    };
    getAlerts();
  }, []);

  return (
    <>
      <NavbarTemplate
        HeaderAside={() => <NavbarProfile image={profile} />}
        headerText="Alerts"
        pageTitle="Alerts | Find alerts for recent activity"
      >
        <div className="px-4 pt-6">
          <h3 className="font-bold text-xl text-pink-500">Notifications</h3>
          <div className="space-y-2">
            <div>
              <hr className="mb-2" />
              {alerts.map((val) => {
                return <NotificationCard key={val.id} {...val} />;
              })}
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
