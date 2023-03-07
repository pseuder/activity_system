# 表單驗證

vee-validate

# axios response

- 成功  
  ![axiosSuccess](src\assets\readme\axiosSuccess.png)
- 無法連接至伺服器  
  ![axiosNetworkError](src\assets\readme\axiosNetworkError.png)
- 未授權  
  ![axiosInAuthorized](src\assets\readme\axiosInAuthorized.png)
- 預期的錯誤  
  ![expectedError](src\assets\readme\expectedError.png)
- 伺服器內部錯誤  
  ![serverError](src\assets\readme\serverError.png)

# 錯誤訊息參數規範

```
@name handleAxiosResponse
@param {
    message: "伺服器錯誤，新活動建立失敗!",
    state: "error",
    error: err,
 } myError - 原錯誤訊息, 用於 log
@param { Object } messageData - 訊息提示組件

@example
handleAxiosResponse(myError, messageData);
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
