import { envErrors } from "./errorStatus";
import { isArray } from "lodash-es";
import { InsertRule } from "../interfaces/index";
import { opsRecShow } from "./globalVars";
import { ORInterface } from "../interfaces/index";

// 检查运行环境
export function checkEnv() {
  let res = "";
  if (!navigator.mediaDevices) {
    if (
      !/localhost|127.0.0.1/.test(location.hostname ?? "") ||
      location.protocol !== "https"
    ) {
      res = envErrors.NotLocalhostOrHttps;
    } else {
      res = envErrors.NotSupportMediaDevices;
    }
  }
  return res;
}

export function objectToCssString(object: object) {
  return Object.entries(object)
    .map(([k, v]) => `${k}:${v}`)
    .join(";");
}

export function insertRule(rules: InsertRule | InsertRule[]) {
  let styleSheet = document.querySelector("style");
  if (styleSheet === null) {
    styleSheet = document.createElement("style");
    document.head.appendChild(styleSheet);
  }
  const r: InsertRule[] = isArray(rules) ? rules : [rules];
  r.forEach((rule: InsertRule) => {
    styleSheet?.sheet?.insertRule(
      `${rule.selector}{${objectToCssString(rule.style)}}`
    );
  });
}

export function toggleSVGVisible(this: ORInterface, selector: string) {
  const doms = this.DOM?.querySelectorAll(selector);
  if (doms) {
    [...doms].forEach((dom: Element) => {
      dom.setAttribute(
        opsRecShow,
        (dom.getAttribute(opsRecShow) !== "true").toString()
      );
    });
  }
}

export function formatVttTime(timestamp: number) {
  return `${Math.floor(timestamp / 3600000)
    .toString()
    .padStart(2, "0")}:${Math.floor((timestamp / 1000 / 60) % 60000)
    .toString()
    .padStart(2, "0")}:${Math.floor((timestamp / 1000) % 60)
    .toString()
    .padStart(2, "0")}.${timestamp.toString().substr(-3)}`;
}
