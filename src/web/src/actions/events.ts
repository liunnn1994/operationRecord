import { ORInterface } from "../interfaces/index";

export default function (
  this: ORInterface,
  type: "startREC" | "stopREC" | "pauseREC" | "resumeREC",
  cb: Function
) {
  const fnName = ("on" + type.replace(/^\S/, (s) => s.toUpperCase())) as
    | "onStartREC"
    | "onStopREC"
    | "onPauseREC"
    | "onResumeREC";
  this[fnName] = cb;
}

export function getExtname(this: ORInterface) {
  const { mimeType } = this;
  let extname = mimeType?.split(";")[0].split("/")[1] ?? "";
  switch (extname) {
    case "x-matroska":
      extname = "mkv";
      break;
  }
  return extname;
}
export function getBlob(this: ORInterface) {
  return new Blob(this.recordedChunks, {
    type: this.mimeType,
  });
}
