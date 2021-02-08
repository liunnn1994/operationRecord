import { ORInterface } from "../interfaces/index";
import { formatVttTime } from "../lib/index";

const generateVideo = function (this: ORInterface, fileName: string) {
  const url = URL.createObjectURL(this.getBlob());
  generateDownloadLink.call(this, url, fileName, this.getExtname());
  window.URL.revokeObjectURL(url);
};

const generateVtt = function (this: ORInterface, fileName: string) {
  const { startTime } = this;
  const header = `WEBVTT - ${fileName}字幕文件`;
  const { logs } = this;
  const content = `${header}
${logs
  .map((log, index: number) => {
    const { timestamp } = log;
    const nextTamp = logs[index + 1]?.timestamp ?? new Date().getTime();
    return `

${formatVttTime(timestamp - startTime)} --> ${formatVttTime(
      nextTamp - startTime
    )}
错误等级：${log.level}
${log.content}`;
  })
  .join("")}`;
  generateDownloadLink.call(
    this,
    "data:text/vtt;charset=utf-8," + encodeURIComponent(content),
    fileName,
    "vtt"
  );
};

const generateDownloadLink = function (
  this: ORInterface,
  url: string,
  fileName: string,
  extname: string
) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = url;
  a.download = `${fileName}.${extname}`;
  a.click();
  a.parentNode?.removeChild(a);
};

export default function (this: ORInterface) {
  const now = new Date();
  const fileName = `${now.getFullYear()}${
    now.getMonth() + 1
  }${now.getDate()}${now.getTime().toString().substr(-4)}`;
  generateVideo.call(this, fileName);
  generateVtt.call(this, fileName);
}
