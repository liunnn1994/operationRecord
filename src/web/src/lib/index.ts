import { envErrors } from "./errorStatus";
import { isArray } from "lodash-es";
import { InsertRule } from "../interfaces/index";
import { opsRecShow } from "./globalVars";

/**
 * 检查运行环境
 *
 * */
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

export function objectToCssString(object: Object) {
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
  const r: object[] = isArray(rules) ? rules : [rules];
  r.forEach((rule: InsertRule) => {
    styleSheet.sheet.insertRule(
      `${rule.selector}{${objectToCssString(rule.style)}}`
    );
  });
}

export function toggleSVGVisible(selector: string) {
  [...this.DOM.querySelectorAll(selector)].forEach((dom: HTMLElement) => {
    dom.setAttribute(
      opsRecShow,
      (dom.getAttribute(opsRecShow) !== "true").toString()
    );
  });
}
