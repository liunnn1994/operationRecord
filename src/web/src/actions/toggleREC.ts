import { mediaDevicesErrors } from "../lib/errorStatus";

export default function () {
  if (this.mediaRecorder === undefined) {
    console.warn(mediaDevicesErrors.RecordingNotInProgress);
    return "not running";
  }
  const { mediaRecorder } = this;
  switch (mediaRecorder.state) {
    case "recording":
      mediaRecorder.pause();
      break;
    case "paused":
      mediaRecorder.resume();
      break;
  }
  return mediaRecorder.state;
}
