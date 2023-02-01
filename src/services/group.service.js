import axios from "axios";
import urlJoin from "url-join";
import Store from "../store";

function getAuthorization() {
  return localStorage.getItem("authorization")
    ? JSON.parse(localStorage.getItem("authorization"))
    : { user: {} };
}

class GroupService {
  getAllGroups() {
    return axios.get(urlJoin(Store.state.domainAddress, "/api/group/"), {
      headers: {
        Authorization: getAuthorization().token,
      },
    });
  }
}
export default new GroupService();
