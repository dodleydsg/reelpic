import axios from "axios";
import notificationActions from "../actions/notification.actions";
import { AUTH_TOKEN, BACKEND_DOMAIN } from "./vars";

export default async function notificationResolver(action, token, data) {
  try {
    if (action === notificationActions.LIST_ALERTS) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + "/api/alerts",
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === notificationActions.READ_ALERT) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/alerts/${data.alertId}`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    }
  } catch (error) {
    throw error;
  }
  // catalogue routers
}
