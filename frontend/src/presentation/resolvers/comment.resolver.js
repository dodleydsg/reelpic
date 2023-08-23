import commentActions from "../actions/comment.actions";
import axios from "axios";
import { AUTH_TOKEN, BACKEND_DOMAIN } from "./vars";

export default async function commentResolver(action, token, data) {
  try {
    if (action === commentActions.CREATE_COMMENT) {
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + "/api/comments",
        data: { ...data },
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === commentActions.DELETE_COMMENT) {
      let resp = await axios({
        method: "delete",
        url: BACKEND_DOMAIN + `/api/post/delete/${data.postId}`,
        data: {},
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === commentActions.DETAIL_COMMENTS) {
      let resp = await axios({
        method: "post",
        url: BACKEND_DOMAIN + `/api/comments/detail`,
        data: { ...data },
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === commentActions.UPDATE_COMMENT) {
      let resp = await axios({
        method: "put",
        data: { ...data },
        url: BACKEND_DOMAIN + `/api/post/${options.catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === commentActions.READ_COMMENT) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/post/${options.catalogueId}`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === commentActions.LIST_COMMENTS) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/comments&initial=${data.initial}`,
        headers: {
          Authorization: AUTH_TOKEN(token),
        },
      });
      return resp;
    } else if (action === commentActions.LIST_COMMENTS_IDS) {
      let resp = await axios({
        method: "get",
        url: BACKEND_DOMAIN + `/api/comments&postId=${data.postId}`,
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
        url: BACKEND_DOMAIN + `/api/feed`,
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
