// @ts-check

import { RESOURCES } from "./resource.js";

/**
 * @param { string } lang 
 */
export function localize(lang) {
    if (!RESOURCES.LANG) return console.warn("load resources first!");

    let data = RESOURCES.LANG.get(lang);
    if (!data) {
        console.warn(`language ${lang} not found!`);
        if (lang=="en_us") return;
        lang = "en_us";
        data = RESOURCES.LANG.get("en_us");
        if (!data) return console.warn("language en_us not found!");
    }

    const elements = document.querySelectorAll("*[localize]");

    for (const element of elements) {
        const key = element.getAttribute("key");
        if (!key) {
            console.warn(`element ${element} must have key attribute!`);
            continue;
        }
        const value = data.data[key];
        if (!value) {
            console.warn(`key ${key} for language ${lang} isn't set!`);
            continue;
        }
        element.innerHTML = value;
    }
}