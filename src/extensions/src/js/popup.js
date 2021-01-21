// 设置项的默认值
const settings = {
  "host-name": "",
  "masker-color": "#f6b73c",
  "masker-opacity": 0.6,
  "option-size": 12,
};
const storage = {
  get(data, type = "sync") {
    return new Promise((resolve) => {
      chrome.storage[type].get(data, function (items) {
        resolve(items);
      });
    });
  },
  set(data, type = "sync") {
    return new Promise((resolve) => {
      chrome.storage[type].set(data, function (items) {
        resolve(items);
      });
    });
  },
};

// 设置表单
const settingsForm = document.querySelector("#settings-form");

// 获取错误
window.addEventListener("error", async function (err) {
  console.log("err", err);
  await logger("error", err);
});

// 记录log
async function logger(logType, data) {
  const logs = [];
  logs.push({
    isTrusted: data?.isTrusted ?? false,
    lineno: data?.lineno ?? "未知",
    colno: data?.colno ?? "未知",
    message: typeof data === "string" ? data : data?.message ?? "未知",
    errorMessage:
      typeof data === "string" ? data : data?.error?.message ?? "未知",
    filename: data?.filename ?? "未知",
    timeStamp: new Date().getTime(),
    logType,
  });
  return logs;
}

// 初始化设置
initSettings(settings);
async function initSettings(defaultSettings) {
  const { settings } = await storage.get({
    settings: defaultSettings,
  });

  for (const [key, value] of Object.entries(settings)) {
    document.querySelector(`#${key}`).value = value;
  }
}

// 保存设置
settingsForm.addEventListener(
  "submit",
  async function (event) {
    // 验证表单
    if (!settingsForm.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    }
    settingsForm.classList.add("was-validated");
    for (const key of Object.keys(settings)) {
      settings[key] = document.querySelector(`#${key}`).value;
    }
    await storage.set({
      settings,
    });
  },
  false
);
