function handleHTTPResponse(state, payload) {
  console.error(payload);
  let { err, messageData } = payload;
  if (err.code === "ERR_NETWORK") {
    // 無法連接至伺服器
    messageData.message = "無法連接至伺服器";
    messageData.state = "error";
  } else {
    let { message, state, error } = err.response.data;
    console.error(error);
    // 伺服器預期的錯誤
    if (err.response.status == 401) {
      messageData.message = "請登入後再試!";
      messageData.state = "unauthorized";
    } else {
      messageData.message = message;
      messageData.state = state;
    }
  }
  messageData.show = true;
}
