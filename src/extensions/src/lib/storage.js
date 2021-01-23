export const setSyncStorage = function (data) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(data, function (items) {
      resolve(items);
    });
  });
};

export const getSyncStorage = function (data) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(data, function (items) {
      resolve(items);
    });
  });
};
