import { record, pause, stop } from "../assets/icons";
export default function () {
  const box = document.createElement("div");
  [record, pause, stop].forEach((dom: any[]) => {
    const svg = document.createElement("svg");
    [
      ["viewBox", "0 0 1024 1024"],
      ["version", "1.1"],
      ["xmlns", "http://www.w3.org/2000/svg"],
      ["width", "128"],
      ["height", "128"],
    ].forEach((kv: string[]) => {
      svg.setAttribute(kv[0], kv[1]);
    });
    dom.forEach((item: any) => {
      const d = document.createElement(item.tag);
      for (const [key, value] of Object.entries(item.attrs)) {
        d.setAttribute(key, value);
      }
      svg.appendChild(d);
    });
  });
  document.body.appendChild(box);
  return box;
}
