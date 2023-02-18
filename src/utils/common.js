import { reactive } from "vue";
import ActivityService from "@/services/activity.service.js";
import UserService from "@/services/user.service.js";
import GroupService from "@/services/group.service.js";

// data
export let sortStatus = {
  UP: 0,
  DOWN: 1,
  None: 2,
};

export let sortOptions = reactive([
  { name: "活動時間", status: sortStatus.None, attribute: "activity_time" },
  { name: "報名時間", status: sortStatus.None, attribute: "enroll_time" },
  { name: "報名價格", status: sortStatus.None, attribute: "fee" },
  { name: "查看人數", status: sortStatus.None, attribute: "watch" },
  {
    name: "參加人數",
    status: sortStatus.None,
    attribute: "enrollment_display",
  },
]);

export let userSetting = reactive({
  displayMode: "list",
  selectedTag: "已報名",
});

export let messageData = reactive({
  show: false,
  state: "success",
  message: "成功!",
});

export let activityData = reactive({
  _id: "",
  title: "",
  object: [],
  location: "",
  activity_time: [],
  enroll_time: [],
  fee: 0,
  manager: "",
  manager_contact: "",
  quota: 0,
  activity_imgs: [],
  description: "",
});

// functions
export function handleHTTPResponse(err, messageData) {
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

export function sorting(argc) {
  let { option, activityData_display, activityData } = argc;

  // 將其他排序選項重置
  sortOptions.map((opt) => {
    if (opt.name != option.name) opt.status = sortStatus.None;
  });

  // status於0, 1, 2循環, 用於控制箭頭顯示和判斷遞增遞減
  if (option.status == sortStatus.DOWN) {
    activityData_display = reactive(JSON.parse(JSON.stringify(activityData)));
  } else if (option.name === "活動時間" || option.name === "報名時間") {
    activityData_display.sort(function (pre, next) {
      return pre[option.attribute][0] > next[option.attribute][0]
        ? (option.status - 1) * 1
        : (option.status - 1) * -1;
    });
  } else {
    activityData_display.sort(function (pre, next) {
      return pre[option.attribute] > next[option.attribute]
        ? (option.status - 1) * 1
        : (option.status - 1) * -1;
    });
  }
  option.status = (option.status + 1) % 3;
}

export function myActivityFiltering(argc) {
  let { option, activityData } = argc;
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
    return reactive(JSON.parse(JSON.stringify(activityData)));
  } else {
    return reactive(
      JSON.parse(
        JSON.stringify(
          activityData.filter((activity) =>
            activity.object.includes(option.name)
          )
        )
      )
    );
  }
}

export function liking(activity) {
  UserService.likeActivity(activity._id);
  activity.liked = !activity.liked;
}

export function detailing(argc) {
  let { activity, detialDialogData } = argc;
  ActivityService.watch(activity._id);
  activity.watch += 1;
  detialDialogData.value = activity;
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

export function fillEditData(argc) {
  let { editDialogData, activity } = argc;
  for (let key in editDialogData) editDialogData[key] = activity[key];
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
    groupData.unshift({
      _id: "0",
      authority: [],
      createTime: "",
      member: [],
      name: "全部",
      updateTime: "",
    });
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
      created = activity.creator._id === userData._id;

      // 只留下跟使用者有關的資料
      if (registered || expired || liked || created) {
        activity.object_display = activity.object.join("  ");

        //utc時間轉換
        activity.activity_time[0] = new Date(activity.activity_time[0]);
        activity.activity_time[1] = new Date(activity.activity_time[1]);

        activity.activity_time_display = [
          activity.activity_time[0].toLocaleDateString(),
          activity.activity_time[1].toLocaleDateString(),
        ].join("~");

        activity.enroll_time[0] = new Date(activity.enroll_time[0]);
        activity.enroll_time[1] = new Date(activity.enroll_time[1]);

        activity.enroll_time_display = [
          activity.enroll_time[0].toLocaleDateString(),
          activity.enroll_time[1].toLocaleDateString(),
        ].join("~");

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
