import { localize } from "./localization.js";
import { parseColor } from "./render.js";
import { RESOURCES } from "./resource.js";

export let currentLanguage;
export function save() {
    localStorage.setItem("language", currentLanguage);
}

export function init() {
    const submit = document.getElementById("submitSettings");
    const close = document.getElementById("closeSettings");
    const settings = document.getElementById("settings");

    /**
     * @type { HTMLInputElement }
     */
    const backgroundColorInput = document.getElementById("backgroundColorInput");
    /**
     * @type { HTMLInputElement }
     */
    const textColorInput = document.getElementById("textColorInput");
    const open = document.getElementById("openSettings");

    /**
     * @type { HTMLSelectElement }
     */
    const languageSelect = document.getElementById("languageSelect");
    
    currentLanguage = localStorage.getItem("language") ?? navigator.language.toLowerCase();
    if (!RESOURCES.LANG.get(currentLanguage)) currentLanguage = "en";

    const languages = []; 
    for (const language of RESOURCES.LANG.keys()) {
        languages.push(language);
    }

    languages.forEach((language, index) => {
        const el = document.createElement("option");
        el.value = index;
        el.innerHTML = RESOURCES.LANG.get(language).data.__LANGUAGE_NAME;
        languageSelect.appendChild(el);
    });

    languageSelect.value = languages.indexOf(currentLanguage);
    
    open.addEventListener("click", () => {
        if (settings.getAttribute("open")) {
            settings.removeAttribute("open");
            return;
        }

        backgroundColorInput.value = globalThis.Clock.backgroundColor;
        textColorInput.value = globalThis.Clock.textColor;
        settings.setAttribute("open", true);
    });

    submit.addEventListener("click", () => {
        settings.removeAttribute("open");
        const backgroundColor = backgroundColorInput.value;
        const textColor = textColorInput.value;

        try {
            globalThis.Clock.backgroundColor = parseColor(backgroundColor);
        } catch(e) {
            console.warn(`bad background color '${backgroundColor}'`);
        }
        try {
            globalThis.Clock.textColor = parseColor(textColor);
        } catch {
            console.warn(`bad text color '${backgroundColor}'`);
        }

        if (languages[languageSelect.value] != currentLanguage) {
            localize(languages[languageSelect.value]);
        }
        currentLanguage = languages[languageSelect.value];
    });

    close.addEventListener("click", () => {
        settings.removeAttribute("open");
    })
}