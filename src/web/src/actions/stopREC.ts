import { toggleSVGVisible } from "../lib/index";
import { opsRecShow, opsRecSVGType } from "../lib/globalVars";

export default function () {
  this._dataavailableCB = () => {
    this.status = "stop";
    this.startTime = 0;
    this.mediaRecorder = undefined;
    this.stream = undefined;
    this.recordedChunks.splice(0);
    this._dataavailableCB = function () {}.bind(this);
    toggleSVGVisible.call(this, ":scope > div:last-child svg");
    ["pause", "play"].forEach((item) => {
      document
        .querySelector(`[${opsRecSVGType}="${item}"]`)
        .setAttribute(opsRecShow, (item !== "pause").toString());
    });
    this.onStopREC && this.onStopREC();
  };

  // 停止所有track
  (this.stream?.getTracks() ?? []).forEach((track: any) => track.stop());
  // 停止mediaRecorder
  const { mediaRecorder } = this;
  if (mediaRecorder) {
    if (mediaRecorder.state === "pause") {
      mediaRecorder.resume();
      this.status = "recording";
    }
    mediaRecorder.stop();
  }
}
