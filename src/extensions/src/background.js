const setSyncStorage = function (data) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(data, function (items) {
      resolve(items);
    });
  });
};

const getSyncStorage = function (data) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(data, function (items) {
      resolve(items);
    });
  });
};
window.getSyncStorage = getSyncStorage;
window.setSyncStorage = setSyncStorage;

browser.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { action } = request;
  switch (action) {
    case "getOptions":
      sendResponse(getSyncStorage({ options: {} }));
      break;
    default:
      sendResponse(undefined);
      break;
  }
});
