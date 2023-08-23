import catalogueActions from "../actions/catalogue.actions";
import axios from "axios";
import { AUTH_TOKEN, BACKEND_DOMAIN } from "./vars";

export default async function catalogueResolver(action, token, data) {
  try {
    if (action === catalogueActions.CREATE_CATALOGUE) {
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + "/api/catalogues",
        data: { ...data },
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === catalogueActions.DELETE_CATALOGUE) {
      let resp = await axios({
        method: "delete",
        url: BACKEND_DOMAIN + `/api/catalogue/${options.catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN(options.token),
        },
      });
      return resp;
    } else if (action === catalogueActions.UPDATE_CATALOGUE) {
      let resp = await axios({
        method: "put",
        data: { data },
        url: BACKEND_DOMAIN + `/api/catalogue/${options.catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN(options.token),
        },
      });
      return resp;
    } else if (action === catalogueActions.READ_CATALOGUE) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/catalogue/${data.catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === catalogueActions.LIST_CATALOGUES) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/catalogues`,
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
