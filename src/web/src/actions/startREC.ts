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
  return this.stream;
}
