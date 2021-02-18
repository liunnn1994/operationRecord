import { ORInterface } from "../interfaces/index";
import { formatVttTime } from "../lib/index";
import i18n from "../i18n/index";

const generateFilename = function (): string {
  const now = new Date();
  return `${now.getFullYear()}${
    now.getMonth() + 1
  }${now.getDate()}${now.getTime().toString().substr(-4)}`;
};
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
${i18n(this.lang).errorLevel}：${log.level}
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

export function download(this: ORInterface) {
  const fileName = generateFilename();
  generateVideo.call(this, fileName);
  generateVtt.call(this, fileName);
}
export async function upload(this: ORInterface) {
  const formData = new FormData();
  formData.append("extname", this.getExtname());
  formData.append("filename", generateFilename());
  formData.append("logs", JSON.stringify(this.logs));
  formData.append("startTime", String(this.startTime));
  formData.append("file", this.getBlob());

  try {
    await fetch(`${(this.url as string).replace(/\/+$/, "")}/v1/upload`, {
      method: "POST",
      body: formData,
    });
  } catch (e) {
    console.error(`${i18n(this.lang).uploadFail}：`, e);
  }
}
