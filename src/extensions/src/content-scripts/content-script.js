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

function init() {
  // 注入inject类型的脚本
  for (let index = 0; index < injectScripts.length; index++) {
    const scriptName = injectScripts[index];
    injectCustomJs(`js/inject/${scriptName}.js`);
  }
}
init();
