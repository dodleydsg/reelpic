import postActions from "../actions/post.actions";
import axios from "axios";
import { AUTH_TOKEN, BACKEND_DOMAIN } from "./vars";

export default async function postResolver(action, token, data) {
  try {
    if (action === postActions.CREATE_POST) {
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + "/api/posts",
        data: { ...data },
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === postActions.DELETE_POST) {
      let resp = await axios({
        method: "delete",
        url: BACKEND_DOMAIN + `/api/post/delete/${data.postId}`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === postActions.TRASH_POST) {
      let resp = await axios({
        method: "delete",
        url: BACKEND_DOMAIN + `/api/post/${data.postId}`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === postActions.UPDATE_POST) {
      let resp = await axios({
        method: "put",
        data: { ...data },
        url: BACKEND_DOMAIN + `/api/post/${options.catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === postActions.READ_POST) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/post/${data.postId}/`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === postActions.LIST_POSTS) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/posts`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === postActions.TRASH_POST) {
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + "api/post/",
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === postActions.POST_LIKE) {
      let resp = await axios({
        method: "post",
        data: { ...data },
        url: BACKEND_DOMAIN + "/api/post/like",
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === postActions.FEED) {
      let resp = await axios({
        method: "post",
        data: { ...data },
        url: BACKEND_DOMAIN + "/api/feed",
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === postActions.EXPLORE) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/explore`,
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
