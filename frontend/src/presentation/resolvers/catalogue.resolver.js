import catalogueActions from "../actions/catalogue.actions";
import axios from "axios";
import { AUTH_TOKEN, BACKEND_DOMAIN } from "./vars";

export default async function catalogueResolver(action, userId, token, data) {
  try {
    if (action === catalogueActions.CREATE_CATALOGUE) {
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + "/api/catalogues",
        data: { ...data, userId },
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === catalogueActions.DELETE_CATALOGUE) {
      let resp = await axios({
        method: "delete",
        url:
          BACKEND_DOMAIN +
          `/api/catalogue/${options.catalogueId}?userId=${userId}`,
        headers: {
          Authorization: AUTH_TOKEN(options.token),
        },
      });
      return resp;
    } else if (action === catalogueActions.UPDATE_CATALOGUE) {
      let resp = await axios({
        method: "put",
        data: { data, userId },
        url: BACKEND_DOMAIN + `/api/catalogue/${options.catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN(options.token),
        },
      });
      return resp;
    } else if (action === catalogueActions.READ_CATALOGUE) {
      let resp = await axios({
        method: "get",
        url:
          BACKEND_DOMAIN +
          `/api/catalogue/${data.catalogueId}?userId=${userId}`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === catalogueActions.LIST_CATALOGUES) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/catalogues?userId=${userId}`,
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