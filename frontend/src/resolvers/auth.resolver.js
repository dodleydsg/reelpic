import axios from "axios";
import authActions from "../actions/auth.actions";
import { BACKEND_DOMAIN } from "./vars";

export default async function authResolver(action, options) {
  try {
    if (action === authActions.LOGIN) {
      let resp = await axios({
        method: "post",
        data: options.data,
        url: BACKEND_DOMAIN + "/auth/login",
      });
      return resp;
    } else if (action === authActions.OAuthLOGIN) {
      let resp = await axios({
        method: "post",
        data: options.data,
        url: BACKEND_DOMAIN + "/auth/OLogin",
      });
      return resp;
    } else if (action === authActions.LOGOUT) {
      localStorage.clear("token");
      localStorage.clear("id");
      let resp = await axios({
        method: "get",
        data: options.data,
        url: BACKEND_DOMAIN + "/auth/logout",
      });
      return resp;
    }
  } catch (error) {
    throw error;
  }
}
