import { reactive } from "vue";
import ActivityService from "@/services/activity.service.js";
import UserService from "@/services/user.service.js";
import GroupService from "@/services/group.service.js";

// data

export const sortStatusTemplete = {
  unsorted: 0,
  ascending: 1,
  descending: -1,
};

export let sortOptionTemplete = [
  {
    name: "活動時間",
    status: sortStatusTemplete.unsorted,
    attribute: "activity_time",
  },
  {
    name: "報名時間",
    status: sortStatusTemplete.unsorted,
    attribute: "enroll_time",
  },
  { name: "報名價格", status: sortStatusTemplete.unsorted, attribute: "fee" },
  { name: "查看人數", status: sortStatusTemplete.unsorted, attribute: "watch" },
  {
    name: "參加人數",
    status: sortStatusTemplete.unsorted,
    attribute: "enrollment_display",
  },
];

export let userSettingTemplete = reactive({
  displayMode: "list",
  selectedTag: "已報名",
  sortOption: undefined,
});

export let messageDataTemplete = {
  show: false,
  state: "success",
  message: "成功!",
};

export let activityDataTemplete = {
  _id: "",
  title: "",
  object: [],
  location: "",
  activity_time: [],
  enroll_time: [],
  activity_time_editable: [],
  enroll_time_editable: [],
  fee: 0,
  manager: "",
  manager_contact: "",
  quota: 0,
  activity_imgs: [],
  description: "",
};

// functions
export function handleHTTPResponse(myError, messageData) {
  if (myError.name === "AxiosError") {
    // Axios問題
    if (myError.code === "ERR_NETWORK") {
      messageData.message = "無法連接至伺服器";
      messageData.state = "error";
    } else if (myError.code === "ERR_BAD_REQUEST") {
      if (myError.response && myError.response.status == 401) {
        messageData.message = "請登入後再試!";
        messageData.state = "unauthorized";
      }
    } else if (myError.code === "ERR_BAD_RESPONSE") {
      let { error, expected, message, state } = myError.response.data;
      if (expected) {
        messageData.message = message;
        messageData.state = state;
      } else {
        console.error(error);
        messageData.message = "意外的錯誤";
        messageData.state = "error";
      }
    }
  } else {
    // 其他問題
    messageData.message = "意外的錯誤";
    messageData.state = "error";
  }
  messageData.show = true;
}

export function sorting(argc) {
  let { activityData_filtered, option } = argc;

  if (!option) return activityData_filtered.value;
  let tempData = JSON.parse(JSON.stringify(activityData_filtered.value));

  if (option.status == sortStatusTemplete.unsorted) {
    return tempData;
  } else if (option.name === "活動時間" || option.name === "報名時間") {
    return tempData.sort(function (pre, next) {
      return pre[option.attribute][0] > next[option.attribute][0]
        ? option.status * 1
        : option.status * -1;
    });
  } else {
    return tempData.sort(function (pre, next) {
      return pre[option.attribute] > next[option.attribute]
        ? option.status * 1
        : option.status * -1;
    });
  }
}

export function myActivityFiltering(argc) {
  let { option, activityData, userSetting } = argc;
  userSetting.selectedTag = option.name;

  if (option.attribute === "all") {
    return reactive(JSON.parse(JSON.stringify(activityData)));
  } else {
    return reactive(
      JSON.parse(
        JSON.stringify(
          activityData.filter((activity) => {
            return activity[option.attribute];
          })
        )
      )
    );
  }
}

export function exploreActivityFiltering(argc) {
  let { option, activityData } = argc;
  userSetting.selectedTag = option.name;

  if (option.name === "全部") {
    return JSON.parse(JSON.stringify(activityData));
  } else {
    return JSON.parse(
      JSON.stringify(
        activityData.filter((activity) => activity.object.includes(option.name))
      )
    );
  }
}

export function liking(activity) {
  UserService.likeActivity(activity._id);
  activity.liked = !activity.liked;
}

export function enrolling(argc) {
  let { activity } = argc;

  ActivityService.enroll(activity._id)
    .then((res) => {
      messageData.message = res.data;
      messageData.state = "success";
      messageData.show = true;

      activity.registered = true;
      activity.enrollment_display += 1;
    })
    .catch((err) => {
      if (err.name === "AxiosError") handleHTTPResponse(err, messageData);
      else console.error(err);
    });
}

export function canceling(argc) {
  let { activity } = argc;

  ActivityService.cancel(activity._id)
    .then((res) => {
      messageData.message = res.data;
      messageData.state = "success";
      messageData.show = true;

      activity.enrollment_display -= 1;
      activity.registered = false;
    })
    .catch((err) => {
      if (err.name === "AxiosError") handleHTTPResponse(err, messageData);
      else console.error(err);
    });
}

export function detailing(argc) {
  let { activity, detialDialogData } = argc;
  ActivityService.watch(activity._id);
  activity.watch += 1;
  detialDialogData.value = activity;
}

