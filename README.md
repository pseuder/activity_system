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

# 規則

每項活動有四種標記

- registered -> 已報名: 出現取消報名按鈕
- expired -> 已過期: 只出現出現在我的活動頁面
- liked -> 喜愛的活動
- created -> 由當前使用者建立的活動

建立者不能參加自己建立的活動

針對此活動
pending: 尚未開放報名 - explore 可以看到但不能報名
ongoing - 開放報名期間 - explore 可以看到且可以報名
finished - 超過報名期間 - explore 不能看到, 但 mine 可以查看

針對使用者
enrolled
liked
created

- explore view
  只留下 pending, ongoing

- mine view
  全部顯示

- activity card
  pending - 報名按鈕+詳細資訊
  ongoing - 詳細資訊
  finished - 詳細資訊

created - (修改按鈕)+詳細資訊
liked - (報名按鈕)+詳細資訊
