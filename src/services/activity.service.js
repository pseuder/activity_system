import axios from "axios";
import urlJoin from "url-join";
import Store from "../store";

function getJWTtoken() {
  return localStorage.getItem("authorization")
    ? JSON.parse(localStorage.getItem("authorization")).token
    : null;
}
class ActivityService {
  explore() {
    return axios.get(
      urlJoin(Store.state.domainAddress, "/api/activity/explore"),
      {
        headers: {
          Authorization: getJWTtoken(),
        },
      }
    );
  }

  enroll(activity_id) {
    let user_id = "";
    if (localStorage.getItem("authorization"))
      user_id = JSON.parse(localStorage.getItem("authorization")).user._id;

    return axios.post(
      urlJoin(
        Store.state.domainAddress,
        "/api/activity/enroll/",
        activity_id.toString()
      ),
      { user_id },
      {
        headers: {
          Authorization: getJWTtoken(),
        },
      }
    );
  }

  create(formData) {
    let user_id = "";
    if (localStorage.getItem("authorization"))
      user_id = JSON.parse(localStorage.getItem("authorization")).user._id;

    return axios.post(
      urlJoin(Store.state.domainAddress, "/api/activity/create"),
      { formData, user_id },
      {
        headers: {
          Authorization: getJWTtoken(),
        },
      }
    );
  }

  watch(activity_id) {
    return axios.post(
      urlJoin(Store.state.domainAddress, "/api/activity/watch/", activity_id),
      {},
      {
        headers: {
          Authorization: getJWTtoken(),
        },
      }
    );
  }
}

export default new ActivityService();
