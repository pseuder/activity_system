# 表單驗證

vee-validate

# 錯誤訊息參數規範

```
錯誤訊息



@param {
    message: "伺服器錯誤，新活動建立失敗!",
    state: "error",
    error: err,
 } myError - 原錯誤訊息, 用於 log
@param { Object } messageData - 訊息提示組件

@example
handleHTTPResponse(myError, messageData);
```

# 上傳照片壓縮

- 支援 png, jpg, bmp, pdf 格式
- 15mb -> 200kb
- 10mb -> 100kb

# z-index

- alertMessage 2000
- dialog 1055
- loading 1060

# AI Commit

根據修改內容自動產生 commmit message
https://github.com/Nutlope/aicommits
