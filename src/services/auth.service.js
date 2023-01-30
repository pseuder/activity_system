import axios from "axios";
import urlJoin from "url-join";
import Store from "../store";

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
            // 成功後即跳轉, 不需提示
            // alertData.show = true;
            // alertData.message = "登入成功";
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
}

export default new AuthService();
