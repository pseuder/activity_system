import axios from "axios";
import urlJoin from "url-join";
import Store from "../store";
class ActivityService {
  enroll(activity_id) {
    let token = "",
      user_id = "";
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("userInfo")).token;
      user_id = JSON.parse(localStorage.getItem("userInfo")).user;
    }
    return axios.post(
      urlJoin(Store.state.domainAddress, "/enroll/", activity_id.toString()),
      { user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  create(formData) {
    let token = "";
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("userInfo")).token;
    }
    return axios.post(
      urlJoin(Store.state.domainAddress, "/api/activity/create"),
      { formData },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new ActivityService();
