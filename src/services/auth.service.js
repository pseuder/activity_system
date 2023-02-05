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
  localAuth(title, formData, alertData) {
    return new Promise(function (resolve) {
      axios
        .post(
          urlJoin(Store.state.domainAddress, "api/auth/", title.toLowerCase()),
          {
            formData,
          }
        )
        .then((res) => {
          if (res.data) {
            localStorage.setItem("authorization", JSON.stringify(res.data));
          }
          resolve(true);
        })
        .catch((err) => {
          if (err.code === "ERR_BAD_REQUEST") {
            alertData.message = err.response.data;
            alertData.state = "warning";
          } else if (err.code === "ERR_NETWORK") {
            alertData.message = "伺服器錯誤";
            alertData.state = "error";
          } else {
            alertData.message = "非預期的錯誤";
            alertData.state = "error";
          }
          alertData.show = true;
          resolve(false);
        });
    });
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
