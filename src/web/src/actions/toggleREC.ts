import { mediaDevicesErrors } from "../lib/errorStatus";
import { opsRecSVGType, opsRecShow } from "../lib/globalVars";

export default function () {
  if (this.mediaRecorder === undefined) {
    console.warn(mediaDevicesErrors.RecordingNotInProgress);
    return "not running";
  }
  const { mediaRecorder } = this;
  switch (mediaRecorder.state) {
    case "recording":
      mediaRecorder.pause();
      this.status = "pause";
      break;
    case "paused":
      mediaRecorder.resume();
      this.status = "recording";
      break;
  }
  if (this.status === "pause" || this.status === "recording") {
    const status = this.status === "pause" ? "play" : "pause";
    ["pause", "play"].forEach((item) => {
      document
        .querySelector(`[${opsRecSVGType}="${item}"]`)
        .setAttribute(opsRecShow, (item === status).toString());
    });
  }

  return mediaRecorder.state;
}
