import { mediaDevicesErrors } from "../lib/errorStatus";
import { opsRecSVGType, opsRecShow } from "../lib/globalVars";
import OpRecInterface from "../types/index";

export default function (this: OpRecInterface) {
  if (this.mediaRecorder === undefined) {
    console.warn(mediaDevicesErrors.RecordingNotInProgress);
    return "not running";
  }
  const { mediaRecorder } = this;
  switch (mediaRecorder.state) {
    case "recording":
      mediaRecorder.pause();
      this.status = "paused";
      if (this.onPauseREC) {
        this.onPauseREC();
      }
      break;
    case "paused":
      mediaRecorder.resume();
      this.status = "recording";
      if (this.onResumeREC) {
        this.onResumeREC();
      }
      break;
  }
  if (this.status === "paused" || this.status === "recording") {
    const status = this.status === "paused" ? "play" : "paused";
    ["paused", "play"].forEach((item) => {
      document
        .querySelector(`[${opsRecSVGType}="${item}"]`)
        ?.setAttribute(opsRecShow, (item === status).toString());
    });
  }

  return mediaRecorder.state;
}
