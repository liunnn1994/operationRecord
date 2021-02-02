import { mediaDevicesErrors } from "../lib/errorStatus";

export default function () {
  this.isREC = false;
  try {
    this.stream.getTracks().forEach((track: any) => track.stop());
  } catch (e) {
    console.warn(mediaDevicesErrors.StreamNotDetected, e);
  }
  return "停止录制";
}
