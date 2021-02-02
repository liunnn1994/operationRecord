import { mediaDevicesErrors } from "../lib/errorStatus";
import { ErrorStatus } from "../interfaces/index";

export default async function () {
  this.isREC = true;
  try {
    this.stream = await navigator.mediaDevices.getDisplayMedia(
      this.mediaConstraints
    );
  } catch (e) {
    const name = e.name as ErrorStatus["key"];
    const errorMsg = mediaDevicesErrors[name] ?? "";
    console.error(errorMsg, e);
  }
  const mediaRecorder = new MediaRecorder(this.stream, {
    mimeType: this.mimeType,
  });
  mediaRecorder.addEventListener("dataavailable", (event: any) => {
    if (event.data.size > 0) {
      this.recordedChunks.push(event.data);
      this._download();
    } else {
      console.error(mediaDevicesErrors.StreamNotDetected);
    }
  });
  mediaRecorder.start();
  return this.stream;
}
