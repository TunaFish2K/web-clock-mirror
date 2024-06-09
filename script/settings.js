import { parseColor } from "./render.js";

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
    
    open.addEventListener("click", () => {
        backgroundColorInput.value = globalThis.Clock.backgroundColor;
        textColorInput.value = globalThis.Clock.textColor;
        document.getElementById('settings').setAttribute('open', null);
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
    });

    close.addEventListener("click", () => {
        settings.removeAttribute("open");
    })
}