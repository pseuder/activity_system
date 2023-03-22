import axios from "axios";
import urlJoin from "url-join";
import Store from "../store";

import { getAuthorization } from "./auth.service";

class UserService {
  getUserInfo() {
    return axios.get(
      urlJoin(
        Store.state.domainAddress,
        "/api/user/",
        getAuthorization().user._id
      ),
      {
        headers: {
          Authorization: getAuthorization().token,
        },
      }
    );
  }

  likeActivity(activity_id) {
    return axios.post(
      urlJoin(
        Store.state.domainAddress,
        "/api/user/likeActivity/",
        activity_id
      ),
      { user_id: getAuthorization().user._id },
      {
        headers: {
          Authorization: getAuthorization().token,
        },
      }
    );
  }

  updateProfile(type, value) {
    return axios.put(
      urlJoin(Store.state.domainAddress, "/api/user/updateProfile/"),
      { type, value },
      {
        headers: {
          Authorization: getAuthorization().token,
        },
      }
    );
  }

  resetPassword(passwords) {
    return axios.post(
      urlJoin(Store.state.domainAddress, "/api/user/resetPassword/"),
      { passwords },
      {
        headers: {
          Authorization: getAuthorization().token,
        },
      }
    );
  }
}

export default new UserService();
