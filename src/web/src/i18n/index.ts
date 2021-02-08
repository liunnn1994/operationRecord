import { generalErrors } from "../lib/errorStatus";

export default function (lang: string | undefined) {
  let langPackage;
  try {
    langPackage = require(`./${lang ?? "zh"}.json`);
  } catch (e) {
    console.error(generalErrors.LanguagePackNotFound, e);
    langPackage = require(`./zh.json`);
  }
  return langPackage;
}
