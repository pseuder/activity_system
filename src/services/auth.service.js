import axios from "axios";
import urlJoin from "url-join";
import Store from "../store";

export function getAuthorization() {
  if (localStorage.getItem("authorization")) {
    return JSON.parse(localStorage.getItem("authorization"));
  } else if (sessionStorage.getItem("authorization")) {
    return JSON.parse(sessionStorage.getItem("authorization"));
  } else {
    return { user: { _id: "0" } };
  }
}

class AuthService {
  localAuth(title, formData) {
    return axios.post(
      urlJoin(Store.state.domainAddress, "api/auth/", title.toLowerCase()),
      {
        formData,
      }
    );
  }

  googleAuth(response) {
    axios
      .post(urlJoin(Store.state.domainAddress, "api/auth/googleAuth"), {
        accessToken: response.access_token,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("authorization", JSON.stringify(res.data));
          return true;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }

  sessionAuth() {
    return axios.get(urlJoin(Store.state.domainAddress, "/api/auth_session"), {
      headers: {
        Authorization: getAuthorization().token,
      },
    });
  }
}

export default new AuthService();
