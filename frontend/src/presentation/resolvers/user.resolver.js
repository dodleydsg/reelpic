import axios from "axios";
import userActions from "../actions/user.actions";
import { AUTH_TOKEN, BACKEND_DOMAIN } from "./vars";

export default async function userResolver(action, options) {
  try {
    if (action === userActions.READ) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/user/${options.username}`,
        headers: {
          Authorization: AUTH_TOKEN(options.token),
        },
      });
      return resp;
    } else if (action === userActions.ALT_READ) {
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + "/api/user",

        headers: {
          Authorization: AUTH_TOKEN(options.token),
        },
      });
      return resp;
    } else if (action === userActions.CREATE) {
      let resp = await axios({
        method: "post",
        data: options.data,
        url: BACKEND_DOMAIN + "/api/users",
      });
      return resp;
    } else if (action === userActions.UPDATE) {
      let resp = await axios({
        method: "put",
        url: BACKEND_DOMAIN + `/api/user/${options.username || "_"}`,
        data: options.data,
        headers: {
          Authorization: AUTH_TOKEN(options.token),
        },
      });
      return resp;
    } else if (action === userActions.DELETE) {
      let resp = await axios({
        method: "delete",
        url: BACKEND_DOMAIN + `/api/user/${options.username}`,
        data: options.data,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN(options.token)}`,
        },
      });
      return resp;
    } else if (action === userActions.FOLLOW) {
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + `/api/follow/${options.followId}`,
        data: options.data,
        headers: {
          Authorization: `Bearer ${AUTH_TOKEN(options.token)}`,
        },
      });
      return resp;
    }
  } catch (error) {
    throw error;
  }
}
