// @ts-check

import { parseColor } from "./render.js";

export function init() {
    const submit = document.getElementById("submitSettings");
    const close = document.getElementById("closeSettings");
    const settings = document.getElementById("settings");
    /**
     * @type { HTMLInputElement }
     */
    // @ts-ignore
    const backgroundColorInput = document.getElementById("backgroundColorInput");
    /**
     * @type { HTMLInputElement }
     */
    // @ts-ignore
    const textColorInput = document.getElementById("textColorInput");
    const open = document.getElementById("openSettings");
    
    // @ts-ignore
    open.addEventListener("click", () => {
        backgroundColorInput.value = globalThis.Clock.backgroundColor;
        textColorInput.value = globalThis.Clock.textColor;
        // @ts-ignore
        document.getElementById('settings').setAttribute('open', null);
    });

    // @ts-ignore
    submit.addEventListener("click", () => {
        // @ts-ignore
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
    });

    // @ts-ignore
    close.addEventListener("click", () => {
        // @ts-ignore
        settings.removeAttribute("open");
    })
}