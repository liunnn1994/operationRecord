/**
 * 检查运行环境
 *
 * */
export function checkEnv() {
  let res = "";
  if (!navigator.mediaDevices) {
    res = "您的设备不支持mediaDevices API。请更新chrome或更换现代浏览器重试。";
  }
  return res;
}
