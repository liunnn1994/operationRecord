import OpRecInterface from "../types/index";
import { EventsInterfaces } from "../types/op-rec";

export default function (
  this: OpRecInterface,
  type: "startREC" | "stopREC" | "pauseREC" | "resumeREC",
  cb: () => void
) {
  const fnName = ("on" +
    type.replace(/^\S/, (s) => s.toUpperCase())) as EventsInterfaces["fnName"];
  this[fnName] = cb as any;
}

export function getExtname(this: OpRecInterface) {
  const { mimeType } = this;
  let extname = mimeType?.split(";")[0].split("/")[1] ?? "";
  switch (extname) {
    case "x-matroska":
      extname = "mkv";
      break;
  }
  return extname;
}
export function getBlob(this: OpRecInterface) {
  return new Blob(this.recordedChunks, {
    type: this.mimeType,
  });
}
