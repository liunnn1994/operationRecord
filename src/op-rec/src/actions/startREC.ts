import { mediaDevicesErrors } from "../lib/errorStatus";
import { ErrorStatus, ORInterface } from "../interfaces/index";
import i18n from "../i18n/index";
import { toggleSVGVisible } from "../lib/index";
import { opsRecShow } from "../lib/globalVars";

export default async function (this: ORInterface) {
  this.stopREC();
  this.reset();
  let isAllow = false;
  try {
    this.stream = await navigator.mediaDevices.getDisplayMedia(
      this.mediaConstraints
    );
    isAllow = true;
  } catch (e) {
    const name = e.name as ErrorStatus["key"];
    const errorMsg = mediaDevicesErrors[name] ?? "";
    console.error(errorMsg, e);
  }
  if (!isAllow) {
    return undefined;
  }
  const videoTrack = this.stream?.getVideoTracks()[0];
  if (videoTrack) {
    videoTrack.addEventListener("ended", () => {
      this.stopREC();
    });
  }

  if (!this.stream) {
    return undefined;
  }
  window.addEventListener("error", this._errorCollector.bind(this));
  const mediaRecorder = new MediaRecorder(this.stream, {
    mimeType: this.mimeType,
  });
  this.mediaRecorder = mediaRecorder;
  mediaRecorder.addEventListener("dataavailable", (event: any) => {
    if (event.data.size > 0) {
      this.recordedChunks.push(event.data);
      if (this.url === "local") {
        if (confirm(i18n(this.lang ?? "").downloadConfirm)) {
          this._download();
        }
      } else {
        this._upload();
      }
    } else {
      console.error(mediaDevicesErrors.StreamNotDetected);
    }
    this._dataavailableCB();
  });
  this.status = "recording";
  this.startTime = new Date().getTime();
  mediaRecorder.start();

  toggleSVGVisible.call(this, ":scope > div:last-child svg");

  const doms = this.DOM?.querySelectorAll(":scope > div:first-child svg");
  if (doms) {
    [...doms].forEach((dom: Element, index: number) => {
      dom.setAttribute(opsRecShow, (!!index).toString());
    });
  }
  if (this.onStartREC) {
    this.onStartREC(this.stream);
  }
  return this.stream;
}
