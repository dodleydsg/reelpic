import { headers } from "../../next.config";
import catalogueRoutes from "./catalogue.routes";
import axios from "axios";

export default async function catalogueResolver(
  token,
  action,
  userId = "",
  data = {},
  catalogueId = ""
) {
  const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN;
  const AUTH_TOKEN = `Bearer ${token}`;
  try {
    if (action === catalogueRoutes.CREATE_CATALOGUE) {
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + "/api/catalogue/",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      return resp;
    } else if (action === catalogueRoutes.DELETE_CATALOGUE) {
      let resp = await axios({
        method: "delete",
        url: BACKEND_DOMAIN + `/api/catalogue/${catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      return resp;
    } else if (action === catalogueRoutes.UPDATE_CATALOGUE) {
      let resp = await axios({
        method: "put",
        url: BACKEND_DOMAIN + `/api/catalogue/${catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      return resp;
    } else if (action === catalogueRoutes.READ_CATALOGUE) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `api/catalogue/${catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
      return resp;
    } else if (action === catalogueRoutes.LIST_CATALOGUES) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + "api/catalogue/",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      });
    }
  } catch (error) {
    return {
      message: error,
    };
  }
  // catalogue routers
}
