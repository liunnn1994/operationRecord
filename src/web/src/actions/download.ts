import { ORInterface } from "../interfaces/index";

export default function (this: ORInterface) {
  const { mimeType } = this;
  let extname = mimeType?.split(";")[0].split("/")[1] ?? "";
  switch (extname) {
    case "x-matroska":
      extname = "mkv";
      break;
  }
  const now = new Date();
  const blob = new Blob(this.recordedChunks, {
    type: mimeType,
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";
  a.href = url;
  a.download = `${now.getFullYear()}${
    now.getMonth() + 1
  }${now.getDate()}${now.getTime().toString().substr(-4)}.${extname}`;
  a.click();
  window.URL.revokeObjectURL(url);
  a.parentNode?.removeChild(a);
}
