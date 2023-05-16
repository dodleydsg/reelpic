import catalogueRoutes from "./catalogue.routes";
import axios from "axios";

export default async function resolver(token, route, userId = "", data = {}) {
  const BACKEND_DOMAIN = process.env.BACKEND_DOMAIN;
  // catalogue routers
  switch (route) {
    case catalogueRoutes.CREATE_CATALOGUE:
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + "/api/catalogue/",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  }
}
