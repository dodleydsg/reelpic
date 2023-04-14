import NavbarTemplate from "../templates/template_with_navbar";

import Mask from "../components/mask";
import NotificationCard from "../components/notificationCard";

export default function Catalogue() {
  return (
    <>
      <Mask />
      <NavbarTemplate>
        <div className="px-4 gap-4">
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
