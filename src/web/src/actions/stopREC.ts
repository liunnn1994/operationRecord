export default function () {
  this.isREC = false;
  try {
    this.stream.getTracks().forEach((track: any) => track.stop());
  } catch (e) {
    console.warn("未检测到stream", e);
  }
  return "停止录制";
}
