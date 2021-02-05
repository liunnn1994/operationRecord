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
