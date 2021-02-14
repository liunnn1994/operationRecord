import { toggleSVGVisible } from "../lib/index";
import { opsRecShow, opsRecSVGType } from "../lib/globalVars";
import { ORInterface } from "../interfaces/index";

export function reset(this: ORInterface) {
  this.startTime = 0;
  this.mediaRecorder = undefined;
  this.stream = undefined;
  this.recordedChunks.splice(0);
  this.logs.splice(0);
}

export default function (this: ORInterface) {
  this._dataavailableCB = () => {
    window.removeEventListener("error", this._errorCollector.bind(this));
    this.status = "stop";
    this._dataavailableCB = function () {}.bind(this);
    toggleSVGVisible.call(this, ":scope > div:last-child svg");
    ["paused", "play"].forEach((item) => {
      document
        .querySelector(`[${opsRecSVGType}="${item}"]`)
        ?.setAttribute(opsRecShow, (item !== "paused").toString());
    });
    this.onStopREC && this.onStopREC();
  };

  // 停止所有track
  (this.stream?.getTracks() ?? []).forEach((track: any) => track.stop());
  // 停止mediaRecorder
  const { mediaRecorder } = this;
  if (mediaRecorder) {
    if (mediaRecorder.state === "paused") {
      mediaRecorder.resume();
      this.status = "recording";
    }
    try{
      mediaRecorder.stop();
    }catch (e) {}
  }
}
