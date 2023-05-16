import axios from "axios";
import authRoutes from "../routes/auth.routes";
import { BACKEND_DOMAIN } from "./vars";

export default async function authResolver(
  action,
  token = "",
  userId = "",
  data = {}
) {
  try {
    if (action === authRoutes.LOGIN) {
      let resp = await axios({
        method: "post",
        data: data,
        url: BACKEND_DOMAIN + "/auth/login",
      });
      return resp;
    } else if (action === authRoutes.REGISTER) {
      let resp = await axios({
        method: "post",
        data: data,
        url: BACKEND_DOMAIN + "/api/users",
      });
      return resp;
    }
  } catch (error) {
    throw error;
  }
}
