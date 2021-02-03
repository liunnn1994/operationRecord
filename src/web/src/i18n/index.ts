import { generalErrors } from "../lib/errorStatus";

export default function (lang: string) {
  let langPackage;
  try {
    langPackage = require(`./${lang}.json`);
  } catch (e) {
    console.error(generalErrors.LanguagePackNotFound, e);
    langPackage = require(`./zh.json`);
  }
  return langPackage;
}
