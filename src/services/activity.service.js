import axios from "axios";
import urlJoin from "url-join";
import Store from "../store";
import { getAuthorization } from "./auth.service";

class ActivityService {
  explore() {
    return axios.get(
      urlJoin(Store.state.domainAddress, "/api/activity/explore"),
      {
        headers: {
          Authorization: getAuthorization().token,
        },
      }
    );
  }

  enroll(activity_id) {
    let user_id = getAuthorization().user._id;

    return axios.post(
      urlJoin(
        Store.state.domainAddress,
        "/api/activity/enroll/",
        activity_id.toString()
      ),
      { user_id },
      {
        headers: {
          Authorization: getAuthorization().token,
        },
      }
    );
  }

  cancel(activity_id) {
    let user_id = getAuthorization().user._id;

    return axios.post(
      urlJoin(
        Store.state.domainAddress,
        "/api/activity/cancel/",
        activity_id.toString()
      ),
      { user_id },
      {
        headers: {
          Authorization: getAuthorization().token,
        },
      }
    );
  }

  create(formData) {
    let user_id = getAuthorization().user._id;

    return axios.post(
      urlJoin(Store.state.domainAddress, "/api/activity/create"),
      { formData, user_id },
      {
        headers: {
          Authorization: getAuthorization().token,
          "Content-Type": "application/octet-stream",
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
          Authorization: getAuthorization().token,
        },
      }
    );
  }

  edit(formData) {
    console.log(formData._id);
    return axios.patch(
      urlJoin(Store.state.domainAddress, "/api/activity/edit/", formData._id),
      { formData },
      {
        headers: {
          Authorization: getAuthorization().token,
        },
      }
    );
  }
}

export default new ActivityService();
