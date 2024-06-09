import { Clock } from "./clock.js";
import { localize } from "./localization.js"
import { render } from "./render.js";
import { loadAll as loadAllResources } from "./resource.js";
import { init as initSettings } from "./settings.js";
import { start as startCursorHide } from "./cursor.js";

/**
 * 
 * @param { number } ms
 * @return { Promise<void> } 
 */
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

window.addEventListener("load", async () => {
    await loadAllResources();

    globalThis.Clock = Clock;
    Clock.load();
    initSettings();

    localize(navigator.language.toLowerCase());
    startCursorHide();

    setInterval(render, 200);
    document.getElementById("content").hidden=false;
});

window.onbeforeunload = () => {
    Clock.save();
};