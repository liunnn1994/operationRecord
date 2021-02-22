import { record, pause, stop, play } from "../assets/icons";
import { insertRule } from "../lib/index";
import i18n from "../i18n/index";
import {
  opsRecShow,
  opsRecBox,
  opsRecIcon,
  opsRecSVGType,
} from "../lib/globalVars";
import OpRecInterface from "../types/index";

export const clickDom = function (this: OpRecInterface, type: string) {
  const { status } = this;
  if (type === "playPause") {
    switch (status) {
      case "stop":
        this.startREC();
        break;
      case "recording":
      case "paused":
        this.toggleREC();
        break;
    }
  } else if (type === "recordStop") {
    switch (status) {
      case "stop":
        this.startREC();
        break;
      case "recording":
        this.stopREC();
        break;
    }
  }
};

const createSvg = function (
  dom: any[],
  parent: HTMLElement,
  index: number,
  title: string,
  type: string
) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const t = document.createElementNS("http://www.w3.org/2000/svg", "title");
  t.innerHTML = title;
  svg.appendChild(t);
  svg.setAttribute(opsRecIcon, "");
  svg.setAttribute(opsRecShow, index % 2 === 0 ? "true" : "false");
  svg.setAttribute(opsRecSVGType, type);

  [
    ["viewBox", "0 0 1024 1024"],
    ["xmlns", "http://www.w3.org/2000/svg"],
  ].forEach((kv: string[]) => {
    svg.setAttribute(kv[0], kv[1]);
  });

  dom.forEach((item: any) => {
    const d = document.createElementNS("http://www.w3.org/2000/svg", item.tag);
    for (const [key, value] of Object.entries(item.attrs)) {
      d.setAttribute(key, value);
    }
    svg.appendChild(d);
  });
  parent.appendChild(svg);
};

export default function (this: OpRecInterface) {
  if (!this.dom?.show) {
    // 如果不需要dom直接返回undefined
    return undefined;
  }

  insertRule.call(this, [
    {
      selector: `[${opsRecBox}]`,
      style: this.dom.style,
    },
    {
      selector: `[${opsRecIcon}]`,
      style: {
        width: "80%",
        height: "80%",
      },
    },
    {
      selector: `[${opsRecShow}="true"]`,
      style: {
        display: "block",
      },
    },
    {
      selector: `[${opsRecShow}="false"]`,
      style: {
        display: "none",
      },
    },
    {
      selector: `[${opsRecBox}]>div`,
      style: {
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        "background-color": "#fff",
        transition: "all 0.2s ease-in-out , transform 0.2s ease-in-out .2s",
        transform: "translate(0)",
        "border-radius": "50%",
        border: "1px solid transparent",
        display: "flex",
        "justify-content": "center",
        "align-items": "center",
      },
    },
    {
      selector: `[${opsRecBox}]:hover >div:nth-of-type(1)`,
      style: {
        transform: "translate(calc(-100% - 5px))",
      },
    },
    {
      selector: `[${opsRecBox}] >div:hover`,
      style: {
        "border-color": "#00C9CA",
      },
    },
  ]);

  const box = document.createElement("div");
  box.setAttribute(opsRecBox, "");
  const playPauseBox = document.createElement("div");
  const recordStopBox = document.createElement("div");
  [play, pause].forEach((dom: any[], index: number) => {
    createSvg(
      dom,
      playPauseBox,
      index,
      index ? i18n(this.lang ?? "").pauseREC : i18n(this.lang ?? "").resumeREC,
      index ? "paused" : "play"
    );
  });
  [record, stop].forEach((dom: any[], index: number) => {
    createSvg(
      dom,
      recordStopBox,
      index,
      index ? i18n(this.lang ?? "").stopREC : i18n(this.lang ?? "").startREC,
      index ? "stop" : "record"
    );
  });
  box.appendChild(playPauseBox);
  box.appendChild(recordStopBox);
  document.body.appendChild(box);
  playPauseBox.addEventListener(
    "click",
    this._clickDom.bind(this, "playPause")
  );
  recordStopBox.addEventListener(
    "click",
    this._clickDom.bind(this, "recordStop")
  );
  this.DOM = box;
  return box;
}
