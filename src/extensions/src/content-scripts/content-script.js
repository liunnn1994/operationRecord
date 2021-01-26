function injectCustomJs(jsPath) {
  const temp = document.createElement("script");
  temp.setAttribute("type", "text/javascript");
  temp.src = chrome.extension.getURL(jsPath);
  temp.onload = function () {
    this.parentNode.removeChild(this);
  };
  document.body.appendChild(temp);
}

const injectScripts = ["inject"];

async function init() {
  // 读取设置
  sessionStorage.setItem(
    "OPS_REC",
    JSON.stringify(await sendMessage({ action: "getOptions" }))
  );
  // 注入inject类型的脚本
  for (let index = 0; index < injectScripts.length; index++) {
    const scriptName = injectScripts[index];
    injectCustomJs(`js/inject/${scriptName}.js`);
  }
}

function sendMessage(data) {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage(data, function (response) {
      resolve(response);
    });
  });
}

init();