export function fillEditData(argc) {
  let { activity, editDialogData } = argc;
  editDialogData.value = activity;
}

export function showAlert(data) {
  if (data.state === "success") {
    messageData.message = data.message;
    messageData.state = "success";
    messageData.show = true;
  } else {
    let err = data.err;
    if (err.name === "AxiosError") handleHTTPResponse(err, messageData);
    else console.error(err);
  }
}

export async function fetchGroupData() {
  let groupData;
  await GroupService.getAllGroups().then((res) => {
    groupData = res.data;
  });
  return groupData;
}

export async function fetchAndMarkActivityData() {
  let user_enrolledActivity = [],
    user_likedActivity = [],
    userData;
  let activityData = reactive([]);

  // 獲取當前使用者已參加, 喜愛活動
  await UserService.getUserInfo().then((res) => {
    userData = res.data;

    userData.enrolledActivity.forEach((user_enrolled) => {
      user_enrolledActivity.push(user_enrolled._id);
    });

    userData.likedActivity.forEach((user_liked) => {
      user_likedActivity.push(user_liked._id);
    });
  });

  // 獲取活動資料並標記
  await ActivityService.explore().then((res) => {
    res.data.map((activity) => {
      let registered = false,
        expired = false,
        liked = false,
        created = false;

      registered = user_enrolledActivity.includes(activity._id);
      expired = new Date(activity.activity_time[1]) < new Date();
      liked = user_likedActivity.includes(activity._id);
      created = activity.creator && activity.creator._id === userData._id;

      // 只留下跟使用者有關的資料
      if (registered || expired || liked || created) {
        activity.object_display = activity.object.join("  ");

        // utc時間轉Date
        activity.activity_time[0] = new Date(activity.activity_time[0]);
        activity.activity_time[1] = new Date(activity.activity_time[1]);

        activity.enroll_time[0] = new Date(activity.enroll_time[0]);
        activity.enroll_time[1] = new Date(activity.enroll_time[1]);

        // Date for display
        activity.activity_time_display = [
          activity.activity_time[0].toLocaleDateString(),
          activity.activity_time[1].toLocaleDateString(),
        ].join("~");

        activity.enroll_time_display = [
          activity.enroll_time[0].toLocaleDateString(),
          activity.enroll_time[1].toLocaleDateString(),
        ].join("~");

        // Date for editDialog
        let date, year, month, day, dateString1, dateString2;
        date = activity.activity_time[0];
        year = date.getFullYear();
        month = date.getMonth() + 1; // 取得月份，注意要加 1
        day = date.getDate();

        dateString1 = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        date = activity.activity_time[1];
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        dateString2 = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        activity.activity_time_editable = [dateString1, dateString2];

        date = activity.enroll_time[0];
        year = date.getFullYear();
        month = date.getMonth() + 1; // 取得月份，注意要加 1
        day = date.getDate();

        dateString1 = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        date = activity.enroll_time[1];
        year = date.getFullYear();
        month = date.getMonth() + 1;
        day = date.getDate();
        dateString2 = `${year}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;

        activity.enroll_time_editable = [dateString1, dateString2];

        activity.enrollment_display = activity.enrollment.length;

        // 如果自己是創立者, 從已報名, 已截止中排除, 便於分類
        if (created) registered = expired = false;
        // 如果過期了, 從已報名中排除, 便於分類
        if (expired) registered = false;

        activity["registered"] = registered;
        activity["expired"] = expired;
        activity["liked"] = liked;
        activity["created"] = created;

        activityData.push(activity);
      }
    });
  });
  return activityData;
}

export function compress(base64, quality, mimeType) {
  //  图片最大宽度
  const MAX_WIDTH = 800;
  let cvs = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    // 图片偏移值
    let offetX = 0;
    img.onload = () => {
      if (img.width > MAX_WIDTH) {
        cvs.width = MAX_WIDTH;
        cvs.height = (img.height * MAX_WIDTH) / img.width;
        offetX = (img.width - MAX_WIDTH) / 2;
      } else {
        cvs.width = img.width;
        cvs.height = img.height;
      }
      let ctx = cvs
        .getContext("2d")
        .drawImage(img, 0, 0, cvs.width, cvs.height);
      let imageData = cvs.toDataURL(mimeType, quality / 100);
      resolve(imageData);
    };
  });
}

export function fileToBase64ByQuality(file, quality) {
  let fileReader = new FileReader();
  let type = file.type;
  return new Promise((resolve, reject) => {
    if (window.URL || window.webkitURL) {
      resolve(compress(URL.createObjectURL(file), quality, type));
    } else {
      fileReader.onload = () => {
        resolve(compress(fileReader.result, quality, type));
      };
      fileReader.onerror = (e) => {
        reject(e);
      };
      fileReader.readAsDataURL(file);
    }
  });
}

export function convertBase64UrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  let _blob = new Blob([ab], { type: mimeType });
  console.log(_blob);
  return _blob;
}
