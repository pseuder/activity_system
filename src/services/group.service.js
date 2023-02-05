import axios from "axios";
import urlJoin from "url-join";
import Store from "../store";
import { getAuthorization } from "./auth.service";

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
